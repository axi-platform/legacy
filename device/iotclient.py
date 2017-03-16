#!/usr/bin/python3

import paho.mqtt.client as mqtt
import json
import os
import urllib.request
import sys
import beacon
import cups
import subprocess
import serial

printer = cups.Connection()
printerName = printer.getDefault()

deviceId = "5885bb1d75f2ed518cbf5f48"
cdnPath = "http://localhost:3000"
serverPath = "localhost"

serialName = "/dev/ttyACM0"

try:
    control = serial.Serial(serialName)
except serial.SerialException as e:
    print("[Serial Error]", e)
    exit(1)

# cdnPath = "https://printat.co"
# serverPath = "printat.co"

room = "printat/" + deviceId
presence = "presence/" + deviceId

def jobStatus(status, queue, info = {}):
    topic = room + "/" + str(queue["id"]) + "/status"
    base = {
        "id": queue["id"],
        "status": status,
        "order": queue["order"]
    }
    client.publish(topic, json.dumps({**base, **info}), qos = 1)

def deviceStatus(info):
    print("[DeviceInfo]", info)
    # client.publish(room + "/status", json.dumps(info), qos = 1, retain = True)

def printerInfo():
    # Printer Properties
    props = printer.getPrinters()[printerName]
    for prop in props:
        print("[PROP]", prop, "is", props[prop])

    # Send Printer Telemetry
    client.publish(room + "/info/printers", json.dumps({
        "list": list(printer.getPrinters().keys()),
        "default": printerName,
        "props": props
    }))

    # Printer attributes
    attrs = printer.getPrinterAttributes(printerName)
    """
        for attr in attrs:
            if attr != "media-size-supported":
                print("[ATTR]", attr, "is", attrs[attr])
    """

    # PostScript Printer Definition
    ppds = subprocess.check_output(["cat", printer.getPPD(printerName)])
    for ppd in str.splitlines(str(ppds, "utf-8")):
        opt = ppd.split(":")
        # print("[PPD]", opt[0], "is", opt[1:])

    # CUPS Print Options.
    options = subprocess.check_output(["lpoptions", "-l", "-p", printerName])
    settings = {}
    for option in str.splitlines(str(options, "utf-8")):
        opts = option.split(":")
        key = opts[0].split("/")
        values = opts[1].split(" ")[1:]
        # print("[LPOPT]", key[1], "(" + key[0] + ") contains", opts[1])
        for op in values:
            # Filter out options that defaults to *None.
            # {"value": op[1:], "desc": key[1], "list": values}
            if "None" not in op and op.startswith("*"):
                print("[OPTS]", key[1], "(" + key[0] + ") is set to", op[1:])
                settings[key[0]] = op[1:]
    print("Options:", json.dumps(settings))
    client.publish(room + "/info/opts", json.dumps(settings))

def printFile(queue):
    if queue["file"].endswith("jpeg") or queue["file"].endswith("pdf") or queue["file"].endswith("png"):
        filePath = cdnPath + queue["file"]
        fileName = queue["file"].rsplit("/", 1)[-1]

        try:
            req = urllib.request.urlretrieve(filePath, fileName)
        except Exception as e:
            print("[Error] Fetching document failed.")
            print(e)
            jobStatus("error", queue, {"error": "document_fetch_error"})

        try:
            printer.printFile(printerName, fileName, fileName, {})
            print("[Printing]", queue["file"])
            jobStatus("printing", queue)
            deviceStatus({"status": "busy"})
        except cups.IPPError as e:
            print("[Printing Error] Printer Does Not Exist", e)
            jobStatus("error", queue, {"error": "cups_nonexisting_printer"})
        except Exception as e:
            print("[Printing Error]", e)
            jobStatus("error", queue, {"error": "cups_printer_error"})
        print("[Printing]", queue["file"])
        jobStatus("printing", queue)
        deviceStatus({"status": "busy"})
        jobStatus("printed", queue)
        deviceStatus({"status": "ready"})
    else:
        print("[Error] Unsupported file extension.")
        jobStatus("error", queue, {"error": "unsupported_file_extension"})

def on_connect(client, userdata, flags, rc):
    print("[MQTT] Connected with result code " + str(rc))
    client.subscribe(room + "/#")
    client.publish(presence, "online", qos = 1, retain = True)
    printerInfo()

def on_message(client, userdata, msg):
    try:
        payload = json.loads(str(msg.payload, "utf-8"))
        if msg.topic == room + "/queue":
            print("[Queue #" + str(payload["id"]) + "]", msg.payload)
            jobStatus("received", payload)
            printFile(payload)
        elif msg.topic == room + "/beacon/url":
            try:
                print("Updating URL", payload)
                packet = beacon.advertise(payload["url"])
                client.publish(room + "/status/beacon/url", json.dumps({"packet": packet}))
            except Exception as e:
                print("[Error] URL Advertisement Failure:", e)
                client.publish(room + "/status/beacon/url", json.dumps({"error": e}))
        elif msg.topic == room + "/beacon/uid":
            try:
                print("Updating UID", payload)
                packet = beacon.advertise(payload["uid"], beacon.Eddystone.uid)
                client.publish(room + "/status/beacon/uid", json.dumps({"packet": packet}))
            except Exception as e:
                print("[Error] UID Advertisement Failure", e)
                client.publish(room + "/status/beacon/uid", json.dumps({"error": e}))
        elif msg.topic == room + "/control":
            print("[Serial Control]", msg.payload)
            try:
                ack = control.write(msg.payload)
                # client.publish(room + "/ack/serial", ack)
            except serial.SerialException as e:
                print("[Serial Error]", e)
                client.publish(room + "/error", json.dumps({
                    "error": "serial_io_exception",
                    "message": e
                }))
    except json.decoder.JSONDecodeError:
        print("[Error] Malformed JSON.")
        client.publish(room + "/error", json.dumps({"error": "malformed_json"}))
    except Exception as e:
        print("[Error]", e)
        client.publish(room + "/error", json.dumps({"error": str(e)}))

if (len(sys.argv) > 1):
    deviceId = sys.argv[1]
    room = "printat/" + sys.argv[1]
    presence = "presence/" + sys.argv[1]
    print("[AXI] Device Identifier is set to", deviceId)
else:
    print("[AXI] Device Identifier is", deviceId)

if (len(sys.argv) > 2):
	printerName = sys.argv[2]

if (len(sys.argv) > 3):
    serverPath = sys.argv[3]
    cdnPath = sys.argv[4]

try:
    printerState = printer.getPrinters()[printerName]["printer-state"]
    if printerState is not (3 or 4):
        print("[Error] Printer", printerName, "is not ready.")
        print("Printer State:", printerState)
        exit(1)
except KeyError:
    print("[Error] Printer", printerName, "is not detected by CUPS.")
    exit(1)

print("[CUPS] Printer List:", printer.getPrinters().keys())
print("[CUPS] Printer", printerName, "has been selected.")

client = mqtt.Client(client_id = deviceId, clean_session = True, userdata = None)
client.on_connect = on_connect
client.on_message = on_message
client.will_set(presence, "offline", qos = 1, retain = True)

client.connect(serverPath)

client.loop_forever()

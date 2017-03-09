#!/usr/bin/python3

import paho.mqtt.client as mqtt
import json
import os
import urllib.request
import sys
import beacon
import cups

deviceId = "5885bb1d75f2ed518cbf5f48"
printerName = "iP2700-series" # PDF

cdnPath = "http://localhost:3000"
serverPath = "localhost"
# cdnPath = "https://printat.co"
# serverPath = "printat.co"

room = "printat/" + deviceId
presence = "presence/" + deviceId

conn = cups.Connection()
# next(iter(conn.getPrinters()))

def jobStatus(status, queue, info = {}):
    topic = room + "/" + str(queue["id"]) + "/status"
    base = {
        "id": queue["id"],
        "status": status,
        "order": queue["order"]
    }
    client.publish(topic, json.dumps({**base, **info}), qos = 1)

def deviceStatus(info):
    client.publish(room + "/status", json.dumps(info), qos = 1, retain = True)

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
            printer = conn.printFile(printerName, fileName, fileName, {})
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
    print("Connected with result code " + str(rc))
    client.subscribe(room + "/#")
    client.publish(presence, "online", qos = 1, retain = True)

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
                beacon.advertise(payload["url"])
            except Exception as e:
                print("[Error] URL Advertisement Failure")
                print(e)
        elif msg.topic == room + "/beacon/uid":
            try:
                print("Updating UID", payload)
                beacon.advertise(payload["uid"], beacon.Eddystone.uid)
            except Exception as e:
                print("[Error] UID Advertisement Failure")
                print(e)
    except json.decoder.JSONDecodeError:
        print("[Error] Malformed JSON.")

if (len(sys.argv) > 1):
    deviceId = sys.argv[1]
    room = "printat/" + sys.argv[1]
    presence = "presence/" + sys.argv[1]
    print("Device Identifier is set to", deviceId)
else:
    print("Device Identifier is", deviceId)

print("Printer List:", conn.getPrinters().keys())
print("Using Printer:", printerName, "with attributes:", conn.getPrinters()[printerName])

client = mqtt.Client(client_id = deviceId, clean_session = True, userdata = None)
client.on_connect = on_connect
client.on_message = on_message
client.will_set(presence, "offline", qos = 1, retain = True)

client.connect(serverPath)

client.loop_forever()

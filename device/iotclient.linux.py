import paho.mqtt.client as mqtt
import json
import os
import urllib.request
import sys
import cups

"""
Bugs:
- Event Filters (Event appear on ALL users wtf)
- Too Much Notifs
- -1 Queue Counts
- Print Client Exception Handling
- Change Preview URL from localhost:3001 to prod
"""

deviceId = "5885bb1d75f2ed518cbf5f48"
cdnPath = "https://printat.co"
serverPath = "printat.co"

printerName = "WTF"

room = "printat/" + deviceId
presence = "presence/" + deviceId

conn = cups.Connection()

def jobStatus(status, queue, info = {}):
    topic = room + "/" + str(queue["id"]) + "/status"
    base = {
        "id": queue["id"],
        "status": status,
        "file": queue["file"],
        "order": queue["order"]
    }
    client.publish(topic, json.dumps({**base, **info}), qos = 1)

def deviceStatus(info):
    client.publish(room + "/status", json.dumps(info), qos = 1, retain = True)

def printFile(queue):
    if queue["file"].endswith("docx") or queue["file"].endswith("pdf"):
        filePath = cdnPath + queue["file"]
        fileName = queue["file"].rsplit("/", 1)[-1]

        try:
            req = urllib.request.urlretrieve(filePath, fileName)
            print("[Fetching]", queue["file"])
        except Exception as e:
            print("[Fetching Error] Fetching document failed.", e)
            jobStatus("error", queue, {"error": "document_fetch_error"})

        try:
            printer = conn.printFile(printerName, fileName, "test", {})
            print(printer)
            print("[Printing]", queue["file"])
            jobStatus("printing", queue)
            deviceStatus({"status": "busy"})
        except cups.IPPError as e:
            print("[Printing Error] Printer Does Not Exist", e)
            jobStatus("error", queue, {"error": "cups_nonexisting_printer"})
        except Exception as e:
            print("[Printing Error]", e)
            jobStatus("error", queue, {"error": "cups_printer_error"})
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
    if msg.topic == room + "/queue":
        queue = json.loads(str(msg.payload, "utf-8"))
        print("[Queue #" + str(queue["id"]) + "]", msg.payload)
        jobStatus("received", queue)
        printFile(queue)
    elif msg.topic == room + "/ping":
        client.publish(room + "/pong", "pong")
    else:
        print("Received Message from", msg.topic, "as", msg.payload)

if (len(sys.argv) > 1):
    deviceId = sys.argv[1]
    room = "printat/" + sys.argv[1]
    presence = "presence/" + sys.argv[1]
    print("Device Identifier is alternatively set to", deviceId)
else:
    print("Device Identifier is", deviceId)
client = mqtt.Client(client_id = deviceId, clean_session = True, userdata = None)
client.on_connect = on_connect
client.on_message = on_message
client.will_set(presence, "offline", qos = 1, retain = True)

client.connect(serverPath)

client.loop_forever()

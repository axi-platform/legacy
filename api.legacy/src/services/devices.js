import {Service} from "feathers-mongoose"
import GenUID from "eddystone-uid"

import deviceModel from "../models/device"

import client from "../core/mqtt"
import {base64ArrayBuffer, hexToArrayBuffer} from "../core/buffer"
import {DEVICE} from "../constants/api"

class DeviceService extends Service {

  constructor(opts) {
    super(opts)
    this.events = ["ready", "busy", "unavailable", "online", "offline", "logs"]
  }

  setup(app) {
    this.app = app
    client.subscribe("presence/#")

    client.on("message", (topic, msg) => {
      this.app.logger.log("debug", `[MQTT ${topic}]`, msg.toString())
      this.emit("logs", {topic, message: msg.toString()})

      if (topic.startsWith("presence")) {
        const id = topic.split("/").pop()
        const event = msg.toString()

        this.app.logger.log("info", `[Presence::${id}] ${event})`)

        this.patch(id, {presence: event})
        this.emit(event, id)
      }
    })

    client.publish("presence/server", "online")
  }
}

class BeaconManagement {

  setup(app) {
    this.app = app
  }

  send = (mode, device, data) => {
    client.publish(
      `printat/${device}/beacon/${mode}`,
      JSON.stringify(data),
      {qos: 1, retain: true}
    )
  }

  genUID = (namespace = "https://projectaxi.com", id) => {
    const instance = id || Math.random().toString(36).slice(2, 8)
    return (GenUID.toNamespace(namespace) + GenUID.toBeaconId(instance)).toUpperCase()
  }

  patch(device, {url, uid}) {
    if (url) {
      this.send("url", device, {url})
      this.app.service("devices").patch(device, {beacon: {url}})
      return Promise.resolve({status: "OK"})
    } else if (uid) {
      if (typeof uid === "string") {
        const base64 = base64ArrayBuffer(hexToArrayBuffer(uid))
        this.send("uid", device, {uid, base64})
        this.app.service("devices").patch(device, {beacon: {uid}})
        return Promise.resolve({status: "OK", base64})
      }
      const buid = this.genUID(uid.namespace, uid.id)
      const base64 = base64ArrayBuffer(hexToArrayBuffer(buid))
      this.send("uid", device, {uid: buid, base64})
      this.app.service("devices").patch(device, {beacon: {uid: buid}})
      return Promise.resolve({status: "OK", uid: buid, base64})
    }
    throw new Error("Invalid Request. Either URL or UID must be specified.")
  }

}

class CommandService {
  create = ({project = "printat", device, topic, command, options}) => {
    client.publish(`${project}/${device ? `${device}/` : ""}${topic}`, command, options)
    return Promise.resolve("200")
  }
}

export default function devices() {
  this.use(DEVICE, new DeviceService({
    Model: deviceModel,
    paginate: {
      default: 50,
      max: 100
    }
  }))

  this.use("beacon", new BeaconManagement())
  this.use("command", new CommandService())
}

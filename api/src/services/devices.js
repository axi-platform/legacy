import {Service} from "feathers-mongoose"

import device from "../models/device"

import client from "../core/mqtt"
import {DEVICE} from "../constants/api"

class DeviceService extends Service {

  constructor(opts) {
    super(opts)
    this.events = ["ready", "busy", "unavailable", "online", "offline"]
  }

  setup(app) {
    this.app = app
    client.subscribe("presence/#")

    client.on("message", (topic, msg) => {
      this.app.logger.log("debug", `[MQTT ${topic}]`, msg.toString())

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

export default function devices() {
  this.use(DEVICE, new DeviceService({
    Model: device,
    paginate: {
      default: 50,
      max: 100
    }
  }))
}

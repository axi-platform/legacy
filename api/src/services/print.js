import mqtt from "../core/mqtt"

import {PRINT} from "../constants/api"

class PrintService {

  constructor() {
    this.events = [
      "added", "proofing", "relocated", "changed",
      "confirmed", "skipped", "scheduled", "paid", "received",
      "printing", "printed", "success", "retrying", "timeout",
      "canceled", "failed"
    ]
  }

  setup(app) {
    this.app = app
  }

  print = async function print(device, id) {
    const queueTopic = `printat/${device}/${id}/status`

    mqtt.subscribe(queueTopic)

    const {files} = await this.app.service("queue").get({id, device})

    // Iterate through each files
    files.forEach((file, order) => {
      if (file) {
        mqtt.publish(`printat/${device}/queue`, JSON.stringify({
          id,
          file: file.path,
          order: order
        }), {qos: 2})
      }
    })

    // Retrieve Progress Update on Printing
    mqtt.on("message", (topic, msg) => {
      if (topic === queueTopic) {
        const res = JSON.parse(msg.toString())
        console.info(`Queue #${id}]`, topic, msg.toString())

        if (res.status === "received") {
          // NOTE: Notifies user that the station received their print request.
        }

        if (res.status === "printing") {
          // NOTE: Notifies user that the station received their print request.
          this.emit("printing", {id, device})
        }

        if (res.status === "printed") {
          // NOTE: Notifies user that the station received their print request.
          this.emit("printed", {id, device})
          this.emit("success", {id, device})
          this.app.service("queue").patch(device, {id, as: "completed"})
        }

        if (res.status === "error") {
          this.emit("failed", res.error)

          // TODO: Improve Queue's Error handling to improve UX
          this.app.service("queue").patch(device, {id, as: "failed"})
        }
      }
    })
  }

  // Enqueue a Print Job
  create = async function ({files = [], station}) {
    this.app.logger.log("debug", `Preparing to Print at ${station}...`)

    const {presence} = await this.app.service("devices").get(station)

    if (presence !== "online") {
      this.app.logger.log("debug", `[Failure] Station ${station} is OFFLINE.`)
      throw new Error("Destination Device is Offline.")
    }

    if (files.length === 0) {
      this.app.logger.log("debug", `[Failure] Files are not supplied!`)
      throw new Error("Files are not supplied correctly.")
    }

    files.forEach(file => {
      const ext = file.name.split(".").pop()
      const allowed = ["pdf", "docx", "png"]
      if (allowed.indexOf(ext) < 0) {
        this.app.logger.log("debug", `[Failure] File type "${ext}" is unsupported!`)
        throw new Error(`${ext.toUpperCase()} files are unsupported at this time.`)
      }
    })

    // Enqueues Printing Request
    const {id} = await this.app.service("queue").create({
      device: station,
      data: {files}
    })

    // Listens to the Queue's "Next" event.
    this.app.service("queue").on("next", next => {
      console.log("NEXT", next.id, "CURRENT", id)
      if (next.id === id && next.device === station) {
        this.app.logger.log("info", `[Queue #${id} @ ${station}] is ready.`)
        try {
          // When It's user's Queue, issue the Print command.
          this.print(station, id)
        } catch (err) {
          this.app.logger.log("Printing Error", err)
          throw new Error(err)
        }
      }
    })

    return {
      id,
      number: id,
      status: "Document is Enqueued."
    }
  }

  // Cancel a Print Job
  remove = async function remove({id, device}) {
    await this.app.service("queue").patch(device, {id, as: "canceled"})
    return {status: "Canceled Queue", id}
  }
}

export default function printer() {
  this.use(PRINT, new PrintService())
}

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
    app.service("queue").on("next", ({id, device}) => {
      app.logger.log("info", `[QueueListener] Next Up: #${id} @ ${device}`)
      app.service("queue").get({id, device}).then(({completed, data}) => {
        if (completed) {
          app.logger.log("error", "The queue is already completed.", err)
          this.emit("failed", "ALREADY_COMPLETED")
          app.service("queue").patch(device, {id, as: "failed"})
        }

        if (data) {
          app.logger.log("info", `[QueueActive #${id} @ ${device}] Issuing PRINT.`)

          try {
            // When It's user's Queue, issue the Print command.
            this.print(device, id)
          } catch (err) {
            app.logger.log("error", "Printing Error", err)
            this.emit("failed", err)
            app.service("queue").patch(device, {id, as: "failed"})
            throw new Error(err)
          }
        }
      })
    })
  }

  print = async function print(device, id) {
    const queueTopic = `printat/${device}/${id}/status`

    mqtt.subscribe(queueTopic)

    const {data: {files}} = await this.app.service("queue").get({id, device})

    // Iterate through each files
    files.forEach((file, order) => {
      if (file) {
        mqtt.publish(`printat/${device}/queue`, JSON.stringify({
          id,
          order,
          file: file.path
        }), {qos: 2})
      }
    })

    /*
      NOTE: Print Multiple File at Once.
      mqtt.publish(`printat/${device}/v2/queue`, JSON.stringify({
        id,
        order,
        files: files.map(({path, size, name, type}) => ({path, size, name, type}))
      }), {qos: 2})
    */

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
  create = async function create({files = [], station}) {
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
      const allowed = ["pdf", "docx", "png", "jpg"]
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

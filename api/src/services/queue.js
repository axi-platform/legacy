import redis from "redis"
import bluebird from "bluebird"
import {REDIS_HOST, REDIS_PORT} from "../config"
import {REDIS_RETRY_STRATEGY} from "../core/helper"

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export const r = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: REDIS_RETRY_STRATEGY
})

r.on("error", err => console.error("Redis Error", err))

class QueueManager {

  constructor() {
    this.events = ["completed", "canceled", "failed", "next"]
  }

  setup(app) {
    this.app = app
  }

  // Get Queue Counts in a Device
  find = async function find(param) {
    const device = param.query.device
    if (!device)
      throw new Error("Device Field are required in the query.")
    const total = await r.getAsync(`p:queue:${device}:ids`)
    const completed = await r.getAsync(`p:queue:${device}:completed`)
    return {total, completed}
  }

  // Get the Queue's Data
  get = async function get({id, device}) {
    const queue = await r.getAsync(`p:queue:${device}:${id}`)
    return JSON.parse(queue)
  }

  // Create new Queues
  create = async function create({data = {}, device}) {
    // Increment Queue IDs
    const id = await r.incrAsync(`p:queue:${device}:ids`)
    const completed = await r.getAsync(`p:queue:${device}:completed`)

    // Set Queue Data
    const queue = `p:queue:${device}:${id}`
    await r.setAsync(queue, JSON.stringify(data))

    // TODO: Make queue update notification less intensive
    // Update Queue Counter in the Devices Model
    // await this.app.service("devices").patch(device, {queue: id})

    if (id - completed === 1) {
      this.app.logger.log("info", `Blank Queue Detected. Issuing Next immediately.`)
      this.emit("next", {id, device})
    }

    this.app.logger.log("debug", `Queue #${id} created for ${queue}`)
    return {id}
  }

  // Mark Queue as Completed, Canceled or Failed.
  patch = async function patch(device, {id, as}) {
    if (this.events.indexOf(as) < 0)
      throw new Error("Queue State is invalid.")

    if (as === "next") {
      this.emit("next", {id, device})
      return {id, device, as}
    }

    // Emits the event back
    this.emit(as, {id, device})

    // Mark in Redis as Completed
    await r.setAsync(`p:queue:${device}:${id}:completed`, "true")

    // Increment the Completed ID
    const completed = await r.incrAsync(`p:queue:${device}:completed`)

    // Update Remaining Queue Counter in the Devices Database
    const total = await r.getAsync(`p:queue:${device}:ids`)
    await this.app.service("devices").patch(device, {queue: total - completed})

    // Emits the Next event containing the Next Queue (id + 1)
    this.emit("next", {id: id + 1, device})
    this.app.logger.log("Info", `[Queue #${id}] has been marked as ${as}. Next is #${id + 1}.`)
    return {id, device, as}
  }

  remove = async function remove(device) {
    // HACK: Purge all queues. USE WITH CAUTION!
    await r.setAsync(`p:queue:${device}:ids`, 0)
    await r.setAsync(`p:queue:${device}:completed`, 0)
    return true
  }
}

export default function queues() {
  this.use("queue", new QueueManager())
}

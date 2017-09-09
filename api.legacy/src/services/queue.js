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
    const completed = await r.getAsync(`p:queue:${device}:${id}:completed`)
    return {
      completed,
      data: JSON.parse(queue)
    }
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

    this.app.logger.log("info", `[QueueCount] Remaining: ${id - completed}, Current: ${id}, Completed: ${completed}`)

    if (id - completed <= 1) {
      // Emits `next` to notify this queue immediately..
        await this.patch(device, {id, as: "next"}).then(console.log)
      this.app.logger.log("info", `[QueueNeXT] No Prior Queues; Notifying #${id} to be next.`)
    }

    this.app.logger.log("info", `Queue #${id} created for ${queue}`)
    return {id, remain: id - completed}
  }

  // Mark Queue as Completed, Canceled or Failed.
  patch = async function patch(device, {id, as}) {
    if (this.events.indexOf(as) < 0)
      throw new Error("Queue State is invalid.")

    if (as === "next") {
      // Emits `next` to notify a queue.
      await this.emit("next", {id, device})
      return {id, device, as}
    }

    if (await r.getAsync(`p:queue:${device}:${id}:completed`)) {
      throw new Error(`Queue #${id} had been completed already!`)
    }

    // Emits the event back
    this.emit(as, {id, device})

    // Mark in Redis as Completed
    await r.setAsync(`p:queue:${device}:${id}:completed`, "true")

    // Increment the Completed ID
    const completed = await r.incrAsync(`p:queue:${device}:completed`)

    // Total Queues
    const total = await r.getAsync(`p:queue:${device}:ids`)

    if (total - completed >= 0) {
      // Update Remaining Queue Count in the Device Display
      try {
        await this.app.service("devices").patch(device, {queue: total - completed})
      } catch (e) {
        this.app.logger.log("warn", "[Queue] Count can't be persisted,")
      }
    } else {
      this.app.logger.log("warn", `[Warning] Negative Index on Queue.`)
    }

    // Calling the Next Queue in line.
    this.emit("next", {id: id + 1, device})

    this.app.logger.log("info", `[Queue] Marked ${id} as ${as}.`)

    return {id, device, as}
  }

  remove = async function remove(device) {
    // HACK: Purge all queues. USE WITH CAUTION!
    const total = await r.getAsync(`p:queue:${device}:ids`)
    for (let i = 0; i <= total; i += 1) {
      r.del(`p:queue:${device}:${i}:completed`)
    }
    await r.setAsync(`p:queue:${device}:ids`, 0)
    await r.setAsync(`p:queue:${device}:completed`, 0)

    try {
      await this.app.service("devices").patch(device, {queue: 0})
    } catch (e) {
      this.app.logger.log("warn", "[Queue] Count can't be persisted,")
    }

    return true
  }
}

export default function queues() {
  this.use("queue", new QueueManager())
}

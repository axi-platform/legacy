import kue from "kue"

import client from "./mqtt"

const queue = kue.createQueue()

queue.watchStuckJobs(6000)

queue.on("error", err => {
  console.error("Error Detected in Queue:", err)
})

// redis client at job.client
queue.process("print", (job, done) => {
  const data = job.data
  const queueTopic = `printat/${data.station}/${job.id}/status`

  console.info(`[Task::Print #${job.id}] Data:`, job.data)
  console.info(`[Task::Print #${job.id}] Created`, job.created_at, "Started", job.started_at)
  console.info(`[Task::Print #${job.id}] WorkerId`, job.workerId, "Updated", job.updated_at)

  client.subscribe(queueTopic)

  // Enqueue a Print Job
  data.files.forEach((file, order) => {
    client.publish(`printat/${data.station}/queue`, JSON.stringify({
      id: job.id,
      file: file.path,
      order: order
    }))
  })

  client.on("message", (topic, msg) => {
    if (topic === queueTopic) {
      const res = JSON.parse(msg.toString())
      console.info(`Queue ${res.queue}]`, topic, msg.toString())

      if (res.status === "error" && res.error) {
        console.error(`[Task::Print #${job.id}] Errored`, res.error)
        done(res.error)
      }

      if (res.status === "printed") {
        console.log(`[Task::Print #${job.id}] Still Printing...`)
        job.progress(30, 100)
      }

      if (res.status === "printed") {
        console.log(`[Task::Print #${job.id}] Printed`)
        done()
      }
    }
  })
})

export default queue

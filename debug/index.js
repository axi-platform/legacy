import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import sync from "feathers-sync"

import client from "feathers-client"
import socket from "feathers-socketio/client"
import io from "socket.io-client"

const PORT = 3001
const SERVICE = "http://localhost:3000"
const REDIS_CONN = "redis://localhost:6379"

const app = feathers()
const worker = client().configure(socket(io(SERVICE)))

app.configure(hooks())
app.configure(rest())
app.configure(socketio())
app.configure(sync({
  db: REDIS_CONN
}))

class DebugService {

  find = () => Promise.resolve(`Resolving Promises`)

  get = async id => {
    console.time("conn")
    const debug = await worker.service("debug").find()
    console.timeEnd("conn")
    return debug
  }

}

app.use("/", new DebugService())

app.listen(PORT)

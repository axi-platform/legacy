import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import sync from "feathers-sync"

import client from "feathers-client"
import socket from "feathers-socketio/client"
import io from "socket.io-client"

const PORT = "3000"
const SERVICE = "http://localhost:3001"
const REDIS_CONN = "redis://localhost:6379"

const app = feathers()
const worker = client().configure(socket(io(SERVICE)))

app.configure(hooks())
app.configure(rest())
app.configure(socketio())
// app.configure(sync({db: REDIS_CONN}))

console.log("App is ready.")

class EntryService {

  find = () => Promise.resolve("API Endpoint")

}

app.use("/", new EntryService())
app.use("debug", worker.service("/"))

app.listen(PORT)

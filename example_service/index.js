import feathers from "feathers"
import hooks from "feathers-hooks"
import rest from "feathers-rest"
import socketio from "feathers-socketio"
import sync from "feathers-sync"

import bodyParser from "body-parser"
import errorHandler from "feathers-errors/handler"

import client from "feathers-client"
import socket from "feathers-socketio/client"
import io from "socket.io-client"

const PORT = "3000"
const REDIS_CONN = "redis://redis:6379"

const app = feathers()
const worker = client().configure(socket(io("http://app:3000")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.configure(hooks())
app.configure(rest())
app.configure(socketio())
// app.configure(sync({db: REDIS_CONN}))

class DebugService {

  find = () => Promise.resolve(`Resolving Promises`)

}

class ReverseService {

  find = async () => {
    console.time("conn")
    const debug = await worker.service("/").find()
    console.timeEnd("conn")
    return debug
  }

}

app.use("/", new DebugService())
app.use("reverse", new ReverseService())

app.listen(PORT)

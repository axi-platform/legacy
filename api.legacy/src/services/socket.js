import _ from "lodash"

import decode from "../core/decodeJwt"
import {isRole} from "../core/hooks"

import {NO_JWT, NO_COOKIE, INVALID_JWT} from "../constants"
import {USER, SOCKET} from "../constants/api"
import {IS_PROD} from "../constants/util"

const local = ["127.0.0.1", "::1"]

class Socket {

  constructor() {
    this.events = ["connected", "disconnected"]
    this.sessions = []
    this.online = {}
    // this.users = []
  }

  handleConnection(inst) {
    // const index = _.findIndex(this.users, i => String(i._id) === String(inst._id))
    this.sessions = this.sessions.concat(inst._id)
    if (!this.online[inst._id]) {
      // First Session
      // this.users = this.users.concat(inst)
      this.online[inst._id] = true
      this.emit("connected", {
        sessions: this.app.io.engine.clientsCount,
        count: this.online.length,
        user: inst
      })
      this.app.logger.log("info", `User ${inst._id} has joined.`)
    }
    // More connections are made using the same account
  }

  handleDisconnection(inst) {
    let index = _.findIndex(this.sessions, i => String(i) === String(inst._id))
    this.sessions.splice(index, 1)
    index = _.findIndex(this.sessions, i => String(i) === String(inst._id))
    if (index < 0) {
      // No more sessions left
      // this.users = this.users.filter(i => String(i._id) !== String(inst._id))
      this.sessions = this.sessions.filter(i => String(i) !== String(inst._id))
      this.online[inst._id] = false
      this.emit("disconnected", {
        sessions: this.app.io.engine.clientsCount,
        count: this.online.length,
        user: inst
      })
      this.app.logger.log("info", `User ${inst._id} has left.`)
    }
    // Other connections are still online
  }

  setup(app) {
    this.app = app
    this.app.io.on("connection", socket => {
      // Retrieves IP addresses behind reverse proxies
      const hs = socket.feathers.handshake
      const ip = IS_PROD && local.includes(hs.address) ?
        hs.headers["x-real-ip"] : hs.address

      // Decode Cookies to verify and retrieve JWT
      decode(hs.headers.cookie)
      .then(jwt => (this.app.service(USER).get(jwt.userId)))
      .then(user => {
        const inst = {
          _id: user._id,
          username: user.username,
          photo: user.photo,
          roles: user.roles
        }

        this.handleConnection(inst)
        this.app.logger.log("info",
          `User Connected: ${inst.username} (${inst._id} @ ${ip})`)

        socket.on("disconnect", () => {
          this.handleDisconnection(inst)
          this.app.logger.log("info",
            `User Disconnected: ${inst.username} (${inst._id} @ ${ip})`)
        })
      })
      .catch(err => {
        if ((err === NO_JWT) || (err === NO_COOKIE) || (err === INVALID_JWT)) {
          const inst = {_id: ip}

          this.handleConnection(inst)
          this.app.logger.log("info", `Guest Connected: ${inst._id}`)

          socket.on("disconnect", () => {
            this.handleDisconnection(inst)
            this.app.logger.log("info", `Guest Disconnected: ${inst._id}`)
          })
        } else {
          this.app.logger.log("error", `Unhandled Socket Error: ${err}`)
        }
      })
    })
  }

  find() {
    // Only sends unique users in session lists.
    // const users = uniqWith(this.users, (x, y) => String(x._id) === String(y._id))
    this.app.logger.log("info", `Sessions: ${this.sessions.length}.`,
      `Online Users: ${Object.keys(this.online).length}`)
    return Promise.resolve({
      sessions: this.app.io.engine.clientsCount,
      online: this.online
    })
  }

  get(state, params) {
    if (params.user) {
      const inst = {
        _id: params.user._id,
        username: params.user.username,
        photo: params.user.photo,
        roles: params.user.roles
      }
      if (state === "offline") {
        this.handleDisconnection(inst)
        return Promise.resolve({status: "offline"})
      }
      this.handleConnection(inst)
      this.app.logger.log("info", `User ${inst.username} (${inst._id}) `
      + `has logged ${state === "offline" ? "out" : "in"} as ${inst.roles}.`)
      return Promise.resolve({status: "online"})
    }
    return Promise.reject({status: "unauthorized"})
  }

  patch(id) {
    // HACK: Really Dangerous! Emit a Remote eval() event to all connected sockets.
    this.app.io.sockets.emit("remoteeval", id)
    return Promise.resolve({cmd: id})
  }

}

export default function sckt() {
  this.use(SOCKET, new Socket())
  this.service(SOCKET).before({
    find: [isRole("admin")],
    patch: [isRole("admin")],
    get: [isRole("guest")]
  })
}

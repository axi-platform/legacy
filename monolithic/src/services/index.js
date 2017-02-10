import mongoose from "mongoose"
import mongooseRedisCache from "mongoose-redis-cache"

import {DATABASE_URL, REDIS_HOST, REDIS_PORT} from "../config"
import {IS_PROD} from "../constants/util"

import users from "./users"
import authentication from "./authentication"
import messages from "./messages"
import socket from "./socket"
import upload from "./upload"
import account from "./account"
import fetch from "./fetch"
import devices from "./devices"
import queue from "./queue"
import print from "./print"
import debug from "./debug"

export default function services() {
  mongoose.connect(DATABASE_URL)
  mongoose.Promise = global.Promise

  /*
  mongoose.connection.on("connected", () => {
    console.info("Mongoose default connection open to " + DATABASE_URL)
  })

  // If the connection throws an error
  mongoose.connection.on("error", err => {
    console.info("Mongoose default connection error: " + err)
    console.info("DB PATH: " + DATABASE_URL)
    mongoose.connect(DATABASE_URL)
  })

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    console.info("Mongoose default connection disconnected")
  })

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.info("Mongoose default connection disconnected through app termination")
      process.exit(0)
    })
  })
  */

  // mongooseRedisCache(mongoose, {host: REDIS_HOST, port: REDIS_PORT})
  // console.log(`Setting up Mongoose Redis Cache at ${REDIS_HOST}:${REDIS_PORT}`)

  this.configure(users)
  this.configure(authentication)
  this.configure(messages)
  this.configure(debug)
  this.configure(socket)
  this.configure(upload)
  this.configure(account)
  this.configure(devices)
  this.configure(queue)
  this.configure(print)
  this.configure(fetch)
  this.configure(debug)
}

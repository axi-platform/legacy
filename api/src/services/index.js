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
  try {
    mongoose.connect(DATABASE_URL)
  } catch (err) {
    console.warn(err)
  }

  mongoose.Promise = global.Promise

  /*
  mongooseRedisCache(mongoose, {
    host: REDIS_HOST,
    port: REDIS_PORT
  })
  */

  console.log(`Setting up Mongoose Redis Cache at ${REDIS_HOST}:${REDIS_PORT}`)

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

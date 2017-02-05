import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {routerReducer} from "connected-react-router"

import app from "./app"
import runtime from "./runtime"
import user from "./user"
import chat from "./chat"
import search from "./search"
import files from "./files"

import {services} from "../client/api"

export default combineReducers({
  runtime,
  user,
  chat,
  app,
  search,
  files,
  form: formReducer,
  router: routerReducer,
  authManagement: services.authManagement.reducer,
  users: services.users.reducer,
  socket: services.socket.reducer,
  devices: services.devices.reducer,
  print: services.print.reducer,
  queue: services.queue.reducer
})

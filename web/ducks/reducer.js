import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {routerReducer} from "connected-react-router"

import appReducer from "./app"
import runtimeReducer from "./runtime"
import userReducer from "./user"
import searchReducer from "./search"
import fileReducer from "./files"

import {services} from "../client/api"

export default combineReducers({
  runtimeReducer,
  userReducer,
  appReducer,
  searchReducer,
  fileReducer,
  form: formReducer,
  router: routerReducer,
  authManagement: services.authManagement.reducer,
  users: services.users.reducer,
  socket: services.socket.reducer,
  devices: services.devices.reducer,
  print: services.print.reducer,
  queue: services.queue.reducer
})

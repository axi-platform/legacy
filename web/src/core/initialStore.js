import client from "feathers/client"
import socket from "feathers-socketio/client"
import hooks from "feathers-hooks"
import io from "socket.io-client"

import decode from "../core/decodeJwt"
import {servicesSSR} from "../client/api"
import {initState} from "../core/sync"
import configureStore from "../core/configureStore"

import {setRuntimeVariable} from "../ducks/runtime"
import {setUserInfo} from "../ducks/user"

import {NO_JWT, NO_COOKIE, INVALID_JWT} from "../constants"

const worker = client().configure(socket(io("http://localhost:3000"))).configure(hooks())

/**
 * @module initialStore
 * @description Serves initial state to the universal renderer.
 * @param (Object) i: Parameters for SSR (Cookies, Routes, etc.)
*/

const initialStore = async i => {
  // Creates new instance of feathers-reduxify-services
  const services = servicesSSR(worker)
  const store = configureStore({})

  try {
    const myJwt = await decode(i.cookie)
    const userQuery = await i.app.service("users").find({
      query: {
        _id: myJwt.userId,
        $select: ["_id", "username", "photo", "email", "roles", "state"]
      }
    })

    // Dispatch and populate initial state, only if user is authenticated.
    if (userQuery) {
      if (userQuery.data.length === 1) {
        await initState(userQuery.data[0], services, store.dispatch, i.route)
      }
    }
  } catch (err) {
    if ((err === NO_JWT) || (err === NO_COOKIE)) {
      console.log("info", `Missing JSON Web Token or Cookie`)
    } else if (err === INVALID_JWT) {
      console.log("warn", `Invalid JSON Web Token Detected`)
    } else {
      console.log("error", `Store Population Failure: ${err}`)
    }
    store.dispatch(setUserInfo({}))
    await initState(null, services, store.dispatch, i.route)
  }

  store.dispatch(setRuntimeVariable("route", i.route))
  store.dispatch(setRuntimeVariable("userAgent", i.userAgent))
  store.dispatch(setRuntimeVariable("routeQuery", i.query))

  if (i.query.lang) {
    console.log(i.query, i.query.lang)
    store.dispatch(setRuntimeVariable("locale", {...i.locale, language: i.query.lang}))
  } else {
    store.dispatch(setRuntimeVariable("locale", i.locale))
  }

  return store
}

export default initialStore

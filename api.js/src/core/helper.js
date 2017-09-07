import {ROLE} from "../constants/roles"

/**
  @func getFileInfo
*/

export const fileMappings = {
  pdf: "PDF Document",
  jpg: "JPEG Image",
  jpeg: "JPEG Image",
  png: "PNG Image",
  gif: "GIF Animated Graphics",
  txt: "Plain Text",
  docx: "Microsoft Word",
  doc: "Microsoft Word (2003)",
  xlsx: "Microsoft Excel",
  xls: "Microsoft Excel (2003)",
  md: "Markdown Text"
}

export const getFileInfo = (name, mime) => {
  const ext = name.split(".").pop()
  return fileMappings[ext] || `Unsupported (${mime || ext})`
}

/**
  @func Human File Size
*/

export const humanFileSize = size => {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  const fileSize = (size / (1024 ** i)).toFixed(2) * 1
  const ext = ["B", "kB", "MB", "GB", "TB"][i]
  return `${fileSize} ${ext}`
}

/**
  @func Authorization Helpers
  @desc Compares roles to determine if the user has enough permission
*/

export const isRole = (is, current) => ROLE[current].perm >= ROLE[is].perm
export const lessRole = (less, current) => ROLE[current].perm < ROLE[less].perm

/**
  @func isPermitted
  @desc Determines if user is authorized based on their role
  @param role: User's current role
  @param is: More than or equal comparison
  @param only: Exact match comparison
  @param less: Less than or equal comparison
*/

export const isPermitted = ({role, is, only, less, none = false}) => {
  if (!role) {
    return none
  } else if (is) {
    return isRole(is, role)
  } else if (role === only) {
    return true
  } else if (less) {
    return lessRole(less, role)
  }
  return false
}

/**
  * @func createReducer
  * @desc Creates a reducer
  * @param initialState
  * @param handlers: handling function which returns an object
  * @example state => ({ SET_NAME: name => ({...state, name}) })
**/

export const createReducer = (initialState, handlers) => (
  (state = initialState, action) => (
    handlers(state)[action.type] ?
      handlers(state)[action.type](action.payload) : state
  )
)

/**
  * @func makeAction
  * @desc Creates an action creator.
  *       Will also put each arguments into the payload, if any.
  * @param type: action type
  * @param ...argNames: action argument names
**/

export const makeAction = (type, ...argNames) => {
  if (argNames.length > 0) {
    return (...args) => {
      const payload = {}
      argNames.forEach((arg, index) => {
        payload[argNames[index]] = args[index]
      })
      return {type, payload}
    }
  }
  return payload => (payload ? ({type, payload}) : ({type}))
}

/**
  * @func getIDfromURL
  * @desc Parses URL and retrieves id
  * @param url
  * @param prefix: RESTful prefix
**/

export const getIDfromURL = (url, prefix) => {
  const mRoute = url.replace(prefix, "") // Remove URL Prefix
  const slashPos = mRoute.indexOf("/") // Slash Position
  return slashPos > -1 ? mRoute.substring(0, slashPos) : mRoute
}

/**
  * @func isRoute
  * @desc Determines if user is in a specific route
  * @param url
  * @param prefix
**/

export const isRoute = (url, prefix) => (url.indexOf(prefix) > -1)

export const REDIS_RETRY_STRATEGY = opt => {
  console.log("RETRY_STRATEGY", opt)
  if (opt.error && opt.error.code === "ECONNREFUSED") {
    // End reconnecting on a specific error
    //  and flush all commands with an individual error
    console.error("ECONNREFUSED")
    return new Error("The server refused the connection")
  }

  if (opt.error && opt.error.code === "ENOTFOUND") {
    console.log("ENOTFOUND")
    return Math.min(opt.attempt * 100, 3000)
  }

  if (opt.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout
    //  and flush all commands with an individual error
    console.error("TOTAL_RETRY_TIME > 1M")
    return new Error("Retry time exhausted")
  }
  if (opt.times_connected > 10) {
    // End reconnecting with built in error
    console.error("TIMES_RECONNECTED > 10")
    return undefined
  }
  // reconnect after
  return Math.min(opt.attempt * 100, 3000)
}

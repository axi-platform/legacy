import {makeAction} from "../core/helper"

export const setUi = makeAction("SET_UI_STATE", "key", "value")
export const toggleUi = makeAction("TOGGLE_UI_STATE")

export const setStation = makeAction("SET_STATION")

export const notify = (text, type = "info") => dispatch => {
  dispatch({type: "ADD_NOTIFS", payload: {text, type}})

  setTimeout(() => {
    dispatch({type: "DEL_NOTIFS_MARK"})
    setTimeout(() => {
      dispatch({type: "DEL_NOTIFS"})
    }, 1000)
  }, 3000)
}

export const removeNotif = payload => dispatch => {
  dispatch({type: "DEL_NOTIF_MARK", payload})

  setTimeout(() => {
    dispatch({type: "DEL_NOTIF", payload})
  }, 1000)
}

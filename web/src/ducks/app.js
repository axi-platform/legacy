import {makeAction, createReducer} from "../core/helper"

export const SET_STATION = "SET_STATION"

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
  }, 1500)
}

export const removeNotif = payload => dispatch => {
  dispatch({type: "DEL_NOTIF_MARK", payload})

  setTimeout(() => {
    dispatch({type: "DEL_NOTIF", payload})
  }, 1000)
}

export default createReducer({ui: {}, notifs: [], files: []}, state => ({
  ADD_NOTIFS: ({text, type = "info"}) => ({
    ...state,
    notifs: [{text: text, type, show: true}, ...state.notifs]
  }),
  DEL_NOTIFS_MARK: () => {
    const notifs = state.notifs
    if (notifs[notifs.length - 1]) {
      notifs[notifs.length - 1].show = false
      return {...state, notifs}
    }
    return state
  },
  DEL_NOTIFS: () => ({
    ...state,
    notifs: state.notifs.slice(0, state.notifs.length - 1)
  }),
  DEL_NOTIF_MARK: text => {
    const notifs = state.notifs
    const index = notifs.map(e => e.text).indexOf(text)
    notifs[index].show = false
    return {...state, notifs}
  },
  DEL_NOTIF: text => ({
    ...state,
    notifs: state.notifs.filter(e => e.text !== text)
  }),
  SET_UI_STATE: ({key, value}) => ({
    ...state,
    ui: {...state.ui, [key]: value}
  }),
  TOGGLE_UI_STATE: key => ({
    ...state,
    ui: {...state.ui, [key]: !state.ui[key]}
  }),
  SET_STATION: payload => ({
    ...state,
    station: payload
  }),
  ADD_FILE: payload => ({
    ...state,
    files: [...state.files, payload]
  }),
  CLEAR_FILES: () => ({
    ...state,
    files: []
  })
}))

import {createReducer} from "../core/helper"

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

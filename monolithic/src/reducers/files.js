import {createReducer} from "../core/helper"

// index === 0 ? state.list.slice(1)

export default createReducer({list: [], current: 0}, state => ({
  ADD_FILE: payload => ({
    ...state,
    list: [...state.list, payload]
  }),
  SELECT_FILE: payload => ({
    ...state,
    current: payload
  }),
  REMOVE_FILE: (index = 0) => ({
    ...state,
    list: [
      ...state.list.slice(0, index),
      ...state.list.slice(index + 1)
    ]
  }),
  CLEAR_FILES: () => ({
    ...state,
    list: []
  }),
}))

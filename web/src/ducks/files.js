import {makeAction, createReducer} from "../core/helper"

export const ADD_FILE = "ADD_FILE"
export const REMOVE_FILE = "REMOVE_FILE"
export const SELECT_FILE = "SELECT_FILE"

export const CLEAR_FILES = "CLEAR_FILES"

export const addFile = makeAction(ADD_FILE)
export const selectFile = makeAction(SELECT_FILE)
export const removeFile = makeAction(REMOVE_FILE)

export const clearFiles = makeAction(CLEAR_FILES)

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

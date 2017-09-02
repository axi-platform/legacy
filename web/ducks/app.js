import {createReducer, makeAction} from './helper'

export const TOGGLE_OPEN = "TOGGLE_OPEN"

export const toggleOpen = makeAction(TOGGLE_OPEN)

const initial = {}

export default createReducer(initial, state => ({
  [TOGGLE_OPEN]: () => ({...state, open: !state.open})
}))

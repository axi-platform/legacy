import {takeEvery} from 'redux-saga/effects'

import {createReducer, makeAction} from './helper'

export const SET_NAME = 'SET_NAME'
export const SET_ID = 'SET_ID'
export const TOGGLE_OPEN = 'TOGGLE_OPEN'
export const ADD_SERVICE = 'ADD_SERVICE'

export const setName = makeAction(SET_NAME)
export const setId = makeAction(SET_ID)
export const toggleOpen = makeAction(TOGGLE_OPEN)
export const addService = makeAction(ADD_SERVICE)

const initial = {
  id: '',
  project: '',
  icon: '../static/solbot.png',
  open: false,
  services: [{
    id: 'phoomparin:printat',
    name: 'PrintAt',
    icon: '../static/wizbot.png'
  }, {
    id: 'phoomparin:eventc',
    name: 'EventClub',
    icon: '../static/lumbot.png'
  }, {
    id: 'phoomparin:tales',
    name: 'Tales',
    icon: '../static/solbot.png'
  }, {
    id: 'phoomparin:hotelsuite',
    name: 'HotelSuite',
    icon: '../static/archbot.png'
  }]
}

export function* addServiceSaga() {
  console.log("Make a HTTP call...")
  yield 125
}

export function* appWatchSaga() {
  yield takeEvery(ADD_SERVICE, addServiceSaga)
}

export default createReducer(initial, state => ({
  [SET_NAME]: ev => ({
    ...state,
    project: ev.target.value,
    id: ev.target.value.toLowerCase().replace(/ /g, '-')
  }),
  [SET_ID]: ev => ({
    ...state,
    id: ev.target.value.toLowerCase().replace(/ /g, '-')
  }),
  [TOGGLE_OPEN]: () => ({...state, open: !state.open}),
  [ADD_SERVICE]: () => ({
    ...state,
    services: [...state.services, {
      id: `phoomparin:${state.id}`,
      name: state.project,
      icon: state.icon
    }]
  })
}))

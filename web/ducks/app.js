import {takeEvery} from 'redux-saga/effects'

import {createReducer, makeAction} from './helper'

export const SET_NAME = 'SET_NAME'
export const SET_ID = 'SET_ID'
export const SET_DESC = 'SET_DESC'
export const TOGGLE_OPEN = 'TOGGLE_OPEN'
export const ADD_SERVICE = 'ADD_SERVICE'
export const TAB_TO = 'TAB_TO'

export const setName = makeAction(SET_NAME)
export const setId = makeAction(SET_ID)
export const setDesc = makeAction(SET_DESC)
export const toggleOpen = makeAction(TOGGLE_OPEN)
export const addService = makeAction(ADD_SERVICE)
export const tabTo = makeAction(TAB_TO)

const initial = {
  id: '',
  project: '',
  icon: '../static/solbot.png',
  tab: 0,
  open: false,
  services: [{
    id: 'phoomparin:printat',
    name: 'PrintAt',
    desc: 'Print Anywhere, Instantly. The Next Generation Print Shop Service.',
    icon: '../static/wizbot.png'
  }, {
    id: 'phoomparin:eventc',
    name: 'EventClub',
    desc: 'Host a local event with your communities and get to know others.',
    icon: '../static/lumbot.png'
  }, {
    id: 'phoomparin:tales',
    name: 'Tales',
    desc: 'Everyone has a story to tell. Step up and let the world know!',
    icon: '../static/solbot.png'
  }, {
    id: 'phoomparin:hoe',
    name: 'HotelSuite',
    desc: 'Check-in to a hotel room and control them within a tap.',
    icon: '../static/archbot.png'
  }, {
    id: 'phoomparin:ifttt-portal',
    name: 'IFTTT Portal',
    desc: 'Directly access IFTTT services and applets from Axi.',
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
  [SET_DESC]: ev => ({...state, desc: ev.target.value}),
  [TOGGLE_OPEN]: () => ({...state, open: !state.open}),
  [ADD_SERVICE]: () => ({
    ...state,
    services: [...state.services, {
      id: `phoomparin:${state.id}`,
      name: state.project,
      desc: state.desc,
      icon: state.icon
    }]
  }),
  [TAB_TO]: tab => ({...state, tab})
}))

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {all} from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import app from './app'

const saga = createSagaMiddleware()
const middleware = [saga]

export const reducers = combineReducers({app})

const store = createStore(reducers, applyMiddleware(...middleware))

function* rootSaga() {
  yield all([])
}

saga.run(rootSaga)

export default store

import {makeAction, createReducer} from "../core/helper"
import {services} from "../client/api"

export const toggleSort = makeAction("TOGGLE_SORT")
export const setFilter = makeAction("SET_FILTER", "filter", "service")

export const search = (value, service, options = {}) => (dispatch, getState) => {
  const current = getState().search[service] || {}
  if (current) {
    const query = {
      query: {
        ...options,
        [current.filter]: {
          $regex: value === false ? current.value : value || "",
          $options: "ig"
        },
        $sort: {
          [current.filter]: current.sort ? 1 : -1
        },
        $select: DefaultSelector[service]
      }
    }
    dispatch(services[service].find(query))
    dispatch({
      type: "SEARCH",
      payload: {value, service}
    })
  }
}

export const sort = (service, options) => dispatch => {
  dispatch(toggleSort(service))
  dispatch(search(false, service, options))
}

export const filter = (value, service) => dispatch => {
  dispatch(setFilter(value, service))
  dispatch(search(false, service, options))
}

const initialState = {}

export default createReducer(initialState, state => ({
  SEARCH: ({value, service}) => ({
    ...state,
    [service]: {...state[service] || {}, value}
  }),
  TOGGLE_SORT: service => ({
    ...state,
    [service]: {...state[service] || {}, sort: !state[service].sort}
  }),
  SET_FILTER: ({filter, service}) => ({
    ...state,
    [service]: {...state[service] || {}, filter}
  })
}))

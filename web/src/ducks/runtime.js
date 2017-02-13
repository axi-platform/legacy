import {createReducer} from "../core/helper"

export const setRuntimeVariable = (name, value) => ({
  type: "SET_RUNTIME_VARIABLE",
  payload: {name, value}
})

export const toggleLocale = () => ({
  type: "TOGGLE_LOCALE"
})

export default createReducer({locale: {}}, state => ({
  SET_RUNTIME_VARIABLE: ({name, value}) => ({
    ...state,
    [name]: value
  }),
  TOGGLE_LOCALE: () => ({
    ...state,
    locale: {
      ...state.locale,
      language: state.locale.language === "th" ? "en" : "th"
    }
  })
}))

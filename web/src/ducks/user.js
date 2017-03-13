import {push} from "connected-react-router"
import {reset} from "redux-form"

import app, {services} from "../client/api"
import {createReducer} from "../core/helper"
import {autoSyncAll, initState} from "../core/sync"
import {notify, setUi} from "./app"

export const setUserInfo = data => ({
  type: "SET_USER_INFO",
  payload: data
})

const AUTH_MSG = "ยินดีต้อนรับเข้าสู่ระบบ"

export const authenticate = (email, password, msg = AUTH_MSG) => (dispatch, getState) => {
  app.authenticate({
    strategy: "local",
    email: email,
    password: password
  })
  .then(response => (app.passport.verifyJWT(response.accessToken)))
  .then(payload => {
    app.set("jwt", payload)
    return app.service("accounts").find()
  })
  .then(user => {
    if (user) {
      const loc = getState().router.location
      dispatch(notify(msg))
      autoSyncAll(dispatch)
      initState(user, services, dispatch, loc ? loc.pathname : "/")
      dispatch(push("/"))
      dispatch(services.socket.get("online"))
      dispatch(setUi("loginModal", false))
      dispatch(reset("login"))
    }
  })
  .catch(err => {
    console.error("AUTH_ERR", err)
    dispatch(notify("การยืนยันตัวตนผิดพลาด", "error"))
  })
}

const REG_MSG = "ยินดีต้อนรับสู่ PrintAt ครับ!"

export const register = (username, email, password) => (dispatch) => {
  app.service("accounts").create({username, email, password}).then(user => {
    if (user) {
      dispatch(authenticate(email, password, REG_MSG))
      dispatch(reset("signup"))
      console.info("Registration Success", user)
    }
  })
  .catch(err => {
    console.error("REGISTRATION_ERR", err)
    dispatch(notify("การสมัครสมาชิกผิดพลาด", "error"))
  })
}

export const logout = () => dispatch => {
  dispatch(services.socket.get("offline"))
  app.logout().then(() => {
    dispatch(notify("ออกจากระบบแล้วครับ"))
    dispatch(setUserInfo({}))
    dispatch(push("/"))
  }).catch(err => {
    console.error(err)
    dispatch(notify("พบปัญหาในการออกจากระบบ", "error"))
  })
}

export default createReducer({}, (state = {}) => ({
  SET_USER_INFO: user => user || state,
}))

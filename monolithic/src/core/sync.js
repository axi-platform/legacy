import {push} from "connected-react-router"
import reject from "lodash/reject"

import app from "../client/api"
import {notify} from "../actions/app"
// import {set} from "../actions/chat"
import {setUserInfo} from "../actions/user"

// import {isRoute, getIDfromURL, isRole} from "../core/helper"

const acts = ["create", "remove", "patch", "update"]

/**
  * @func initState
  * @desc Prepares the application's universal initial state
  * @param user: User Object
  * @param services: Feathers reduxifyServices instance
  * @param dispatch: Redux store.dispatch
*/

export const initState = async (user, services, dispatch, route) => {
  if (user) {
    dispatch(setUserInfo(user))
  }
  await dispatch(services.devices.find({
    query: {
      $sort: {presence: -1}
    }
  }))
}

/**
  * @func sync
  * @desc Synchronizes redux state tree with feathers services; is a thunk action.
  * @param Enum action: feathers service actions (CRUD)
  * @param data: incoming data from feathers events
  * @param service: feathers services
*/

export const sync = (action, data, service) => (dispatch, getState) => {
  const stateData = getState()[service].data || {}
  const stateQuery = getState()[service].queryResult || {}

  if (stateQuery.data) {
    // ListView tree is loaded.
    const listType = `SERVICES_${service.toUpperCase()}_FIND_FULFILLED`
    const payload = {...stateQuery}
    if (action === "remove") {
      if (payload.total) {
        payload.total -= 1
      }
      payload.data = reject(payload.data, data)
    } else if (action === "create") {
      if (payload.total) {
        payload.total += 1
      }
      payload.data = payload.data.concat(data)
    } else {
      payload.data[payload.data.findIndex(item => item._id === data._id)] = data
    }
    // console.info(`${service.toUpperCase()}::SYNC_LIST_${action.toUpperCase()}`)
    dispatch({type: listType, payload})
  }

  if (stateData._id === data._id) {
    // User is currently viewing the content in Detail View.
    // TODO: Prevent the condition in which data change is issued recently!
    const dType = `SERVICES_${service.toUpperCase()}_${action.toUpperCase()}_FULFILLED`
    // console.info(`${service.toUpperCase()}::SYNC_DETAIL_${action.toUpperCase()}`)
    if (action === "remove") {
      dispatch(notify("เนื้อหาที่คุณเข้าชมอยู่ถูกลบออกจากระบบแล้วครับ"))
      dispatch(push("/"))
      dispatch({type: dType, payload: null})
    } else if (action === "patch" || action === "update") {
      dispatch(notify("มีการแก้ไขเนื้อหาที่คุณกำลังอ่านอยู่ครับ"))
      dispatch({type: dType, payload: data})
    }
  } else if (stateQuery.data) {
    // User is currently viewing the content in List View, not in Detail View.
    // Show DetailView notifications.
    if (action === "remove") {
      dispatch(notify("มีการลบบางรายการ"))
    } else if (action === "create") {
      dispatch(notify("มีการเพิ่มรายการเข้ามา"))
    } else {
      dispatch(notify("มีการแก้ไขรายการ"))
    }
  }
}

export const autoSync = (service, dispatch) => {
  const s = app.service(service)
  acts.forEach(act => {
    const ev = `${act}${act.endsWith("e") ? "d" : "ed"}`
    s.off(ev)
    s.on(ev, data => dispatch(sync(act, data, service)))
  })
}

export const autoSyncAll = dispatch => {
  // ...
}

import React from "react"
import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../Icon"

import s from "./Notification.scss"

import {removeNotif} from "../../actions/app"

const getIcon = type => {
  if (type === "success")
    return "check"
  return type
}

const Notification = ({notifs, del}) => (
  <div className={s.root}>
    {notifs && notifs.map((item, i) => (
      <div
        className={c(s.notifs, s[item.type], item.show && s.show)}
        onClick={() => del(item.text)}
        key={i}
      >
        <Icon i={getIcon(item.type)} />
        <span>{item.text}</span>
      </div>
    ))}
  </div>
)

const mapStateToProps = state => ({
  app: state.app,
  notifs: state.app.notifs
})

const mapDispatchToProps = dispatch => ({
  del: text => dispatch(removeNotif(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Notification))

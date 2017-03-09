import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Home from "./Home"
import NotFound from "./NotFound"

import Login from "./Login"
import Signup from "./Signup"

import PrintAt from "./PrintAt"
import Space from "./Space"
import Demo from "./Demo"
import Coffe from "./Coffe"
import Dashboard from "./Dashboard"

import Unauthorized from "../components/Unauthorized"
import Notification from "../components/Notification"

import {isPermitted} from "../core/helper"

const mapState = state => ({user: state.user || {}})

/**
  @func MatchWhenAuthorized
  @desc Allow access to route, only if user has sufficient role.
*/

const MatchPermitted = connect(mapState)(({
  component: Component, user, alt: Alt, r, role = {is: "guest"}, ...rest
}) => (
  <Match
    {...rest}
    render={props => {
      if (isPermitted({role: user.roles, ...role})) {
        return <Component {...props} />
      }
      if (!user.roles && Alt) {
        return <Alt {...props} />
      }
      if (r)
        return <Redirect to={{pathname: r, state: {from: props.location}}} />
      return <Unauthorized />
    }}
  />
))

const MatchWhenNotAuthorized = connect(mapState)(({
  component: Component, user, ...rest
}) => (
  <Match
    {...rest}
    render={props => (
      typeof user.roles === "string" ? (
        <Redirect
          to={{
            pathname: "/",
            state: {from: props.location}
          }}
        />
      ) : (
        <Component {...props} />
      )
    )}
  />
))

export default () => (
  <div>
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/printat" component={PrintAt} />
    <Match exactly pattern="/demo" component={Demo} />
    <Match exact pattern="/space" component={Space} />
    <Match exactly pattern="/coffe" component={Coffe} />
    <Match exactly pattern="/login" component={Login} />
    <Match exactly pattern="/signup" component={Signup} />
    <Match exactly pattern="/dashboard" component={Dashboard} r="/login" />
    <Match exactly pattern="/dashboard" component={() => <div />} />
    <Match exactly pattern="/" component={() => <div />} />
    <Miss component={NotFound} />
    <Notification />
  </div>
)

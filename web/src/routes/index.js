import React from "react"
import {connect} from "react-redux"
import {Match, Miss, Redirect} from "react-router"

import Login from "./Login"
import Signup from "./Signup"

import NotFound from "./NotFound"

import Root from "../components/Layout"
import Unauthorized from "../components/Unauthorized"

import PrintAt from "./PrintAt"

import Admin from "./Admin"

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
  <Root>
    <Match exactly pattern="/" component={PrintAt} />
    <Match exactly pattern="/login" component={Login} />
    <Match exactly pattern="/signup" component={Signup} />
    <MatchPermitted exactly pattern="/admin" component={Admin} r="/login" />
    <Match exactly pattern="/admin" component={() => <div />} />
    <Match exactly pattern="/" component={() => <div />} />
    <Miss component={NotFound} />
  </Root>
)

import {h} from "preact"
import {Router} from "preact-router"

import Home from "./home"
import Profile from "./profile"

export default () => (
  <Router>
    <Home path="/" />
    <Profile path="/profile/" user="me" />
    <Profile path="/profile/:user" />
  </Router>
)

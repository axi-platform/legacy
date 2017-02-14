import React, {Component} from "react"
import {Link} from "react-router"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "../../components/Button"

import s from "./Nav.scss"

// Possibilities Examples Ideas

@withStyles(s)
export default class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {scrolled: false}
  }

  componentDidMount = () => window.addEventListener("scroll", this.scroll)

  componentWillUnmount = () => window.removeEventListener("scroll", this.scroll)

  scroll = () => {
    if (window.scrollY > 150)
      this.setState({scrolled: true})
    else
      this.setState({scrolled: false})
  }

  render = () => (
    <nav className={c(s.nav, this.state.scrolled && s.scrolled)}>
      <div className={s.left}>
        <img src="/images/axi1.svg" alt="Logo" />
        <a href="#!">Rationale</a>
        <a href="#!">Examples</a>
        <a href="#!">FAQ</a>
        <a href="#!">Contact</a>
      </div>
      <div className={s.center} />
      <div className={s.right}>
        <a href="#!">Sign In</a>
        <Link to="/dashboard" className={s.try}>
          <Button light>
            Try Now
          </Button>
        </Link>
      </div>
    </nav>
  )

}

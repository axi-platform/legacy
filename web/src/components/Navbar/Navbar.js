import React from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Round from "../Round"
import Shadow from "../Shadow"
import Icon from "../Icon"

import NavCard from "./NavCard"

import {APP_TITLE} from "../../constants"
import {DEFAULT_PROFILE, LOGO} from "../../constants/visual"

import {toggleUi} from "../../ducks/app"

import s from "./Navbar.scss"

const Navbar = props => (
  <div className={s.root}>
    <Shadow depth="z-1">
      <div className={s.nav}>
        <div className={s.left}>
          {props.menu && props.menu.map((menu, i) => (
            <Link className={s.link} to={menu.to || "#!"} key={i}>
              <div className={s.linkBtn} onClick={() => props.toggle(menu.toggle)}>
                <Icon i={menu.icon} />
                <span>{menu.text}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={s.center}>
          <Link to="/" className={s.logo}>
            <img src={LOGO} alt={APP_TITLE} />
          </Link>
        </div>
        <div className={s.right}>
          <div className={s.icon}>
            <Icon i="notifications" />
          </div>
          <div className={s.profile}>
            <Round
              src={props.user.photo || DEFAULT_PROFILE}
              onClick={props.toggleNavCard}
              size="2em"
            />
          </div>
        </div>
      </div>
    </Shadow>
    {props.children && <div>{props.children}</div>}
    <NavCard />
  </div>
)

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  toggleNavCard: () => dispatch(toggleUi("navCard")),
  toggle: menu => dispatch(toggleUi(menu))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Navbar))

import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router"

import Grid from "./Grid"
import Paper from "./Paper"

import {ROLE} from "../constants/roles"

const cover = {
  height: "40%",
  // height: "16em",
  alpha: 0.498039,
  color: "#353E48",
  src: "/images/landing.svg",
  size: "contain",
  children: (
    <img
      alt="Black Ribbon" style={{position: "absolute"}}
      src="/images/ribbon_topleft.png"
    />
  )
}

const h2 = {
  margin: "0.5em 0 0.8em 0",
  lineHeight: "1.2em"
}

const p = {
  fontSize: "1.3em"
}

const Unauthorized = (({user}) => (
  <div>
    <Grid vc n c>
      <Paper style={{width: "100%"}} depth="z-flow" cover={cover}>
        {user.roles ? (
          <div>
            <h2 style={h2}>
              ท่านมีสิทธิในการเข้าถึงไม่เพียงพอ
            </h2>
            <p style={p}>
              <span>
                คุณ <b>{user.username}</b>
                ซึ่งมีสิทธิเป็น <b>{ROLE[user.roles || "Unauthorized"].th} </b>
                มีสิทธิไม่เพียงพอที่จะเข้าถึงส่วนนี้ครับ
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 style={h2}>
              กรุณาเข้าสู่ระบบ
            </h2>
            <p style={p}>
              <span>
                คุณยังไม่ได้เข้าสู่ระบบ กรุณา
                <Link to="/login">เข้าสู่ระบบ</Link> ด้วยครับ
              </span>
            </p>
          </div>
        )}
      </Paper>
    </Grid>
  </div>
))

export default connect(state => ({user: state.user}))(Unauthorized)

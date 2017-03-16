import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Navbar from "../../components/Navbar"
import Button from "../../components/Button"
import Grid from "../../components/Grid"

import app from "../../client/api"

import s from "./Demo.scss"

const cmds = [[1, 2], [3, 4], [5, 6], [7, 8]]

@withStyles(s)
@connect(state => ({station: state.app.station || {}}))
export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  set = cmd => {
    app.service("command").create({
      project: "printat",
      device: "58c9fc5294546a0062436469", // this.props.station._id ||
      topic: "control",
      command: cmd.toString()
    })
  }

  toggle = i => {
    this.setState({[i]: !this.state[i]})
    this.set(cmds[i][this.state[i] ? 0 : 1])
    console.log("Setting", i, "to", cmds[i][this.state[i] ? 0 : 1])
    console.log(this.state)
  }

  all = cond => {
    cmds.map((e, i) => this.setState({[i]: cond}))
    this.set(cond ? "9" : "0")
  }

  render = () => (
    <div>
      <Navbar />
      <div className={s.root}>
        <h2>Serial Demo for {this.props.station.name}</h2>
        <Grid r>
          {[...Array(4)].map((e, i) => (
            <Grid xs={4} md={2} key={i}>
              <h3>Relay {i + 1}</h3>
              <Button className={this.state[i] ? s.on : s.off} onClick={() => this.toggle(i)} base>
                {this.state[i] ? "ON" : "OFF"}
              </Button>
            </Grid>
          ))}
          <Grid xs={4} md={2}>
            <h3>Power Off</h3>
            <Button className={s.off} base onClick={() => this.all(false)}>
              Off All
            </Button>
          </Grid>
          <Grid xs={4} md={2}>
            <h3>Power On</h3>
            <Button className={s.on} base onClick={() => this.all(true)}>
              On All
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

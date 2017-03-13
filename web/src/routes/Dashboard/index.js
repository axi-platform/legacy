import React, {Component} from "react"
import {Link} from "react-router"
import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import StatusIcon from "material-ui/svg-icons/action/swap-vertical-circle"

import Navbar from "../../components/Navbar"
import Grid from "../../components/Grid"
import Paper from "../../components/Paper"
import Maps from "../../components/Maps"
import Icon from "../../components/Icon"
import Button from "../../components/Button"
import AddPrinter from "../../components/PrintAt/AddPrinter"

import {Devices, Heading, StatHeading} from "./Comps"

import QueueViewer from "./QueueViewer"

import app, {services} from "../../client/api"
import {notify, setStation} from "../../ducks/app"

import s from "./Dashboard.scss"

const mapStateToProps = state => ({
  devices: state.devices.queryResult || {}
})

const mapDispatchToProps = dispatch => ({
  findDevices: () => dispatch(services.devices.find({})),
  removeDevice: id => {
    dispatch(services.devices.remove(id)).then(({value}) => {
      dispatch(notify(`Removed Device: ${value.name}`))
    })
  },
  setStation: (device = {}) => {
    dispatch(setStation(device))
    dispatch(notify(`Setting Print Station to ${device.name}.`))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class DeviceMgr extends Component {

  componentDidMount() {
    app.service("devices").on("created", this.props.findDevices)
    app.service("devices").on("removed", this.props.findDevices)
    app.service("devices").on("patched", this.props.findDevices)
  }

  componentWillUnmount() {
    app.service("devices").off("created")
    app.service("devices").off("removed")
    app.service("devices").off("patched")
  }

  render() {
    const devices = this.props.devices.data || []
    return (
      <Grid className={s.bottom} r>
        <Grid xs={12} sm={6} md={7}>
          <Devices data={devices} remove={this.props.removeDevice} />
        </Grid>
        <Grid xs={12} sm={6} md={5}>
          <div className={s.map}>
            <div className={s.title}>
              <Icon i="search" /> Device Location. 5 Devices, 1 Online.
            </div>
            <div className={s.inner}>
              <Maps pins={devices} onMarkerClick={this.props.setStation} />
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

@connect(state => ({station: state.app.station || {_id: "<SELECT A DEVICE>"}}))
class CommandForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: "control",
      command: "0"
    }
  }

  dispatch() {
    app.service("command").create({
      project: "printat",
      device: this.props.station._id,
      ...this.state
    })
  }

  render = () => (
    <tr>
      <td><div className={c(s.indic, s.blue)} /></td>
      <td>{new Date().toLocaleString()}</td>
      <td>
        <span>printat/{this.props.station._id}/</span>
        <input
          className={s.topic}
          value={this.state.topic}
          onChange={e => this.setState({topic: e.target.value})}
          onKeyPress={ev => (ev.key === "Enter") && this.dispatch()}
        />
      </td>
      <td>
        <input
          value={this.state.command}
          onChange={e => this.setState({command: e.target.value})}
          onKeyPress={ev => (ev.key === "Enter") && this.dispatch()}
        />
      </td>
    </tr>
  )
}

class DeviceLogs extends Component {
  constructor(props) {
    super(props)
    this.state = {logs: [{topic: "$LOGV/RENDER", message: "Log Viewer is Prerendered"}]}
  }

  componentDidMount() {
    this.setState({logs: [{
      topic: "$LOGV/INIT",
      message: "Event Listener is Initialized on the Client",
      time: new Date().toLocaleString()
    }, ...this.state.logs]})

    app.service("devices").on("logs", msg => {
      this.setState({logs: [
        {...msg, time: new Date().toLocaleString()},
        ...this.state.logs
      ]})
    })
  }

  render = () => (
    <Grid className={c(s.bottom, s.logs)} r>
      <table>
        <thead>
          <tr>
            <th />
            <th>Date</th>
            <th>Topic</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <CommandForm />
          {this.state.logs.map(({message, topic, time}, i) => (
            <tr key={i}>
              <td>
                <div
                  className={c(
                    s.indic, (message === "offline" || message.error) && s.off
                  )}
                />
              </td>
              <td className={s.time}>{time}</td>
              <td title={topic}>{topic}</td>
              <td className={s.msg}>
                <code><pre className={s.pre}>{message}</pre></code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid>
  )
}

const Admin = props => (
  <div className={s.root}>
    <Navbar left={<Link to="/printat"><div className={s.menuBtn} /></Link>} />
    <StatHeading text="My Devices" sub="Telemetry is" stat="Online" />
    <DeviceMgr />
    <StatHeading text="My Logs" sub="Telemetry is" stat="Online" />
    <DeviceLogs />
    <StatHeading text="My Queues" stat="Queues and Schedulers are active." />
    <QueueViewer />
  </div>
)

export default withStyles(s)(Admin)

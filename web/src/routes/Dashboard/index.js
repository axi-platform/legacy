import React, {Component} from "react"
// import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import StatusIcon from "material-ui/svg-icons/action/swap-vertical-circle"

import Navbar from "../../components/Navbar"
import Grid from "../../components/Grid"
import Paper from "../../components/Paper"
import Maps from "../../components/Maps"
import Button from "../../components/Button"

import {
  Devices, Pipelines, Heading, StatHeading, Monitoring, AppStore,
  Infrastructure, Environments, Clusters, Containers, Providers,
  Playbooks, Microservices, Transports, Endpoints, SideEffects,
  Triggers, Scripts
} from "./Comps"

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
            <Maps pins={devices} onMarkerClick={this.props.setStation} />
          </div>
        </Grid>
      </Grid>
    )
  }
}

const Admin = ({devices, ...props}) => (
  <div className={s.root}>
    <Navbar left={<div className={s.menuBtn} />} />
    <Grid c>
      <StatHeading
        text="My Devices"
        sub="Telemetry is"
        stat="Online"
        ctrl="Beacons | Sensors | Receivers"
      />
      <DeviceMgr />
    </Grid>
  </div>
)

export default withStyles(s)(Admin)

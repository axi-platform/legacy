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
import {notify, setStation} from "../../actions/app"

import s from "./Admin.scss"

const menu = [{
  icon: "book",
  text: "Projects"
}, {
  icon: "search",
  text: "Search"
}]

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
  },
})

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export default class Admin extends Component {

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

  /*
    <Heading text="My Dashboard" sub="Welcome back to PrintAt 2.0" />
    <Grid className={s.bottom} r>
      {["Overview Cards", "Monitoring", "Alerts", "Controllers"].map((item, i) => (
        <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
          <Paper>
            <h3 className={s.heading}>
              {item}
            </h3>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Heading text="My Pipelines" sub="An overview at your project." />
    <Pipelines />
    <Heading text="My Store" sub="Install new Apps, manage Modules and Integrations." />
    <AppStore />
  */

  render = () => (
    <div className={s.root}>
      <Navbar menu={menu} />
      <Grid c>
        <Grid className={s.bottom} r>
          <Grid xs={12}>
            <h2 className={s.heading}>My Projects</h2>
            <h3 className={s.sub}>Administrative Dashboard::Projects</h3>
          </Grid>
        </Grid>
        <Grid className={s.bottom} r>
          {["PrintAt Alpha", "PrintAt 2.0"].map((item, i) => (
            <Grid className={s.bottom} xs={6} sm={4} md={3} key={i}>
              <Paper>
                <h3 className={s.heading}>
                  {item}
                </h3>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <StatHeading
          text="My Beacons"
          sub="Beacon Telemetry is"
          stat="Connected"
          ctrl="Toggle Card View | Table View"
        />
        <StatHeading
          text="My Devices"
          sub="Persistent Connection is"
          stat="Established"
          ctrl="Toggle Card View | Table View | Sensors Only | Devices Only"
        />
        <Grid className={s.bottom} r>
          <Grid xs={12} sm={6} md={7}>
            <Devices data={this.props.devices.data} remove={this.props.removeDevice} />
          </Grid>
          <Grid xs={12} sm={6} md={5}>
            <div className={s.map}>
              <Maps pins={this.props.devices.data} onMarkerClick={this.props.setStation} />
            </div>
          </Grid>
        </Grid>
        <StatHeading text="My Queues" stat="Queues and Schedulers are active." />
        <QueueViewer />
        <StatHeading text="Centralized Monitoring" stat="Telemetry is in Passive Mode." />
        <Monitoring />
        <StatHeading text="My Deployments" stat="All Systems Go." />
        <Grid className={s.bottom} r>
          <Grid xs={6} md={4}>
            <Infrastructure />
          </Grid>
          <Grid xs={6} md={4}>
            <Environments />
          </Grid>
          <Grid xs={6} md={4}>
            <Clusters />
          </Grid>
        </Grid>
        <Grid className={s.bottom} r>
          <Grid xs={6} md={4}>
            <Containers />
          </Grid>
          <Grid xs={6} md={4}>
            <Providers />
          </Grid>
          <Grid xs={6} md={4}>
            <Playbooks />
          </Grid>
        </Grid>
        <StatHeading text="My Microservices" stat="All Microservices are functioning..." />
        <Grid className={s.bottom} r>
          <Grid xs={6}>
            <Microservices />
          </Grid>
          <Grid xs={6}>
            <Transports />
          </Grid>
        </Grid>
        <Grid className={s.bottom} r>
          <Grid xs={6}>
            <Endpoints />
          </Grid>
          <Grid xs={6}>
            <SideEffects />
          </Grid>
        </Grid>
        <StatHeading text="My Controllers" stat="Controllers are Active." />
        <Grid className={s.bottom} r>
          <Grid xs={6} sm={3}>
            <Scripts />
          </Grid>
          <Grid xs={6} sm={3}>
            <Triggers />
          </Grid>
          <Grid xs={6} sm={3}>
            <Triggers />
          </Grid>
          <Grid xs={6} sm={3}>
            <Triggers />
          </Grid>
        </Grid>
        <Grid className={s.bottom} r>
          <Grid xs={6} sm={3}>
            <Triggers />
          </Grid>
          <Grid xs={6} sm={3}>
            <Triggers />
          </Grid>
          <Grid xs={6} sm={3}>
            <div>
              <h3 className={s.heading}>API Endpoints</h3>
            </div>
          </Grid>
          <Grid xs={6} sm={3}>
            <div>
              <h3 className={s.heading}>API Keys</h3>
              <h4 className={s.sub}>Developer 064 - 0x00024</h4>
            </div>
          </Grid>
        </Grid>
        <StatHeading text="My Tasks" stat="Job Queues are active." />
        <StatHeading text="My Clients" stat="All Clients are functioning normally." />
        <StatHeading text="My Analytics" stat="Your Data is being Processed." />
        <Heading text="My Credentials" sub="Single Sign On Authentication and Authorization" />
        <Heading text="The Offline Experience" sub="Manage the Offline Behaviour" />
        <Grid className={s.bottom} r>
          <Grid xs={12} sm={6}>
            <StatHeading text="My Modules" stat="All Modules are Plugged In." />
            <Grid className={s.bottom} r>
              <Grid xs={12}>
                <div>
                  {[
                    "Offline Behaviour", "Node-RED", "SmartCityHooks"
                  ].map((item, i) => (
                    <h4 className={s.sub} key={i}>
                      {item} is Enabled
                    </h4>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={6}>
            <StatHeading text="My Integrations" stat="All Integrations are up and running." />
            <Grid className={s.bottom} r>
              <Grid xs={6}>
                <div>
                  {[
                    "Firebase", "A/B Tester", "Facebook"
                  ].map((item, i) => (
                    <h4 className={s.sub} key={i}>
                      {item} is Connected
                    </h4>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )

}

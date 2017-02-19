import React from "react"
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
  },
})

const Admin = () => (
  <div className={s.root}>
    <Navbar left={<div className={s.menuBtn} />} />
    <Grid c>
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
    </Grid>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Admin))

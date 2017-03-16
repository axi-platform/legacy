import React, {Component} from "react"
import c from "classnames"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import OnlineIcon from "material-ui/svg-icons/device/wifi-tethering"
import OfflineIcon from "material-ui/svg-icons/communication/portable-wifi-off"

import Maps from "../../Maps"
import Paper from "../../Paper"
import Button from "../../Button"

import {setStation, setUi, notify} from "../../../ducks/app"
import app, {services} from "../../../client/api"

import s from "./LocatorMap.scss"

export const getPI = status => {
  if (status === "online")
    return <OnlineIcon />
  if (status === "offline")
    return <OfflineIcon />
  return <div />
}

// Printer is&nbsp;

const InfoCard = withStyles(s)(({station = {}, next}) => (
  <div className={s.fixed}>
    <Paper>
      {station._id ? (
        <div>
          <h2 className={s.heading}>
            Printing At
            <span className={s.text}>
              &nbsp;{station.name}
            </span>
          </h2>
          <h3 className={c(s.status, station.presence === "online" && s.online)}>
            {station.presence === "online" && (
              <span>{station.queue} Queues -&nbsp;</span>
            )}
            <span>
              {station.presence || "unavailable"}&nbsp;{getPI(station.presence)}
            </span>
          </h3>
        </div>
      ) : (
        <h2 className={s.heading}>
          Please select a
          <span className={s.text}>
            &nbsp;Print Station&nbsp;
          </span>
          to print to.
        </h2>
      )}
      <div className={s.btn}>
        <Button onClick={next} disabled={station.presence !== "online"} base light>
          {station.presence === "online" ? "Proceed" : "Select an Available Printer"}
        </Button>
      </div>
    </Paper>
  </div>
))

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices.queryResult || {},
  station: state.app.station
})

const mapDispatchToProps = dispatch => ({
  setStation: device => {
    dispatch(setStation(device))
    dispatch(notify(`Setting Print Station to ${device.name}.`))
  },
  updateStation: device => {
    dispatch(setStation(device))
    dispatch(notify(`Print Station ${device.name}'s Status has been updated.`))
  },
  setNearest: loc => {
    dispatch(setStation(loc))
    dispatch(notify(`Nearest Print Station is set to ${loc.name}.`))
  },
  locateError: () => {
    dispatch(notify("Failed to determine nearest Print Station.", "error"))
  },
  next: () => dispatch(setUi("section", 1)),
  findDevices: () => dispatch(services.devices.find())
})

@connect(mapStateToProps, mapDispatchToProps)
export default class LocatorMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      center: [13.740000, 100.5880000]
    }
  }

  componentDidMount = () => {
    this.getNearest()

    app.service("devices").on("created", this.props.findDevices)
    app.service("devices").on("removed", this.props.findDevices)
    app.service("devices").on("patched", device => {
      this.props.findDevices()
      if (this.props.station) {
        if (device._id === this.props.station._id) {
          this.props.updateStation(device)
        }
      }
    })

    app.service("devices").on("online", id => {
      console.log(`Presence: ${id} is now Online!`)
    })

    app.service("devices").on("offline", id => {
      console.log(`Presence: ${id} is now Offline!`)
    })
  }

  componentWillUnmount = () => {
    app.service("devices").off("created")
    app.service("devices").off("removed")
    app.service("devices").off("patched")
    app.service("devices").off("online")
    app.service("devices").off("offline")
  }

  getNearest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const center = [coords.latitude, coords.longitude]
        console.info(`Current Position Detected as (${center[0]}, ${center[1]}), Setting Map Origin.`)
        this.setState({center})

        // Query the nearest device
        app.service("devices").find({
          query: {
            $limit: 1,
            loc: {$near: center},
            presence: "online"
          }
        }).then(({data, total}) => {
          if (total > 0) {
            const {_id, name, loc, ...item} = data[0]
            console.info("Setting Nearest Station to", name)
            this.props.setNearest({_id, name, lat: loc[0], lng: loc[1], ...item})
          }
        })
      }, err => console.error("getCurrentPosition ERROR", err))
    }
  }

  render = () => (
    <div style={{overflow: "hidden"}}>
      <InfoCard
        station={this.props.station}
        next={this.props.next}
      />
      <Maps
        center={this.state.center}
        pins={this.props.devices.data}
        onMarkerClick={this.props.setStation}
      />
    </div>
  )

}

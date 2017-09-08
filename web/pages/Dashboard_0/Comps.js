import React, {Component} from "react"
import c from "classnames"

import StatusIcon from "material-ui/svg-icons/action/swap-vertical-circle"
import OnlineIcon from "material-ui/svg-icons/device/wifi-tethering"
import OfflineIcon from "material-ui/svg-icons/communication/portable-wifi-off"

import Grid from "../../components/Grid"
import Paper from "../../components/Paper"

import app from "../../client/api"

import s from "./Dashboard.scss"

export const getPC = status => {
  if (status === "online")
    return s.online
  if (status === "offline")
    return s.offline
  return s.unknown
}

export const getPI = status => {
  if (status === "online")
    return <OnlineIcon />
  if (status === "offline")
    return <OfflineIcon />
  return <div />
}

export const Device = ({_id, name, loc, presence, queue = 0, beacon = {}, remove}) => (
  <div className={s.card}>
    <div className={s.device}>
      <h3 className={getPC(presence)} title={`(${loc[0].toFixed(5)}, ${loc[1].toFixed(5)})`}>
        {name} {getPI(presence)}
      </h3>
      {beacon.url && (
        <h4 className={s.sub}>
          {beacon.url}
        </h4>
      )}
      <h4 className={s.sub}>
        {queue} Queues
      </h4>
      <h5 className={s.sub}>
        HWID: {_id}
      </h5>
      <h6 className={s.sub}>
        {beacon.uid && <span>BUID: {beacon.uid}</span>}
      </h6>
    </div>
  </div>
)

class NewDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      lat: "",
      lng: ""
    }
  }

  componentDidMount() {
    this.getNearest()
  }

  getNearest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        this.setState({lat: coords.latitude, lng: coords.longitude})
      }, err => console.error("getCurrentPosition ERROR", err))
    }
  }

  submit = ({key}) => {
    if (key === "Enter") {
      app.service("devices").create({
        name: this.state.name,
        loc: [this.state.lat, this.state.lng]
      }).then(console.log)
    }
  }

  render = () => (
    <div className={c(s.card, s.create)}>
      <div className={s.offline}>
        <OfflineIcon />
      </div>
      <input
        value={this.state.name}
        onChange={e => this.setState({name: e.target.value})}
        onKeyPress={this.submit}
        className={s.name}
        placeholder="Device Name"
      />
      <input placeholder="Beacon Service URL" />
      <Grid r>
        <Grid xs={6}>
          <input
            value={this.state.lat}
            onChange={e => this.setState({lat: e.target.value})}
            placeholder="Latitude"
          />
        </Grid>
        <Grid xs={6}>
          <input
            value={this.state.lng}
            onChange={e => this.setState({lng: e.target.value})}
            placeholder="Longitude"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export const Devices = ({data, remove = () => {}}) => (
  <Grid r>
    <Grid xs={12} sm={6}>
      <NewDevice />
    </Grid>
    {data && data.map((device, i) => (
      <Grid key={i} xs={12} sm={6}>
        <Device remove={remove} {...device} />
      </Grid>
    ))}
  </Grid>
)

export const Heading = ({text, sub}) => (
  <Grid className={s.bottom} r>
    <Grid xs={12}>
      <h2 className={s.heading}>{text}</h2>
      <h3 className={s.sub}>{sub}</h3>
    </Grid>
  </Grid>
)

export const StatHeading = ({text, sub, stat, ctrl}) => (
  <Grid className={s.bottom} r>
    <Grid xs={12}>
      <div>
        <h2 className={s.heading}>{text}</h2>
        <h3 className={s.sub}>
          {sub}{(sub && stat) && <span>&nbsp;</span>}
          <span className={s.status}>
            <StatusIcon /> {stat}
          </span>
        </h3>
        <h4 className={s.sub}>
          {ctrl}
        </h4>
      </div>
    </Grid>
  </Grid>
)

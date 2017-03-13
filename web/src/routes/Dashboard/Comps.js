import React from "react"

import StatusIcon from "material-ui/svg-icons/action/swap-vertical-circle"
import OnlineIcon from "material-ui/svg-icons/device/wifi-tethering"
import OfflineIcon from "material-ui/svg-icons/communication/portable-wifi-off"

import Grid from "../../components/Grid"
import Paper from "../../components/Paper"

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
  <Paper style={{marginBottom: "1em"}}>
    <div className={s.device}>
      <h3 className={getPC(presence)}>
        {name} ({queue} Queue) {getPI(presence)}
      </h3>
      {loc && (
        <h4 className={s.sub}>
          ({loc[0].toFixed(7)}, {loc[1].toFixed(7)})
        </h4>
      )}
      {beacon && <h4 className={s.sub}>
        {beacon.uid} {beacon.url}
      </h4>}
      <h5 className={s.sub}>
        Id: {_id} <span onClick={() => remove(_id)}>[Delete]</span>
      </h5>
    </div>
  </Paper>
)

export const Devices = ({data, remove = () => {}}) => (
  <Grid r>
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

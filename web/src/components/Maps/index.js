import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import GoogleMap from "google-map-react"

import {MAP_STYLE, MapsAPIKey} from "../../constants"

import s from "./Maps.scss"

const getS = status => {
  if (status === "online")
    return false
  return s.grey
}

const MapPin = withStyles(s)(({onClick, ...item}) => (
  <div onClick={() => onClick(item)} className={c(s.tooltip, getS(item.presence))}>
    <div className={s.pin} />
    <div className={s.pulse} />
    <span>
      {item.name} - <span className={s.stat}>{item.presence || "Offline"}</span>
    </span>
    {item.name}
  </div>
))

const You = withStyles(s)(() => (
  <div className={s.sec}>
    <div className={s.pulse} />
  </div>
))

// center

const maps = {
  bootstrapURLKeys: {
    key: MapsAPIKey
  },
  defaultCenter: [13.740000, 100.5880000],
  defaultZoom: 11, // 21
  options: () => ({
    gestureHandling: "greedy",
    styles: MAP_STYLE
  })
}

const Maps = ({pins, center = maps.defaultCenter, onMarkerClick}) => (
  <GoogleMap center={center} {...maps}>
    {
      pins && pins.map(({loc, ...prop}, i) => (
        <MapPin
          key={i}
          lat={loc[0]}
          lng={loc[1]}
          onClick={onMarkerClick}
          {...prop}
        />
      ))
    }
    <You lat={center[0]} lng={center[1]} />
  </GoogleMap>
)

export default withStyles(s)(Maps)

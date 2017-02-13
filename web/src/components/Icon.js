import React from "react"
import icons from "../constants/icons.js"

export default props => (icons[props.i] ? (
  <svg
    viewBox={icons[props.i].viewBox || "0 0 24 24"}
    style={{fill: props.fill}}
    onClick={props.onClick}
  >
    <path d={icons[props.i].path} />
  </svg>
) : <div />)

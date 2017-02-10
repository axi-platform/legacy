import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./BeaconManager.scss"

const BeaconManager = props => (
  <div>
    ...
  </div>
)

export default connect(mapStateToProps)(withStyles(s)(BeaconManager))

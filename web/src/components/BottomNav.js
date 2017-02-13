import React from "react"
import {connect} from "react-redux"

import QueueIcon from "material-ui/svg-icons/av/queue"
import Paper from "material-ui/Paper"
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation"
import AttachFile from "material-ui/svg-icons/editor/attach-file"
import LocationOn from "material-ui/svg-icons/communication/location-on"

import {setUi} from "../ducks/app"

const BottomNav = props => (
  <div style={{position: "fixed", bottom: 0, width: "100%"}}>
    <Paper zDepth={1}>
      <BottomNavigation selectedIndex={props.section}>
        <BottomNavigationItem
          label="Select Stations"
          icon={<LocationOn />}
          onTouchTap={() => props.select(0)}
        />
        <BottomNavigationItem
          label="Upload File"
          icon={<AttachFile />}
          onTouchTap={() => props.select(1)}
        />
        <BottomNavigationItem
          label="Queue & Print"
          icon={<QueueIcon />}
          onTouchTap={() => props.select(2)}
        />
      </BottomNavigation>
    </Paper>
  </div>
)

const mapStateToProps = state => ({
  section: state.app.ui.section || 0
})

const mapDispatchToProps = dispatch => ({
  select: sect => dispatch(setUi("section", sect))
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)

import React from "react"
import {connect} from "react-redux"

import Grid from "../../Grid"
import Paper from "../../Paper"
import Button from "../../Button"

import {services} from "../../../client/api"
import {setUi, setStation, notify} from "../../../ducks/app"

import s from "./AddPrinter.scss"

const AddPrinter = props => (
  <div className={s.root}>
    <Paper>
      <Grid r>
        <Grid xs={12}>
          <div style={{marginTop: "-1.2em"}}>
            <TextField
              hintText="Where are you?"
              floatingLabelText="Location Name"
              onChange={props.setLoc}
              onKeyPress={ev => (ev.key === "Enter") && props.addLoc(props.loc)}
              value={props.loc}
            />
          </div>
        </Grid>
      </Grid>
      <Grid className={s.row} r>
        <Grid xs={12} sm={6}>
          <div>
            <Button onClick={() => props.addLoc(props.loc)} base b light>
              Add
            </Button>
          </div>
        </Grid>
        <Grid xs={12} sm={6}>
          <div>
            <Button onClick={() => props.removeDevice(props.station._id)} base b light>
              Remove
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid className={s.row} r>
        <Grid xs={12}>
          <div>
            <small className={s.small}>
              รหัสเชิงเทคนิค {props.station._id}
            </small>
          </div>
        </Grid>
      </Grid>
    </Paper>
  </div>
)

const mapStateToProps = state => ({
  loc: state.app.ui.fieldAddLocation || "",
  station: state.app.station || {}
})

const mapDispatchToProps = dispatch => ({
  addLoc: name => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(e => {
        dispatch(services.devices.create({
          name,
          loc: [e.coords.latitude, e.coords.longitude]
        })).then(({value: {loc, ...item}}) => {
          dispatch(notify(`Station ${name} has been added.`, "success"))
          dispatch(setStation({...item, lat: loc[0], lng: loc[1]}))
        }).catch(console.err)
      }, console.error)
    }
  },
  setLoc: e => dispatch(setUi("fieldAddLocation", e.target.value)),
  removeDevice: id => {
    dispatch(services.devices.remove(id))
    dispatch(setStation(null))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPrinter)

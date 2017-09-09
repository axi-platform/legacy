import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Paper from "../../Paper"
import Grid from "../../Grid"

import Queue, {Summary} from "./Queue"

import app, {services} from "../../../client/api"
import {notify, setStation, setUi} from "../../../ducks/app"
import {clearFiles} from "../../../ducks/files"

import s from "./PrintQueue.scss"

const mapStateToProps = state => ({
  station: state.app.station,
  files: state.files.list || [],
  queue: state.print.data,
  success: state.app.ui.success || false
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  enqueue: () => {
    dispatch(services.print.create({
      station: state.station._id,
      files: state.files
    })).then(queue => {
      console.info("Enqueued", queue)
      dispatch(notify("Queue has been successfully added. Please wait.", "success"))
    }).catch(err => {
      console.error("Error occured during enqueue:", err)
      dispatch(notify(`${err}`, "error"))
    })
  },
  cancel: (id, device) => {
    console.info("Cancelling", id, "at", device)
    dispatch(services.print.remove({id, device})).then(() => {
      dispatch(notify("Your Print Queue has been canceled.", "success"))
      dispatch(services.print.reset(true))
    }).catch(err => {
      console.error(err)
      dispatch(notify("Error encountered while trying to cancel your queue.", "error"))
    })
  },
  clear: () => {
    dispatch(services.print.reset(true))
    dispatch(setUi("section", 0))
    dispatch(setStation(null))
    dispatch(clearFiles())
    dispatch(notify("Operation Canceled. See you next time!"))
  },
  handleFailure: e => {
    dispatch(services.print.reset(true))
    dispatch(notify(`An error occured: ${e}. Operation is canceled.`))
    console.error(e)
  },
  handleSuccess: e => {
    dispatch(setUi("success", true))
    dispatch(notify("Your Document has been successfully printed. Thank You!", "success"))
    console.info("Print Success:", e)
  },
  reset: () => {
    dispatch(services.print.reset(true))
    dispatch(setUi("success", false))
    dispatch(setUi("section", 0))
    dispatch(clearFiles())
    dispatch(setStation(null))
  },
  notify: msg => dispatch(notify(msg))
})

@withStyles(s)
@connect(mapStateToProps, null, mergeProps)
export default class PrintQueue extends Component {

  componentDidMount = () => {
    app.service("print").on("printing", e => {
      if (this.props.station._id === e.device && this.props.queue.id === e.id) {
        this.props.notify(`Currently Printing...`)
        console.log("PRINTING", e)
      }
    })

    app.service("print").on("printed", () => {
      // console.log("PRINTED", e)
    })

    app.service("print").on("failed", e => {
      if (this.props.station._id === e.device && this.props.queue.id === e.id) {
        this.props.handleFailure(e)
      }
    })

    app.service("print").on("success", e => {
      if (this.props.station._id === e.device && this.props.queue.id === e.id) {
        this.props.handleSuccess(e)
      }
    })
  }

  componentWillUnmount = () => {
    app.service("print").off("printing")
    app.service("print").off("printed")
    app.service("print").off("failed")
    app.service("print").off("success")
  }

  render = () => (
    <Grid style={{paddingTop: "5.5em"}} c>
      <Grid style={{marginBottom: "1.5em"}} r>
        <Grid xs={12} sm={6}>
          <div>
            <Paper style={{marginBottom: "1.5em"}} title="Queue Information">
              <Queue {...this.props} />
            </Paper>
            <Summary station={this.props.station} files={this.props.files} />
          </div>
        </Grid>
        <Grid xs={12} sm={6}>
          <div>

          </div>
        </Grid>
      </Grid>
    </Grid>
  )

}

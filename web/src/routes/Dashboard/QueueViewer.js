import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import TextField from "material-ui/TextField"

import Grid from "../../components/Grid"
import Paper from "../../components/Paper"
import Button from "../../components/Button"

import {services} from "../../client/api"
import {notify} from "../../ducks/app"

import s from "./Dashboard.scss"

const mapStateToProps = state => ({
  user: state.user || {},
  queue: state.queue.queryResult || {},
  data: state.queue.data,
  station: state.app.station || {}
})

const mapDispatchToProps = dispatch => ({
  fetchQueues: device => {
    dispatch(services.queue.find({
      query: {device}
    })).then(({value}) => {
      if (value.total !== null && value.completed !== null) {
        const text = `Total Queue: ${value.total}; Completed: ${value.completed}`
        dispatch(notify(text, "success"))
      } else {
        dispatch(notify(`This device doesn't have any queues at the moment.`, "info"))
      }
    }).catch(err => {
      console.error(err)
      dispatch(notify(`Failed to fetch queue counts.`, "error"))
    })
  },
  getQueue: (id, device) => {
    dispatch(services.queue.get({id, device})).then(({value}) => {
      if (value) {
        dispatch(notify(`Queue #${id} has been fetched.`, "success"))
      } else {
        dispatch(notify("This queue number doesn't exist.", "error"))
      }
    }).catch(() => {
      dispatch(notify("Failed to get queue info", "error"))
    })
  }
})

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class QueueViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      num: ""
    }
  }

  onGetQueue = ev => {
    if (ev.key === "Enter")
      this.props.getQueue(ev.target.value, this.props.station._id)
  }

  render = () => (
    <Grid className={s.bottom} r>
      <Grid xs={12} sm={3}>
        <Paper>
          <h3 className={s.heading}>
            Queue Counter
          </h3>
          <br />
          <h4 className={s.heading}>
            Device: {this.props.station.name}
          </h4>
          <h5 className={s.sub}>
            ID: {this.props.station._id}
          </h5>
          <br />
          <Button onClick={() => this.props.fetchQueues(this.props.station._id)} base light>
            Fetch
          </Button>
        </Paper>
      </Grid>
      {this.props.queue.total && (
        <Grid xs={12} sm={3}>
          <Paper>
            <h3 className={s.heading}>Queue Explorer</h3>
            <br />
            <h4 className={s.heading}>
              Total Queues: {this.props.queue.total}
            </h4>
            <h4 className={s.heading}>
              Completed Queues: {this.props.queue.completed}
            </h4>
            <TextField
              hintText="1"
              floatingLabelText="Queue Number"
              onChange={e => this.setState({num: e.target.value})}
              onKeyPress={this.onGetQueue}
              value={this.state.num}
            />
          </Paper>
        </Grid>
      )}
      {this.props.data && (
        <Grid xs={12} sm={6} >
          <Paper>
            <div>
              <code>
                <pre className={s.pre}>
                  {JSON.stringify(this.props.data, null, 2)}
                </pre>
              </code>
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  )

}

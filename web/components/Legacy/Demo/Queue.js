import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./Demo.scss"

import Navbar from "../../components/Navbar"
import Grid from "../../components/Grid"
import Button from "../../components/Button"
import Paper from "../../components/Paper"

import app, {services} from "../../client/api"
import {notify} from "../../ducks/app"

const mapStateToProps = ({queue}) => ({
  data: queue.data || {},
  queues: queue.queryResult,
  number: queue.data && queue.data.id,
  total: (queue.queryResult && queue.queryResult.total) || 0,
  completed: (queue.queryResult && queue.queryResult.completed) || 0
})

const mapDispatchToProps = dispatch => ({
  reserve: () => {
    dispatch(services.queue.create({device: "queue"}))
      .then(({value}) => sessionStorage.setItem("queue", JSON.stringify(value)))
  },
  cancel: function (id) {
    dispatch(services.queue.patch("queue", {id, as: "canceled"}))
    this.reset()
  },
  complete: function (id) {
    dispatch(services.queue.patch("queue", {id, as: "completed"}))
      .then(() => {
        dispatch(notify("Your Queue is Confirmed. Have a great time!", "success"))
        this.reset()
      })
  },
  reset: function() {
    dispatch(services.queue.reset())
    this.fetch()
    sessionStorage.removeItem("queue")
  },
  fetch: () => dispatch(services.queue.find({query: {device: "queue"}})),
  notify: text => dispatch(notify(text)),
  load: () => {
    const payload = sessionStorage.getItem("queue")
    if (payload) {
      dispatch({
        type: "SERVICES_QUEUE_CREATE_FULFILLED",
        payload: JSON.parse(payload)
      })
    }
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export class Queue extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.load()
    app.service("queue").on("next", event => {
      // this.props.fetch()
      this.setState({id: event.id})
      if (event.id === this.props.number) {
        this.props.notify(`It's your queue! Please confirm now.'`)
      } else {
        console.log(`It's ${event.id}'s queue.`)
      }
    })
  }

  cancel = () => this.props.cancel(this.props.number)

  complete = () => {
    this.props.complete(this.props.number)
    this.props.onComplete()
  }

  render = () => (
    <div className={s.wrapper}>
      <div className={s.queue}>
        <p>Your Queue Number is</p>
        <b>{this.props.number || "- -"}</b>
        <p>
          Currently {(this.props.number ? this.props.number : this.props.total) - this.props.completed}
          &nbsp;queues in front of you.
        </p>
      </div>
      <div className={s.reserve}>
        {!this.props.number && (
          <Button onClick={this.props.reserve} base light>
            Reserve a Seat
          </Button>
        )}
      </div>
      <br />
      {this.state.id === this.props.number && (
        <div className={s.confirm}>
          <p>It's your queue. Confirm?</p>
          <Button onClick={this.complete} base light>
            Confirm this Seat
          </Button>
        </div>
      )}
      {this.props.number && (
        <div>
          <br />
          <Button onClick={this.cancel} base light>
            Abandon this Queue
          </Button>
        </div>
      )}
    </div>
  )
}

export default props => (
  <div>
    <Navbar />
    <Queue />
  </div>
)

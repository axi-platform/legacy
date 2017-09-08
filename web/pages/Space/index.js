import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Navbar from "../../components/Navbar"
import Grid from "../../components/Grid"
import Button from "../../components/Button"
import Paper from "../../components/Paper"
import Icon from "../../components/Icon"
import LoginForm from "../../components/Login"

import {setUi} from "../../ducks/app"
import {cover} from "../../constants/visual"
import app from "../../client/api"

import {Queue} from "../Demo/Queue"

import s from "./Space.scss"

const Plan = connect(null, dispatch => ({
  checkIn: i => {
    dispatch(setUi("spaceStep", 2))
    dispatch(setUi("spacePlan", i))
  }
}))(({i, name, price, people = 1, checkIn}) => (
  <Grid xs={6} sm={4} md={3} style={{marginBottom: "1em"}}>
    <div className={s.planCard}>
      <div className={s.cardImage} />
      <div className={s.plan}>
        <b>{name}</b>
        <div className={s.p}>
          <Icon i="user" /> {people} People<br />
          {price} Baht/Hour
        </div>
        <Button onClick={() => checkIn(i)} light base>
          Check In
        </Button>
      </div>
    </div>
  </Grid>
))

const plans = [{
  name: "Coworking Space",
  price: "50"
}, {
  name: "Tutoring Space",
  people: "2-4",
  price: "100"
}, {
  name: "Meeting Room",
  people: "5-15",
  price: "200"
}, {
  name: "Event Space",
  people: "16-30",
  price: "300"
}]

const checkIn = () => {
  app.service("command").create({
    project: "printat",
    device: "58c9fc5294546a0062436469", // this.props.station._id ||
    topic: "control",
    command: "9"
  })
}

const Space = ({step, setStep, plan = 0}) => (
  <div>
    <Navbar />
      <div className={s.plans} style={{display: step === 1 ? "block" : "none"}}>
        <Grid c className={s.main}>
          <h2 className={s.heading}>Axi Spaces: Please Select Your Plan</h2>
          <Grid r>
            {plans.map((item, i) => <Plan key={i} i={i} {...item} />)}
          </Grid>
        </Grid>
      </div>
      <div style={{display: step === 2 ? "block" : "none"}}>
        <Queue onComplete={checkIn} />
        {/*
          <div onClick={() => setStep(1)}>
            Choose another Plan
          </div>
        */}
      </div>
      <div style={{display: step === 3 ? "block" : "none"}}>

      </div>
  </div>
)

const mapStateToProps = state => ({
  step: state.app.ui.spaceStep || 1,
  plan: state.app.ui.spacePlan || 0
})

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(setUi("spaceStep", step))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Space))

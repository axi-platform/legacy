import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./Space.scss"

import Navbar from "../../components/Navbar"
import Grid from "../../components/Grid"
import Button from "../../components/Button"
import Paper from "../../components/Paper"

const Plan = ({name}) => (
  <Grid xs={6} md={3} style={{marginBottom: "1em"}}>
    <Paper>
      <div className={s.plan}>
        <img src="/images/isomac.svg" role="presentation" />
        <p>{name}</p>
      </div>
    </Paper>
  </Grid>
)

const Space = () => (
  <div>
    <Navbar />
    <Grid c className={s.main}>
      <h2>Axi Spaces: Physical Web for Co-working Space</h2>
      <br />

      <Paper className={s.paper} style={{display: "none"}}>
        <div className={s.checkin}>
          <h2>Check-In</h2>
          <Button light base>I&apos;m a Guest</Button>
          <Button light base>I&apos;m a Member</Button>
        </div>
      </Paper>

      <h2 className={s.heading}>Select Your Plan</h2>

      <div className={s.plans}>
        <Grid r>
          <Plan name="Co-Working Space" />
          <Plan name="Tutoring (2-4 People)" />
          <Plan name="Meeting Room (5-15 People)" />
          <Plan name="Event Hall (15-30 People)" />
        </Grid>
      </div>
    </Grid>
  </div>
)

export default withStyles(s)(Space)

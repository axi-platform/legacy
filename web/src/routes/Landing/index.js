import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./Landing.scss"

import Icon from "../../components/Icon"
import Grid from "../../components/Grid"

import LocatorMap from "../../components/PrintAt/LocatorMap"
import DocumentUpload from "../../components/PrintAt/DocumentUpload"
import PrintQueue from "../../components/PrintAt/PrintQueue"
import BottomNav from "../../components/BottomNav"

// Find a shop to print your work
// Print Anywhere, Instantly.

const Hero = () => (
  <div className={s.hero}>
    <div className={s.top}>
      <span>PrintAt</span>
    </div>
    <div className={s.searchCta}>
      <div className={s.icon}><Icon i="search" /></div>
      <div className={s.fakeInput}>Print your work, now.</div>
    </div>
  </div>
)

const Why = () => (
  <div>
    <div>
      <div>
        <h2>Can't find a print shop?</h2>
        <p>Maybe it's early morning or late night.</p>
        <p>Maybe it's unknown places, and you're in a hurry.</p>
      </div>
      <div>
        <h2>Doesn't have what you need.</h2>
        <p>Need Borderless and High Quality Glossy?</p>
        <p>Pick the ones you need.</p>
      </div>
      <div>
        <h2>Long Waiting Queues and Slow Printing.</h2>
        <p>Forgot about that..</p>
      </div>
      <div>
        <h2>You're in a damn hurry!</h2>
        <p>Slow PC. Manual Settings.</p>
      </div>
    </div>
  </div>
)

const Card = ({children}) => (
  <div className={s.card}>
    {children}
  </div>
)

const Finder = () => (
  <div>
    <Card>
      [CTA]
    </Card>
    <div>
      <h2 className={s.heading}>Filters</h2>
      <Grid r>
        <Grid xs={3}>
          <Card>
            Availability
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card>
            Pricing
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card>
            Location
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card>
            Reviews
          </Card>
        </Grid>
      </Grid>
    </div>
    <div>
      <h2 className={s.heading}>Print Shops near you.</h2>
      <Grid r>
        <Grid xs={6}>
          <Card>
            <h3>Putang Ina Mo Shop</h3>
            <div>A4, Colored, Borderless</div>
            <br />
            <div>15-250THB</div>
          </Card>
        </Grid>
        <Grid xs={6}>
          <Card>
            <h3>Putang Ina Mo Shop</h3>
            <div>A4, Colored, Borderless</div>
            <br />
            <div>15-250THB</div>
          </Card>
        </Grid>
      </Grid>
    </div>
  </div>
)

// <LocatorMap />
// <Why />
// <BottomNav />
// <DocumentUpload />

const Landing = () => (
  <div>
    <Hero />
    <div className={s.content}>

    </div>
  </div>
)

export default withStyles(s)(Landing)

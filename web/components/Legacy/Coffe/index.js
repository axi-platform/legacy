import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Icon from "../../components/Icon"
import Button from "../../components/Button"
import Grid from "../../components/Grid"

import s from "./Coffe.scss"

const font = "https://fonts.googleapis.com/css?family=Quicksand:400,500,600"

const Coffe = () => (
  <div>
    <link href={font} rel="stylesheet" />
    <nav className={s.nav}>
      <Icon i="menu" />
      <span>Quick Order</span>
      <Icon i="cart" />
    </nav>
    <main className={s.main}>
      <img src="/static/coffee1.svg" role="presentation" />
      <h2>Cappucino</h2>
      <h3>
        Dark, rich espresso lies in wait under a smoothed and
        stretched layer of thick foam. It's truly the height of
        our baristas' craft.
      </h3>
      <p className={s.price}>
        160 THB
      </p>
      <Grid className={s.details} r>
        <Grid xs={4}>
          <div className={s.detail}>
            <img src="/static/coffee5.svg" role="presentation" />
            <p>Dark</p>
          </div>
        </Grid>
        <Grid xs={4}>
          <div className={s.detail}>
            <img src="/static/coffee2.svg" role="presentation" />
            <p>2 Sugars</p>
          </div>
        </Grid>
        <Grid xs={4}>
          <div className={s.detail}>
            <img src="/static/coffee3.svg" role="presentation" />
            <p>Grande</p>
          </div>
        </Grid>
      </Grid>
      <div className={s.place}>
        <Icon i="pin" />
        <span>Chaodoi Coffee, Suvinthawong Rd.</span>
      </div>
      <div className={s.more}>
        <img src="/static/coffee4.svg" role="presentation" />
        <span>Add a Muffin only for 100 THB extra</span>
      </div>
      <div className={s.order}>
        <Button light>
          Order Now
        </Button>
      </div>
    </main>
  </div>
)

export default withStyles(s)(Coffe)

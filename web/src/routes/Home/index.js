import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Icon from "../../components/Icon"

import s from "./Home.scss"

const More = ({text, hero}) => (
  <div className={c(s.more, hero && s.hero)}>
    <span>{text}</span>
    <Icon i="play" />
  </div>
)

// TODO: Developers, Entrepreneurs and Makers
const Fold = () => (
  <section className={s.fold}>
    <div className={s.intro}>
      <h2>
        Turn Amazing Ideas into IoT Solutions
        <br className={s.break} />
        &nbsp;with Axi Platform
      </h2>
      <h3>
        With Physical Web, Cloud Services, and Internet of Things,
        <br className={s.break} />
        &nbsp;Axi helps you to develop innovative services.
      </h3>
      <More text="Watch the Intro" hero />
    </div>
    <div className={s.graphic}>
      <img src="https://fi.google.com/about/static/images/home/hero.svg" alt="intro" />
    </div>
  </section>
)

// TODO: Interactive Idea Generetor
const Ideas = () => (
  <section>
    <h2>Out of Ideas? Here are some possibilities.</h2>
    <div>[::Interactive]</div>
    <div>
      Smart Co-working Spaces
      ::AXI Spaces
    </div>
    <div>
      Public Printing Service
      ::PrintAt
    </div>
    <div>
      Self-Study Learning Space
      ::FlipED NEXT
    </div>
    <div>
      E-residency System
      ::Kalaland
    </div>
    <div>
      Smart Coffee Shops
      ::AXI Coffee
    </div>
  </section>
)

const Rationale = () => (
  <section className={s.why}>
    <Grid r>
      <Grid xs={12} sm={6}>
        <div className={s.reason}>
          <h2>Build Practical Solutions, not just toys.</h2>
          <p>
            It isn't just turning things on and viewing data from sensors anymore.
            Real-World IoT Solutions have a considerable amount of moving parts,
            so we provided a flexible framework to develop on.
          </p>
          <More text="Try Some Examples" />
        </div>
      </Grid>
      <Grid xs={12} sm={6}>
        <video className={s.video} preload="auto" loop autoPlay poster="https://fi.google.com/about/static/videos/home/multiple_networks.png">
          <source src="https://fi.google.com/about/static/videos/home/multiple_networks.mp4" type="video/mp4" />
        </video>
      </Grid>
    </Grid>
    <Grid r>
      <Grid xs={12} sm={6}>
        [::Graphical]
      </Grid>
      <Grid xs={12} sm={6}>
        <h2>Stay Ahead of the Trend</h2>
        <p>
          Axi implements the cutting edge technologies to empower your solution.
          From Managing Beacons and Devices, composing Microservices,
          up until Cloud Deployments.
        </p>
      </Grid>
    </Grid>
  </section>
)

const Techs = () => (
  <section>
    <h2>Technology matters.</h2>
    <h3>Here are the technologies we use.</h3>
    <div>
      Physical Web Beacons
    </div>
    <div>
      Internet of Things
    </div>
    <div>
      Progressive Web Apps
    </div>
    <div>
      Cloud Microservices
    </div>
    <div>
      High Availability Infrastructure
    </div>
  </section>
)

const Features = () => (
  <section>
    <h2>
      One Dashboard to rule them all
    </h2>
    <h2>
      Modular & Composable
    </h2>
    <p>
      Service Oriented -> Compose them together.
    </p>
    <h2>Use Instantaneously</h2>
    <h2>
      Decentralized Approach
    </h2>
    <h2>
      Scale Effortlessly
    </h2>
  </section>
)

// Navbar:: [Logo::Project Axi] ... [Login] [Sign up]
// Possibilities Examples Ideas
// Technologies
// Rationale
// Features

@withStyles(s)
class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {scrolled: false}
  }

  componentDidMount = () => window.addEventListener("scroll", this.scroll)

  componentWillUnmount = () => window.removeEventListener("scroll", this.scroll)

  scroll = () => {
    if (window.scrollY > 150)
      this.setState({scrolled: true})
    else
      this.setState({scrolled: false})
  }

  render = () => (
    <nav className={c(s.nav, this.state.scrolled && s.scrolled)}>
      <div className={s.left}>
        <h1>Project Axi</h1>
        <a href="#!">Rationale</a>
        <a href="#!">Example</a>
        <a href="#!">Feature</a>
        <a href="#!">FAQ</a>
      </div>
      <div className={s.center} />
      <div className={s.right}>
        <a href="#!">Sign In</a>
        <a href="#!" className={s.try}>Try Now</a>
      </div>
    </nav>
  )

}

const Home = () => (
  <div>
    <Nav />
    <main>
      <Fold />
      <Rationale />
      <Ideas />
      <Features />
      <Techs />
    </main>
  </div>
)

export default withStyles(s)(Home)

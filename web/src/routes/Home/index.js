import React from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Nav from "./Nav"
import Grid from "../../components/Grid"
import Icon from "../../components/Icon"

import s from "./Home.scss"

/*
const Techs = () => (
  <section className={s.tech}>
    <h2>Our Technologies</h2>
    <Grid r>
      <Idea t="Physical Web Beacons" />
      <Idea t="Internet of Things" />
      <Idea t="Progressive Web Apps" />
      <Idea t="Cloud Microservices" />
      <Idea t="High Availability Infrastructure" />
    </Grid>
  </section>
)
*/

const defaultImage = "https://fi.google.com/about/static/images/home/fi_documents.svg"

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
        &nbsp;Axi joins you to develop innovative products.
      </h3>
      <More text="Watch the Intro" hero />
    </div>
    <div className={s.graphic}>
      <img src="https://fi.google.com/about/static/images/home/hero.svg" alt="intro" />
    </div>
  </section>
)

const Reason = ({r, p, ra, more, img = defaultImage, children}) => (
  <Grid r>
    <Grid className={c(s.rel, p && s.p, r && s.r)} xs={12} sm={6}>
      <div className={c(s.trig, r && s.r)} />
      <div className={c(s.reason, p && s.p, r && s.r, ra && s.ra)}>
        {children}
        <More text={more} />
      </div>
    </Grid>
    <Grid xs={12} sm={6}>
      <div className={s.deco}>
        <img src={img} />
      </div>
    </Grid>
  </Grid>
)

const Rationale = () => (
  <section className={s.why}>
    <Reason more="Try Some Examples">
      <h2>
        Build Practical Solutions, not toys
      </h2>
      <p>
        Real IoT Solutions are not just turning things on and viewing
        data from sensors. Axi provides a reliable platform to develop with
        those moving parts in mind.
      </p>
    </Reason>
    <Reason more="View The Technologies" r>
      <h2>Stay Ahead of the Curve</h2>
      <p>
        Axi implements cutting edge technologies to empower your solution.
        From Managing Beacons and Devices, composing Microservices,
        up until Cloud Deployments.
      </p>
    </Reason>
    <Reason more="Know the Physical Web" img="/images/isocity.svg" ra>
      <h2>
        Instantaneous Interaction with
        <br />
        Google&apos;s Physical Web
      </h2>
      <p>
        Your users should be able to just walk up and use anything.
        With Contextual Beacons and Progressive Web Apps,
        it's only a tap away.
      </p>
    </Reason>
    <Reason more="Request a Demo" r>
      <h2>
        Decentralized Control,
        <br />
        Centralized Dashboard
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </p>
    </Reason>
    <Reason more="Learn More">
      <h2>
        Modular and Scalable
      </h2>
      <p>
        Our service-oriented architecture allows you to compose multiple
        Microservices together, in the High Availability Infrastructure
        to scale and meet your goals.
      </p>
    </Reason>
  </section>
)

const Idea = ({t, ds, img = defaultImage}) => (
  <Grid xs={12} sm={3}>
    <h2>{t}</h2>
    <div className={s.deco}>
      <img className={c(ds && s.ds)} style={{height: `${ds}em`}} src={img} />
    </div>
  </Grid>
)

// TODO: Interactive Idea Generetor
const Ideas = () => (
  <section className={s.ideas}>
    <h2>Out of Ideas? Here are some possibilities.</h2>
    <Grid r>
      <Idea t="PrintAt" img="/images/pw_logo.svg" ds="4.5" />
      <Idea t="Smart Co-working Spaces" img="/images/pw_logo.svg" ds="4.5" />
      <Idea t="Smart City" img="/images/pw_logo.svg" ds="4.5" />
      <Idea t="Access Control" img="/images/pw_logo.svg" ds="4.5" />
    </Grid>
  </section>
)

const Join = () => (
  <section className={s.join}>
    <h2>It's simple to join.</h2>
  </section>
)

const Home = () => (
  <div>
    <Nav />
    <main>
      <Fold />
      <Rationale />
      <Ideas />
      <Join />
      <div>
        Illustrations are&nbsp;
        <a href="http://www.freepik.com/free-vector/blue-isometric-technological-city_893734.htm">
          Designed by Freepik
        </a>
      </div>
    </main>
  </div>
)

export default withStyles(s)(Home)

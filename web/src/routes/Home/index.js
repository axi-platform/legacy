import React from "react"
import c from "classnames"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Nav from "./Nav"
import Scroll from "./Scroll"

import Grid from "../../components/Grid"
import Icon from "../../components/Icon"

import s from "./Home.scss"

const More = ({text, hero, link}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={c(s.more, hero && s.hero)}
  >
    <span>{text}</span>
    <Icon i="play" />
  </a>
)

// TODO: Developers, Entrepreneurs and Makers
// TODO: IoT Solutions
const Fold = () => (
  <section className={s.fold}>
    <div className={s.intro}>
      <h2>
        Turn Amazing Ideas into Physical Web Solutions
        <br className={s.break} />
        &nbsp;with Axi Platform
      </h2>
      <h3>
        With Physical Web, Cloud Microservices, and Internet of Things,
        <br className={s.break} />
        &nbsp;Axi joins you to develop innovative products.
      </h3>
      <Link to="/printat" style={{textDecoration: "none"}}>
        <More text="Try the Demo" hero />
      </Link>
    </div>
    <div className={s.graphic}>
      <img src="https://fi.google.com/about/static/images/home/hero.svg" alt="intro" />
    </div>
  </section>
)

const Reason = ({r, p, ra, ic, more, img, link, children}) => (
  <Grid r>
    <Grid className={c(s.rel, p && s.p, r && s.r)} xs={12} sm={6}>
      <div className={c(s.trig, r && s.r)} />
      <div className={c(s.reason, p && s.p, r && s.r, ra && s.ra)}>
        {children}
        <More text={more} link={link} />
      </div>
    </Grid>
    <Grid xs={12} sm={6}>
      <div className={s.deco}>
        <img src={img} className={ic} role="presentation" />
      </div>
    </Grid>
  </Grid>
)

// NOTE: instantaneously Interact with Google's Physical Web

const Rationale = () => (
  <section className={s.why}>
    <Reason
      more="Learn about the Physical Web"
      link="https://google.github.io/physical-web/"
      img="/images/isocity.svg"
      ic={s.phyweb}
      ra
    >
      <h2>
        Walk Up and Use Anything&nbsp;
        <br className={s.break} />
        in just a tap
      </h2>
      <p>
        Your users should be able to easily interact with your product.&nbsp;
        <br className={s.breakmd} />
        With Contextual Beacons and Progressive Web Apps, it is literally a
        tap away. Axi gives you the foundation to deliver the best experience.
      </p>
    </Reason>
    <Reason more="View The Technologies" img="/images/isodata.svg" ic={s.isodata} r>
      <h2>Stay Ahead of the Curve</h2>
      <p>
        Axi implements various cutting edge technologies to fill in the gaps and
        empower your solutions. From managing beacons and IoT devices,
        composing microservices, and system monitoring.
      </p>
    </Reason>
    <Reason more="Try Some Examples" img="/images/gamechars.svg">
      <h2>
        Build Practical Solutions, not toys
      </h2>
      <p>
        Real Solutions are not just turning things on and viewing
        data from sensors. Axi incorporates the core requirements of building
        solutions based on our real world experiences and in-house projects.
      </p>
    </Reason>
    <Reason more="Try it Out for Free" img="/images/isomac.svg" r>
      <h2>
        Decentralized Control,
        <br />
        Centralized Dashboard
      </h2>
      <p>
        Axi Dashboard helps you to monitor and control every moving parts in
        your solution. However, we relies on trusted third-parties, so you
        can freely choose and switch between providers with no lock-ins.
    </p>
    </Reason>
    <Reason more="Learn More" img="/images/isocitymono.svg" ic={s.isomono}>
      <h2>
        Open, Modular and Scalable
      </h2>
      <p>
        Our service-oriented architecture allows you to compose multiple
        Microservices together to form a solution. The High Availability
        Infrastructure ensures that you could scale and meet your goals.
      </p>
    </Reason>
  </section>
)

const Idea = ({t, ds, to = "#!", img = defaultImage}) => (
  <Grid sm={3} xs={6}>
    <Link to={to} className={s.link}>
      <div className={s.idea}>
        <h2>{t}</h2>
        <div className={s.deco}>
          <img
            className={c(ds && s.ds)}
            style={{height: `${ds}em`}}
            src={img}
            role="presentation"
          />
        </div>
      </div>
    </Link>
  </Grid>
)

// TODO: Interactive Idea Generetor
// Out of Ideas? Here are some Possibilities.
// Have a look at the Awesome Projects built with Axi

const Ideas = () => (
  <section className={s.ideas}>
    <h2>Project Showcase</h2>
    <Grid r>
      <Idea t="PrintAt" img="/images/pw_logo.svg" to="/printat" ds="4.5" />
      <Idea t="Co-working Space" img="/images/pw_logo.svg" to="/space" ds="4.5" />
      <Idea t="Smart City" img="/images/pw_logo.svg" ds="4.5" />
      <Idea t="Coffe Instante" img="/images/coffee1.svg" to="/coffe" ds="4.5" />
    </Grid>
  </section>
)

const Join = () => (
  <section className={s.join}>
    <h2>It&apos;s simple to join.</h2>
  </section>
)

const Footer = () => (
  <div />
)

const Home = () => (
  <div>
    <Nav />
    <main>
      <Fold />
      <Rationale />
      <Ideas />
      <Join />
      <Footer />
    </main>
  </div>
)

export default withStyles(s)(Home)

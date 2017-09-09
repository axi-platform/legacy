import React from 'react'
import Link from 'next/link'

import {
  Row, Col, FoldSection, Hero, HeroImg, Intro, Heading, SubHeading, MoreText,
  Why, ReasonRoot, Break, BreakMedium, Trig, DecoImage, IdeaSection, JoinSection,
  IdeaHeading, Anchor, Page, landingColor, Nav
} from '../components/Landing/index'

import Icon from '../components/Icon'

const More = ({text, link}) => (
  <Link href={link}>
    <Anchor>
      <MoreText>{text}</MoreText>
      <Icon i='play' size={1.5} fill={landingColor} />
    </Anchor>
  </Link>
)

// TODO: Developers, Entrepreneurs and Makers
// Turn Amazing Ideas into Physical Web Solutions
// <Break />
// &nbsp;with Axi Platform

const Fold = () => (
  <FoldSection>
    <Intro>
      <Heading>
        Turn Amazing Ideas into Magical Solutions
        <Break />
        &nbsp;with Axi Platform
      </Heading>
      <SubHeading>
        With Physical Web, Cloud Microservices, and Internet of Things,
        <Break />
        &nbsp;Axi joins you to develop innovative products.
      </SubHeading>
      <Link href='/printat' passHref>
        <More text='Try the Demo' hero />
      </Link>
    </Intro>
    <Hero>
      <HeroImg src='https://fi.google.com/about/static/images/home/hero.svg' alt='' />
    </Hero>
  </FoldSection>
)

const Reason = ({more, img, link, children}) => (
  <Row>
    <Col>
      <Trig />
      <ReasonRoot right>
        {children}
        <More text={more} link={link} />
      </ReasonRoot>
    </Col>
    <Col>
      <DecoImage src={img} alt='' ic />
    </Col>
  </Row>
)

// NOTE: Instantaneously Interact with Google's Physical Web
const Rationale = () => (
  <Why>
    <Reason
      more='Learn about the Physical Web'
      link='https://google.github.io/physical-web/'
      img='/images/isocity.svg'
    >
      <h2>
        Walk Up and Use Anything&nbsp;
        <Break />
        in just a tap
      </h2>
      <p>
        Your users should be able to easily interact with your product.&nbsp;
        <BreakMedium />
        With Contextual Beacons and Progressive Web Apps, it is literally a
        tap away. Axi gives you the foundation to deliver the best experience.
      </p>
    </Reason>
    <Reason more='View The Technologies' img='/images/isodata.svg'>
      <h2>Stay Ahead of the Curve</h2>
      <p>
        Axi implements various cutting edge technologies to fill in the gaps and
        empower your solutions. From managing beacons and IoT devices,
        composing microservices, and system monitoring.
      </p>
    </Reason>
    <Reason more='Try Some Examples' img='/images/gamechars.svg'>
      <h2>
        Build Practical Solutions, not toys
      </h2>
      <p>
        Real Solutions are not just turning things on and viewing
        data from sensors. Axi incorporates the core requirements of building
        solutions based on our real world experiences and in-house projects.
      </p>
    </Reason>
    <Reason more='Try it Out for Free' img='/images/isomac.svg' r>
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
    <Reason more='Learn More' img='/images/isocitymono.svg'>
      <h2>
        Open, Modular and Scalable
      </h2>
      <p>
        Our service-oriented architecture allows you to compose multiple
        Microservices together to form a solution. The High Availability
        Infrastructure ensures that you could scale and meet your goals.
      </p>
    </Reason>
  </Why>
)

const MaybeLink = props => props.link ? <Link {...props} /> : <div>{props.children}</div>

const Idea = ({h, t, to = '#!', img = defaultImage}) => (
  <Row>
    <MaybeLink href={to}>
      <IdeaSection>
        <IdeaHeading>{t}</IdeaHeading>
        <DecoImage height={h} src={img} />
      </IdeaSection>
    </MaybeLink>
  </Row>
)

// TODO: Interactive Idea Generetor
// Out of Ideas? Here are some Possibilities.
// Have a look at the Awesome Projects built with Axi

const Ideas = () => (
  <IdeaSection>
    <h2>Project Showcase</h2>
    <Row>
      <Idea t='PrintAt' img='/images/pw_logo.svg' to='/printat' />
      <Idea t='Co-working Space' img='/images/pw_logo.svg' to='/space' />
      <Idea t='Smart City' img='/images/pw_logo.svg' to='/demo' />
      <Idea t='Coffe Instante' img='/images/coffee1.svg' to='/coffe' />
    </Row>
  </IdeaSection>
)

const Join = () => (
  <JoinSection>
    <h2>It&apos;s simple to join.</h2>
  </JoinSection>
)

const Landing = () => (
  <Page>
    <Nav />
    <main>
      <Fold />
      <Rationale />
      <Ideas />
      <Join />
    </main>
  </Page>
)

export default Landing

import React from 'react'
import Link from 'next/link'
import styled from 'emotion/react'

import Nav from './Nav'
import Icon from '../../components/Icon'

const landingColor = '#1B5A7A'
const subColor = '#757575'
const containerWidth = '980px'

const Row = styled.div`

`

const Col = styled.div`

`

const FoldSection = styled.section`
  height: 100vh;
`

const Hero = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1.5em;
`

const HeroImg = styled.img`
  bottom: 0;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
  width: 100%;
`

const Intro = styled.div`
  position: absolute;
  top: 27.3%;
  left: 50%;
  z-index: 3;

  width: 90%;
  text-align: center;
  transform: translate(-50%, 0);
`

const Heading = styled.h2`
  color: ${landingColor};
  font-size: 2.5em;
  text-shadow: 0px 1px 3px rgba(0,0,0,0.3);

  @media screen and (max-width: ${mediumScreen}) {
    font-size: 2em;
  }

  @media screen and (max-width: ${extraSmallScreen}) {
    font-size: 1.8em;
  }
`

const SubHeading = styled.h3`
  color: ${subColor};
  margin-top: 1em;
  font-size: 1.1em;
  line-height: 1.6em;

  @media screen and (max-width: ${mediumScreen}) {
    font-size: 1.05em;
  }

  @media screen and (max-width: ${extraSmallScreen}) {
    font-size: 1em;
  }
`

const MoreText = styled.span`
  align-self: center;
  margin-right: 0.6em;
  transition: all 1s cubic-bezier(0.03, 0.86, 0.57, 1);

  color: ${landing};
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  &:hover > span {
    margin-right: 1.3em;
  }
`

const Why = styled.sectio`
  > ${Row} {
    margin-top: 1em;
  }
`

const ReasonRoot = styled.div`
  padding: 5em 6em;

  > h2 {
    font-size: 1.8em;
    color: $landing;
  }

  > p {
    margin-bottom: 1.5em;
  }

  @media screen and (max-width: ${mediumScreen}) {
    padding: 2em 3em;
  }

  @media screen and (max-width: ${smallScreen}) {
    text-align: center !important;
  }

  @media screen and (max-width: ${extraSmallScreen}) {
    padding: 1em 2em;
  }
`

const Rel = styled.div`
  position: relative;

  ${props => props.right && css`
    background: ${landing};
    text-align: right;

    @media screen and (min-width: ${smallScreen}) {
      order: 1;
    }
  `}

  ${props => props.white && css`
    > h2, > p, > .more > span {
      color: $white;
    }

    > .more > svg {
      fill: white;
    }
  `}
`

const Break = styled.div`
  @media screen and (max-width: ${smallScreen}) {
    display: none
  }
`

const BreakMedium = styled.div`
  @media screen and (max-width: ${mediumScreen}) {
    display: none
  }
`

const Trig = styled.div`
  position: absolute;
  right: -1em;
  top: 38%;

  width: 2em;
  height: 2em;
  background: white;
  transform: rotate(135deg);

  ${props => props.right && css`
    left: -1em;
    right: initial;
  `}
`

// isodata: width 40% sWidth 30%
// phyweb: width 65% top 6em sWidth 40% sTop 1
// isomono: width 60% top 4em sWidth 45% sTop 0
const DecoImage = styled.div`
  align-self: center;
  width: ${props => props.width || 50}%;
  margin-top: ${props => props.top || 2}em;
  margin-bottom: 2em;

  @media screen and (max-width: ${smallScreen}) {
    width: {props => props.sWidth || 35}%;
    margin-top: ${props => props.sTop || 1}em;
    margin-bottom: ${props => props.sBottom || 1}em;
  }
`

// ds => width: initial; margin-top: 1em;
const IdeaSection = styled.section`
  padding-top: 5em;
  max-width: ${containerWidth};
  margin: 0 auto;
  text-align: center;

  > h2 {
    font-size: 1.6em;
    margin-bottom: 1em;
    color: $landing;
  }
`

const JoinSection = styled.section`
  text-align: center;
  padding-top: 3em;
`

const More = ({text, link}) => (
  <Link href={link}>
    <span>{text}</span>
    <Icon i='play' size={1.5} fill={landing} />
  </Link>
)

// TODO: Developers, Entrepreneurs and Makers
const Fold = () => (
  <FoldSection>
    <Intro>
      <Heading>
        Turn Amazing Ideas into Physical Web Solutions
        <Break />
        &nbsp;with Axi Platform
      </Heading>
      <SubHeading>
        With Physical Web, Cloud Microservices, and Internet of Things,
        <Break />
        &nbsp;Axi joins you to develop innovative products.
      </SubHeading>
      <Link to='/printat'>
        <More text='Try the Demo' hero />
      </Link>
    </Intro>
    <HeroImg>
      <Hero src='https://fi.google.com/about/static/images/home/hero.svg' alt='' />
    </HeroImg>
  </FoldSection>
)

const Reason = ({more, img, link, children}) => (
  <Row>
    <Col>
      <Trig />
      <ReasonRoot>
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

const Idea = ({h, href = '#!', img = defaultImage}) => (
  <Row>
    <MaybeLink href={href}>
      <IdeaSection>
        <h2>{t}</h2>
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
      <Idea t='PrintAt' img='/images/pw_logo.svg' to='/printat' ds='4.5' />
      <Idea t='Co-working Space' img='/images/pw_logo.svg' to='/space' ds='4.5' />
      <Idea t='Smart City' img='/images/pw_logo.svg' to='/demo' ds='4.5' />
      <Idea t='Coffe Instante' img='/images/coffee1.svg' to='/coffe' ds='4.5' />
    </Row>
  </IdeaSection>
)

const Join = () => (
  <JoinSection>
    <h2>It&apos;s simple to join.</h2>
  </JoinSection>
)

const Home = () => (
  <div>
    <Nav />
    <main>
      <Fold />
      <Rationale />
      <Ideas />
      <Join />
    </main>
  </div>
)

export default Home

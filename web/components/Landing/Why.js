import React from 'react'
import styled from 'react-emotion'
import {css} from 'emotion'

import {
  Break, BreakMedium, DecoImage,
  More, MoreText, landingColor
} from './Layout'

import {mediumScreen, smallScreen, extraSmallScreen} from '../../core/style'

const Row = styled.div`
  display: flex;
`

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${smallScreen}px) {
    flex: ${props => props.flex || 1};
    order: ${props => props.right ? 1 : 0};
  }
`

const WhySection = styled.section`
  > ${Row} {
    margin-top: 1em;
  }
`

export const Trig = styled.div`
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

export const ReasonBox = styled.div`
  padding: 2em 6em;
  position: relative;

  > a {
    @media screen and (max-width: ${smallScreen}px) {
      justify-content: center;
    }
  }

  > h2 {
    font-size: 1.8em;
    font-weight: 300;
    color: ${landingColor};
  }

  > p {
    margin-bottom: 1.5em;
    line-height: 1.6em;
  }


  ${props => props.right && css`
    background: ${landingColor};
    text-align: right;

    > h2, > p, > ${MoreText} > span {
      color: white;
    }

    > svg {
      fill: white;
    }
  `}

  @media screen and (max-width: ${mediumScreen}px) {
    padding: 2em 3em;
  }

  @media screen and (max-width: ${smallScreen}px) {
    text-align: center;
  }

  @media screen and (max-width: ${extraSmallScreen}px) {
    padding: 1em 2em;
  }
`

const Reason = ({right, more, img, link, children}) => (
  <Row>
    <Col right={right}>
      <Trig />
      <ReasonBox right={right}>
        {children}
        <More text={more} link={link} />
      </ReasonBox>
    </Col>
    <Col>
      <DecoImage src={img} alt='' ic />
    </Col>
  </Row>
)

// NOTE: Instantaneously Interact with Google's Physical Web
const Why = () => (
  <WhySection>
    <Reason
      more='Learn about the Physical Web'
      link='https://google.github.io/physical-web/'
      img='/static/isocity.svg'
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
    <Reason more='View The Technologies' img='/static/isodata.svg' right>
      <h2>Stay Ahead of the Curve</h2>
      <p>
        Axi implements various cutting edge technologies to fill in the gaps and
        empower your solutions. From managing beacons and IoT devices,
        composing microservices, and system monitoring.
      </p>
    </Reason>
    <Reason more='Try Some Examples' img='/static/gamechars.svg'>
      <h2>
        Build Practical Solutions, not toys
      </h2>
      <p>
        Real Solutions are not just turning things on and viewing
        data from sensors. Axi incorporates the core requirements of building
        solutions based on our real world experiences and in-house projects.
      </p>
    </Reason>
    <Reason more='Try it Out for Free' img='/static/isomac.svg' right>
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
    <Reason more='Learn More' img='/static/isocitymono.svg'>
      <h2>
        Open, Modular and Scalable
      </h2>
      <p>
        Our service-oriented architecture allows you to compose multiple
        Microservices together to form a solution. The High Availability
        Infrastructure ensures that you could scale and meet your goals.
      </p>
    </Reason>
  </WhySection>
)

export default Why

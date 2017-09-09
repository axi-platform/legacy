import React from 'react'
import styled from 'react-emotion'
import Link from 'next/link'

import {Break, More, landingColor, subColor} from './Layout'

import {mediumScreen, extraSmallScreen} from '../../core/style'

export const FoldSection = styled.section`
  height: 100vh;
`

export const Hero = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1.5em;
`

export const HeroImg = styled.img`
  bottom: 0;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
  width: 100%;
`

export const Intro = styled.div`
  position: absolute;
  top: 27.3%;
  left: 50%;
  z-index: 3;

  width: 90%;
  text-align: center;
  transform: translate(-50%, 0);
`

// text-shadow: 0px 1px 3px rgba(0,0,0,0.3);
export const Heading = styled.h2`
  color: ${landingColor};
  font-size: 2.5em;
  font-weight: 300;

  @media screen and (max-width: ${mediumScreen}) {
    font-size: 2em;
  }

  @media screen and (max-width: ${extraSmallScreen}) {
    font-size: 1.8em;
  }
`

export const SubHeading = styled.h3`
  color: ${subColor};
  margin-top: 1em;
  font-size: 1.1em;
  line-height: 1.6em;
  font-weight: 300;

  @media screen and (max-width: ${mediumScreen}) {
    font-size: 1.05em;
  }

  @media screen and (max-width: ${extraSmallScreen}) {
    font-size: 1em;
  }
`

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

export default Fold

import React from 'react'
import styled from 'react-emotion'
import {keyframes} from 'emotion'
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'
import Particles from 'react-particles-js'

import {Break, More} from './Layout'

import {mediumScreen, extraSmallScreen} from '../../core/style'

export const FoldSection = styled.section`
  position: relative;
  height: 100vh;

  @media screen and (max-width: ${mediumScreen}px) {
    height: 80vh;
  }

  @media screen and (max-width: ${extraSmallScreen}px) {
    height: 60vh;
  }
`

export const Intro = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 3;

  padding: 0.8em;
  width: 90%;
  text-align: left;
  pointer-events: none;

  @media screen and (max-width: ${mediumScreen}px) {
    top: 25%;
  }

  @media screen and (max-width: ${extraSmallScreen}px) {
    top: 17%;
  }
`

const blinking = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

// text-shadow: 0px 1px 3px rgba(0,0,0,0.3);
export const Heading = styled.h1`
  margin: 0;
  line-height: 1.3em;
  color: white;
  font-size: 2.5em;
  font-weight: 300;

  @media screen and (max-width: ${mediumScreen}px) {
    font-size: 2em;
  }

  @media screen and (max-width: ${extraSmallScreen}px) {
    font-size: 1.4em;
  }

  > .Cursor {
    display: inline-block;
  }

  > .Cursor.Cursor--blinking {
    opacity: 1;
    animation: ${blinking} 1s linear infinite;
  }
`

export const SubHeading = styled.h2`
  color: white;
  margin-top: 1em;
  font-size: 1.1em;
  line-height: 1.6em;
  font-weight: 300;

  @media screen and (max-width: ${mediumScreen}px) {
    font-size: 1.05em;
  }

  @media screen and (max-width: ${extraSmallScreen}px) {
    font-size: 1em;
  }
`

// background: linear-gradient(45deg, #3a3897, #a3a1ff);
const Banner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: skewY(-12deg);
  transform-origin: 0;
  background: linear-gradient(45deg, hsl(264, 46%, 41%), hsl(241, 100%, 82%));
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2);
`

export const HeroImg = styled.img`
  position: absolute;
  bottom: 2px;
  left: 50%;
  pointer-events: none;

  transform: translate(-50%, 0) rotate(-12deg);
  transform-origin: 0;

  width: 100%;
  mix-blend-mode: luminosity;
`

const particle = {
  style: {
    position: 'absolute',
    top: 0
  },
  params: {
    particles: {
      number: {
        value: 15,
        density: {
          enable: true,
          value_area: 800
        }
      },
      opacity: {
        value: 0.5,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        }
      }
    }
  }
}

// TODO: Developers, Entrepreneurs and Makers
const Fold = () => (
  <FoldSection>
    <Banner />
    <Particles {...particle} />
    <Intro>
      <Heading>
        <TypistLoop interval={3000}>
          <Typist>
            Turn Amazing Ideas into Magical Solutions&nbsp;
            <Break stop={768} />
            with Axi Platform
          </Typist>
          <Typist>
            Allahu Akbar Snackbar&nbsp;
            <Break stop={768} />
            Boom, Boom!
          </Typist>
        </TypistLoop>
      </Heading>
      <SubHeading>
        With Physical Web, Cloud Microservices, and Internet of Things,&nbsp;
        <Break stop={550} />
        Axi joins you to develop innovative products.
      </SubHeading>
      <More text='Try the Demo' color='#ffffff' link='/dashboard' />
    </Intro>
    <HeroImg src='https://fi.google.com/about/static/static/home/hero.svg' alt='' />
  </FoldSection>
)

export default Fold

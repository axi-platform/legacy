import React from 'react'
import styled from 'react-emotion'
import {lighten} from 'polished'

import {landingColor} from './Layout'
import {font} from '../../core/style'

const JoinSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 3em;
`

const JoinButton = styled.button`
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  border: 0;
  align-self: center;
  border-radius: 3px;
  background: linear-gradient(45deg, hsl(283, 46%, 41%), hsl(241, 100%, 82%));
  appearance: none;
  color: #efefef;
  cursor: pointer;
  font-family: ${font};
  height: 3em;
  letter-spacing: 0.15em;
  margin-left: 1em;
  outline: none;

  padding: 0.5em 1.4em;
  position: relative;
  font-size: 1.3em;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    background: linear-gradient(45deg, #3a3897, #a3a1ff);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    transform: translateY(-1px);
  }
`

const Join = () => (
  <JoinSection>
    <JoinButton>
      Sign Up
    </JoinButton>
  </JoinSection>
)

export default Join

import styled from 'emotion/react'
import {css} from 'emotion'

import {mediumScreen, smallScreen, extraSmallScreen, font} from '../../core/style'

export const landingColor = '#1B5A7A'
export const subColor = '#757575'
export const containerWidth = '980px'

export const Page = styled.div`
  font-family: ${font};
  font-weight: 300;
`

export const Row = styled.div`
  display: flex;
`

export const Col = styled.div`

`

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

export const MoreText = styled.span`
  align-self: center;
  margin-right: 0.6em;
  transition: all 1s cubic-bezier(0.03, 0.86, 0.57, 1);

  color: ${landingColor};
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  &:hover > span {
    margin-right: 1.3em;
  }
`

export const Why = styled.section`
  > ${Row} {
    margin-top: 1em;
  }
`

export const ReasonRoot = styled.div`
  padding: 5em 6em;

  > h2 {
    font-size: 1.8em;
    color: ${landingColor};
  }

  > p {
    margin-bottom: 1.5em;
    line-height: 1.6em;
  }

  position: relative;

  ${props => props.right && css`
    background: ${landingColor};
    text-align: right;

    > h2, > p, > ${MoreText} > span {
      color: white;
    }

    > svg {
      fill: white;
    }

    @media screen and (min-width: ${smallScreen}) {
      order: 1;
    }
  `}

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

export const Break = styled.br`
  @media screen and (max-width: ${smallScreen}) {
    display: none
  }
`

export const BreakMedium = styled.br`
  @media screen and (max-width: ${mediumScreen}) {
    display: none
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

// isodata: width 40% sWidth 30%
// phyweb: width 65% top 6em sWidth 40% sTop 1
// isomono: width 60% top 4em sWidth 45% sTop 0
export const DecoImage = styled.div`
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
export const IdeaSection = styled.section`
  padding-top: 5em;
  max-width: ${containerWidth};
  margin: 0 auto;
  text-align: center;
`

export const IdeaHeading = styled.h2`
  font-size: 1.6em;
  margin-bottom: 1em;
  color: ${landingColor};
  font-weight: 300;
`

export const JoinSection = styled.section`
  text-align: center;
  padding-top: 3em;
`

export const Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
`

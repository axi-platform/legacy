import React from 'react'
import styled from 'react-emotion'
import Link from 'next/link'

import {DecoImage, landingColor} from './Layout'
import {smallScreen} from '../../core/style'

export const containerWidth = '980px'

export const Row = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${smallScreen}px) {
    flex-direction: column;
  }
`

export const Col = styled.div`

`

const Heading = styled.h2`
  margin: 0;
  font-weight: 300;
  color: #555;
`

// ds => width: initial; margin-top: 1em;
export const IdeaSection = styled.section`
  max-width: ${containerWidth};
  margin: 0 auto;
  text-align: center;
  padding-top: 1.3em;
`

export const IdeaHeading = styled.h2`
  font-size: 1.2em;
  margin-bottom: 1em;
  color: ${landingColor};
  font-weight: 300;
`

const MaybeLink = props => props.link ? <Link {...props} /> : (
  <div>{props.children}</div>
)

const Idea = ({t, to = '#!', img = defaultImage}) => (
  <Row>
    <MaybeLink href={to}>
      <IdeaSection>
        <IdeaHeading>{t}</IdeaHeading>
        <DecoImage sWidth={16} src={img} />
      </IdeaSection>
    </MaybeLink>
  </Row>
)

// TODO: Interactive Idea Generetor
// Out of Ideas? Here are some Possibilities.
// Have a look at the Awesome Projects built with Axi

// <Heading>Project Showcase</Heading>
// <Row>
//   <Idea t='PrintAt' img='/static/pw_logo.svg' to='/printat' />
//   <Idea t='Co-working Space' img='/static/pw_logo.svg' to='/space' />
//   <Idea t='Smart City' img='/static/pw_logo.svg' to='/demo' />
//   <Idea t='Coffe Instante' img='/static/coffee1.svg' to='/coffe' />
// </Row>

const Ideas = () => (
  <IdeaSection>
    
  </IdeaSection>
)

export default Ideas

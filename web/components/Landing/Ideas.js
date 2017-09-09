import React from 'react'
import styled from 'react-emotion'
import Link from 'next/link'

import {Row, DecoImage, landingColor} from './Layout'

export const containerWidth = '980px'

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

const MaybeLink = props => props.link ? <Link {...props} /> : (
  <div>{props.children}</div>
)

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
      <Idea t='PrintAt' img='/static/pw_logo.svg' to='/printat' />
      <Idea t='Co-working Space' img='/static/pw_logo.svg' to='/space' />
      <Idea t='Smart City' img='/static/pw_logo.svg' to='/demo' />
      <Idea t='Coffe Instante' img='/static/coffee1.svg' to='/coffe' />
    </Row>
  </IdeaSection>
)

export default Ideas

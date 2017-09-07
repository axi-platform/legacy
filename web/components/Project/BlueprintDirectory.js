import React from 'react'
// import {connect} from 'react-redux'
import styled from 'react-emotion'

import {Grid, Row, ServiceCard, Add} from '../Directory'
import {font} from '../../core/style'

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.5em;
`

const BigSearch = styled.input`
  font-weight: 300;
  box-shadow: 0 1px 1.5px 1px rgba(0,0,0,.12);
  border: none;
  border-bottom: 2px solid hsl(155, 80%, 40%);
  border-radius: 29px;
  background: transparent;
  color: hsl(155, 80%, 40%);
  font-family: ${font};
  font-size: 1.5em;
  line-height: 1.3em;
  margin-top: 0.5em;
  min-width: 13em;
  outline: none;
  padding: 0.3em;
  text-align: center;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.1);
  }
`

const BlueprintDirectory = () => (
  <div>
    <Heading>
      <div>Welcome, Phoomparin! Here are some blueprints to get you started.</div>
      <BigSearch placeholder='Search for Blueprints here.' />
    </Heading>
    <Grid>
      <Row>
        <ServiceCard
          id='phoomparin:ifttt-portal'
          name='IFTTT Portal'
          desc='Directly access IFTTT services and applets from Axi.'
          icon='../static/archbot.png'
        />
      </Row>
      <Row>
        <Add />
      </Row>
    </Grid>
  </div>
)

export default BlueprintDirectory

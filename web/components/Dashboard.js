import React from 'react'
import styled from 'react-emotion'

import Toolbar from './Toolbar'
import Directory from './Directory'

import {font} from '../core/style'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5em;
  min-height: 100vh;

  font-family: ${font};
  font-weight: 300;
`

const Dashboard = () => (
  <div>
    <Toolbar title='Dashboard' />
    <Container>
      <Directory />
    </Container>
  </div>
)

export default Dashboard

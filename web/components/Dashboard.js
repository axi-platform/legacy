import React from 'react'
import styled from 'react-emotion'

import Directory from './Directory'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5em;
  min-height: 100vh;

  font-family: 'Helvetica Neue';
  font-weight: 300;
`

const Dashboard = () => (
  <Container>
    <Directory />
  </Container>
)

export default Dashboard

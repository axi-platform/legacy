import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import Directory from './Directory'
import CreateService from './CreateService'
import Modal from './Modal'

import {toggleOpen} from '../ducks/app'

const Root = styled.div`

`

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5em;
  min-height: 100vh;

  font-family: 'Helvetica Neue';
  font-weight: 300;
`

const Dashboard = ({open, services, toggleOpen}) => (
  <Root>
    <Container>
      <Directory data={services} onAdd={toggleOpen} />
      <Modal open={open} onClose={toggleOpen}>
        <CreateService />
      </Modal>
    </Container>
  </Root>
)

const mapStateToProps = state => ({
  open: state.app.open,
  services: state.app.services
})

export default connect(mapStateToProps, {toggleOpen})(Dashboard)

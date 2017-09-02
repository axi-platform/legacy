import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import Directory from './Services'
import Modal from './Modal'

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

const services = [{
  id: 'phoomparin:printat',
  name: 'PrintAt'
}, {
  id: 'phoomparin:eventc',
  name: 'EventClub'
}, {
  id: 'phoomparin:tales',
  name: 'Tales'
}, {
  id: 'phoomparin:hotelsuite',
  name: 'HotelSuite'
}]

const Dashboard = ({open, toggleOpen}) => (
  <Root>
    <Container>
      <Directory data={services} onAdd={toggleOpen} />
      <Modal open={open}>
        200 OK
        <button onClick={toggleOpen}>Toggle Open</button>
      </Modal>
    </Container>
  </Root>
)

const mapStateToProps = state => ({
  open: state.app.open
})

export default connect(mapStateToProps, {toggleOpen})(Dashboard)

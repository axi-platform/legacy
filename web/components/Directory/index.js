import React from 'react'
import Ink from 'react-ink'
import {connect} from 'react-redux'
import Link from 'next/link'

import {Grid, Row, Card, Content, Meta, Adder, AdderRing, Small} from './Card'
import Create from './Create'

import Modal from '../Modal'
import Icon from '../Icon'

import color from '../../core/color'
import {toggleOpen} from '../../ducks/app'

const actColor = '#e74c3c'

const Directory = ({open, services, toggleOpen}) => (
  <Grid>
    {services.map(item => (
      <Row key={item.id}>
        <Link href={`/service?id=${item.id}`} passHref replace>
          <Card color={item.color || color(item.id)}>
            <Content>
              <Ink />
              {item.name}
              {item.desc && <Small>{item.desc}</Small>}
              {item.icon && <img src={item.icon} alt='' />}
            </Content>
            <Meta>{item.id}</Meta>
          </Card>
        </Link>
      </Row>
    ))}
    <Row>
      <Adder color={actColor} onClick={toggleOpen}>
        <Icon i='add' />
        <AdderRing color={actColor} />
        <Ink background opacity={0.15} />
      </Adder>
    </Row>
    <Modal open={open} onClose={toggleOpen}>
      <Create />
    </Modal>
  </Grid>
)

const mapStateToProps = state => ({
  open: state.app.open,
  services: state.app.services
})

export default connect(mapStateToProps, {toggleOpen})(Directory)

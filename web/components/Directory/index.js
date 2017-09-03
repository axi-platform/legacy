import React from 'react'
import Ink from 'react-ink'
import {connect} from 'react-redux'
import Link from 'next/link'

import {Grid, Row, Card, Content, Meta, Adder, AdderRing, Small} from './Card'
import Create from './Create'

import Modal from '../Modal'
import Icon from '../Icon'

import toColor from '../../core/color'
import {toggleOpen} from '../../ducks/app'

const actColor = '#e74c3c'

export const ServiceCard = ({id, href, color, name, desc, icon}) => (
  <Link href={href} passHref replace prefetch>
    <Card color={color || toColor(id)}>
      <Content>
        <Ink />
        {name}
        {desc && <Small>{desc}</Small>}
        {icon && <img src={icon} alt='' />}
      </Content>
      <Meta>{id}</Meta>
    </Card>
  </Link>
)

export const Directory = ({open, services, toggleOpen}) => (
  <Grid>
    {services.map(item => (
      <Row key={item.id}>
        <ServiceCard href={`/service?id=${item.id}`} {...item} />
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

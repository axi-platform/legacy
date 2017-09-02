import React from 'react'
import Ink from 'react-ink'

import {Grid, Row, Card, Content, Meta, Adder, AdderRing} from './Card'
import Icon from '../Icon'
import color from '../../core/color'

const actColor = '#e74c3c'

const Directory = ({data, onAdd}) => (
  <Grid>
    {data.map(item => (
      <Row key={item.id}>
        <Card color={item.color || color(item.id)}>
          <Content>
            <Ink />
            {item.name}
            {item.icon && <img src={item.icon} alt='' />}
          </Content>
          <Meta>{item.id}</Meta>
        </Card>
      </Row>
    ))}
    <Row>
      <Adder color={actColor} onClick={onAdd}>
        <Icon i='add' />
        <AdderRing color={actColor} />
        <Ink background opacity={0.15} />
      </Adder>
    </Row>
  </Grid>
)

export default Directory

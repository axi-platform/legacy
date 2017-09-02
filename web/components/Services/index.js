import React from 'react'

import {Grid, Row, Card, Content, Meta, Adder, AdderRing} from './Card'
import color from '../../core/color'

const Services = ({data}) => (
  <Grid>
    {data.map(item => (
      <Row key={item.id}>
        <Card color={color(item.id)}>
          <Content>
            {item.name}
          </Content>
          <Meta>{item.id}</Meta>
        </Card>
      </Row>
    ))}
    <Row>
      <Adder color='#e67e22'>
        <svg viewBox='0 0 448 512'>
          <path d='M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z' />
        </svg>
        <AdderRing color='#e67e22' />
      </Adder>
    </Row>
  </Grid>
)

export default Services

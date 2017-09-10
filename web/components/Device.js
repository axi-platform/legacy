import React from 'react'
import styled from 'react-emotion'

import Icon from './Icon'

const Row = styled.div`

`

const Col = styled.div`

`

const Card = styled.div`

`

const Title = styled.h2`

`

// export const StatHeading = ({text, sub, stat, ctrl}) => (
//   <div>
//     <h2 className={s.heading}>{text}</h2>
//     <h3 className={s.sub}>
//       {sub}{(sub && stat) && <span>&nbsp;</span>}
//       <span className={s.status}>
//         <StatusIcon /> {stat}
//       </span>
//     </h3>
//     <h4 className={s.sub}>
//       {ctrl}
//     </h4>
//   </div>
// )

// Devices
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(({coords}) => {
//     this.setState({lat: coords.latitude, lng: coords.longitude})
//   }, err => console.error("getCurrentPosition ERROR", err))
// }

export const Device = ({id, name, presence, queue = 0, beacon = {}}) => (
  <Card>
    <Title status={presence}>
      {name} <Icon i={presence} />
    </Title>
    {beacon.url && (
      <h4 className={s.sub}>
        {beacon.url}
      </h4>
    )}
    <h4 className={s.sub}>
      {queue} Queues
    </h4>
    <h5 className={s.sub}>
      HWID: {_id}
    </h5>
    <h6 className={s.sub}>
      {beacon.uid && <span>BUID: {beacon.uid}</span>}
    </h6>
  </Card>
)

export const Devices = ({data}) => (
  <Row>
    {data && data.map(device => (
      <Col key={device.id}>
        <Device {...device} />
      </Col>
    ))}
  </Row>
)

import React from 'react'
import styled from 'react-emotion'

const Card = styled.div``

const Topic = styled.div``
const Heading = styled.div``
const SubHeading = styled.div``

const Input = styled.input``
const Button = styled.button``

// TODO: Make it a stepped device wizard.
// Beacon: [Place, Nearby Notifications, Attachments]
const RegisterDevice = () => (
  <Card>
    <Topic>Device Registry: Device Registration Wizard</Topic>
    <Heading>Register a Device</Heading>
    <SubHeading>Please fill in the informations for this device.</SubHeading>

    <Input placeholder='Device Name' />
    <Input placeholder='Description' />
    <Input placeholder='Position' />
    <Input placeholder='Stability' />

    <Input placeholder='Device Blueprint' />
    <Input placeholder='Device Properties' />

    <Input placeholder='Blueprint Data' />
    <Input placeholder='I/O Specs' />
    <Input placeholder='Metadata [key:value]' />

    <Button>Register</Button>
  </Card>
)

export default RegisterDevice

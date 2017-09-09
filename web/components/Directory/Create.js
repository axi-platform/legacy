import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Ink from 'react-ink'

import {Card, Content, Meta} from './Card'

import {setName, setId, setDesc, addService} from '../../ducks/app'
import {font} from '../../core/style'
import color from '../../core/color'

const Input = styled.input`
  background: transparent;
  overflow: hidden;
  border: none;
  font-size: ${props => props.size || 'inherit'};
  margin-top: ${props => props.sub && '0.5em'};
  font-family: inherit;
  font-weight: inherit;
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(245, 245, 245, 0.3);
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 18em;

  > div > div {
    padding: 0.8em;
    font-size: 1.2em;
  }
`

const Confirm = styled.button`
  position: relative;
  cursor: pointer;
  margin-top: 1em;
  border: 1px solid ${props => props.color || '#2c3e50'};
  color: ${props => props.color || '#2c3e50'};
  background: transparent;
  outline: none;
  width: 6.5em;
  padding: 0.2em;
  align-self: flex-end;
  font-family: ${font};
  font-size: 1.05em;
  font-weight: 300;
  border-radius: 5px;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.05);
  }
`

const Label = styled.div`
  padding: 1px;
  padding-right: 0;
  font-size: 0.8em;
`

const mapStateToProps = state => ({
  id: state.app.id,
  desc: state.app.desc,
  icon: state.app.icon,
  project: state.app.project
})

const CreateCard = ({id, project, desc, icon, setName, setId, setDesc, addService}) => (
  <CardWrapper>
    <Card color={color(`phoomparin:${id}`)}>
      <Content>
        <Input placeholder='Project Name' value={project} onChange={setName} />
        <Input size='0.6em' placeholder='Description' value={desc} onChange={setDesc} sub />
        <img src={icon} alt='' />
      </Content>
      <Meta>
        <Label>phoomparin:</Label>
        <Input size='0.8em' placeholder='project' value={id} onChange={setId} />
      </Meta>
    </Card>
    <Confirm onClick={addService} color={color(`phoomparin:${id}`)}>
      Create
      <Ink />
    </Confirm>
  </CardWrapper>
)

export default connect(mapStateToProps, {addService, setName, setId, setDesc})(CreateCard)

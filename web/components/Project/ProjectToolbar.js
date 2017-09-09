import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import Toolbar, {IconLink, Title} from '../Toolbar'
import Tabs from '../Tabs'

import colorize from '../../core/color'
import {tabTo} from '../../ducks/app'

const Left = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 1em;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1em;
  }
`

const Separator = styled.div`
  height: 1.78em;
  width: 1px;
  background: #f5f5f5;
  margin-right: ${props => props.margin || 0.5}em;
  margin-left: ${props => props.margin || 0.5}em;
  opacity: 0.75;
`

const tabs = [
  'Overview',
  'Services',
  'Devices'
]

const ProjectToolbar = ({name, color, tab, tabTo}) => (
  <Toolbar
    color={color || colorize(name)}
    left={
      <Left>
        <IconLink href='/dashboard' icon='dashboard' />
        <Separator />
        <Title>{name}</Title>
      </Left>
    }
    right={
      <Right>
        <Tabs tabs={tabs} tab={tab} go={tabTo} />
        <Separator />
        <IconLink href='/dashboard' icon='notifications' />
        <IconLink href='/dashboard' icon='settings' />
      </Right>
    }
  />
)

function selectColor(svc, name) {
  const service = svc.filter(x => x.id === name)[0]

  if (service) {
    return service.color
  }

  return null
}

const mapStateToProps = (state, props) => ({
  tab: state.app.tab,
  color: selectColor(state.app.services, props.name)
})

export default connect(mapStateToProps, {tabTo})(ProjectToolbar)

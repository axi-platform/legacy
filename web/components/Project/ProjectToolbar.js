import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import Toolbar, {IconLink} from '../Toolbar'
import Tabs from '../Tabs'

import colorize from '../../core/color'
import {tabTo} from '../../ducks/app'

const tabs = [
  'Overview',
  'Services',
  'Devices'
]

const ProjectToolbar = ({name, color, tab, tabTo}) => (
  <Toolbar
    color={color || colorize(name)}
    left={
      <IconLink href='/dashboard' icon='dashboard' />
    }
    right={<Tabs tabs={tabs} tab={tab} go={tabTo} />}
  />
)

const mapStateToProps = state => ({
  tab: state.app.tab
})

export default connect(mapStateToProps, {tabTo})(ProjectToolbar)

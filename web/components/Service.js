import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {darken} from 'polished'
import Ink from 'react-ink'

import color from '../core/color'
import {tabTo} from '../ducks/app'

const Toolbar = styled.div`
  color: white;
  font-family: 'Helvetica Neue';
  font-weight: 300;
  padding: 0.75em 1.5em;
  background: ${props => color(props.id)};
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  font-family: 'Helvetica Neue';
  font-weight: 300;
  font-size: 1.1em;

  padding: 0.75em 1.5em;
  background: transparent;
`

const TabIndicator = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${props => 100 / props.total}%;
  border-bottom: 2px solid ${props => props.color || '#2196F3'};
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  transform: translateX(${props => props.index * 100}%);
`

const Service = ({qs: {id}, tab, tabTo}) => (
  <div>
    <Toolbar id={id}>
      {id}
    </Toolbar>
    <Tabs>
      {['Overview', 'Services', 'Devices'].map((item, index) => (
        <Tab key={item} onClick={() => tabTo(index)}>
          {item}
          <Ink />
        </Tab>
      ))}
      <TabIndicator color={color(id)} total={3} index={tab} />
    </Tabs>
  </div>
)

const mapStateToProps = state => ({
  tab: state.app.tab,
})

export default connect(mapStateToProps, {tabTo})(Service)

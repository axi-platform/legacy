import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Link from 'next/link'

import Icon from './Icon'
import Tabs from './Tabs'

import color from '../core/color'
import {tabTo} from '../ducks/app'

const tabs = ['Overview', 'Services', 'Devices']

// const bg = (name, at) => color(at ? name + tabs[at] : name)

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.02rem;

  color: white;
  font-family: 'Helvetica Neue';
  font-weight: 300;
  background: ${props => color(props.name)};
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;
`

const Name = styled.div`
  display: flex;
  align-items: center;

  padding-left: 0.6em;
  font-size: 1.15em;
`

const Left = styled.div`
  display: flex;
  margin-left: 1.4em;
`

const Section = styled.div`
  display: flex;
`

const IconButton = styled.button`
  display: flex;
  appearance: none;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.1);
  }

  > svg {
    width: 2.7em;
    height: 2.7em;
    fill: white;
  }
`

const IconLink = styled.a`
  display: flex;
  cursor: pointer;
  background: transparent;
  text-decoration: none;
  transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.1);
  }

  > svg {
    width: 1.9em;
    height: 1.9em;
    fill: white;
  }
`

const Toolbar = ({name, tab, tabTo}) => (
  <div>
    <Nav name={name} at={tab}>
      <Left>
        <Link href='/dashboard' passHref prefetch>
          <IconLink>
            <Icon i='left' />
          </IconLink>
        </Link>
        <Name>{name}</Name>
      </Left>
      <Section>
        <Tabs tabs={tabs} tab={tab} go={tabTo} />
      </Section>
    </Nav>
  </div>
)

const mapStateToProps = state => ({
  tab: state.app.tab
})

export default connect(mapStateToProps, {tabTo})(Toolbar)

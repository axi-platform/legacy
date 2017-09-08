import React, {Component} from 'react'
import styled from 'emotion/react'
import {lighten} from 'polished'
import Link from 'next/link'

import {largeScreen, extraSmallScreen} from '../../core/style'

const landingColor = '#1B5A7A' // #1B5A7A #009688 #0f9d58 $teal
const subColor = '#757575'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  position: fixed;
  width: 100%;
  z-index: 10;

  padding: 1.5em;
  background: white;
  transition: all 0.25s ease;
  border-bottom: 1px solid ${props => props.scrolled ? '#e1e1e1' : '#ffffff'};
`

const Left = styled.div`
  display: flex;
  justify-content: flex-start;

  flex: 3;
`

const Center = styled.div`
  flex: 3;

  @media screen and (max-width: ${largeScreen}) {
    display: none;
  }
`

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  margin-right: 3.5em;

  @media screen and (max-width: ${extraSmallScreen}) {
    flex: 4;
  }
`

const Menu = styled.a`
  flex: 1;
  align-self: center;

  font-size: 15px;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;

  color: ${props => props.color || subColor};

  ${Left} > & {
    @media screen and (max-width: ${extraSmallScreen}) {
      display: none;
    }
  }

  &:hover {
    color: ${landingColor};
    font-weight: 400;
  }
`

const Image = styled.img`
  flex: 1;
  align-self: center;

  width: 2em;
  height: 2em;
`

const TryButton = styled.button`
  margin-left: 1em;
  text-transform: uppercase;
  border-radius: 3px;
  background: ${landingColor};
  color: $white;
  padding: 0.5em;
  box-shadow: $zLite;

  &:hover {
    background: ${lighten('10%', landingColor)};
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  }
`

// Possibilities Examples Ideas
export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {scrolled: false}
  }

  componentDidMount = () => window.addEventListener('scroll', this.scroll)

  componentWillUnmount = () => window.removeEventListener('scroll', this.scroll)

  scroll = () => {
    if (window.scrollY > 150)
      this.setState({scrolled: true})
    else
      this.setState({scrolled: false})
  }

  render = () => (
    <Nav scrolled={this.state.scrolled}>
      <Left>
        <Image src='/images/axi1.svg' alt='Logo' />
        <Menu href='#!'>Overview</Menu>
        <Menu href='#!'>Examples</Menu>
        <Menu href='#!'>FAQ</Menu>
        <Menu href='#!'>Contact</Menu>
      </Left>
      <Center />
      <Right>
        <Menu href='#!'>Sign In</Menu>
        <Link to='/dashboard'>
          <TryButton light>
            Try Now
          </TryButton>
        </Link>
      </Right>
    </Nav>
  )
}

import React, {Component} from 'react'
import styled from 'emotion/react'
import Link from 'next/link'

const Button = styled.button``

// $landing: #1B5A7A; // #1B5A7A #009688 #0f9d58 $teal
// $sub: #757575;
//
// nav {
//   display: flex;
//   justify-content: space-between;
//
//   position: fixed;
//   width: 100%;
//   z-index: 10;
//
//   padding: 1.5em;
//   background: white;
//   transition: all 0.25s ease;
//   border-bottom: 1px solid white;
//
//   > * > a {
//     flex: 1;
//     align-self: center;
//
//     font-size: 15px;
//     text-decoration: none;
//     text-transform: uppercase;
//     text-align: center;
//   }
//
//   > .left {
//     display: flex;
//     justify-content: flex-start;
//
//     flex: 3;
//   }
//
//   > .center {
//     flex: 3;
//   }
//
//   > .right {
//     display: flex;
//     justify-content: flex-end;
//     flex: 1;
//
//     margin-right: 3.5em;
//   }
//
//   > .left > h1 {
//     flex: 1;
//     align-self: center;
//
//     margin-right: 1em;
//     font-size: 1.3em;
//   }
//
//   > .left > img {
//     flex: 1;
//     align-self: center;
//
//     width: 2em;
//     height: 2em;
//   }
//
//   > .left > a {
//     color: $sub;
//     // font-weight: 500;
//   }
//
//   > .right > a {
//     color: $landing;
//   }
//
//   > .right > .try {
//     margin-left: 1em;
//
//     > button {
//       text-transform: uppercase;
//       border-radius: 3px;
//       background: $landing;
//       color: $white;
//       padding: 0.5em;
//       box-shadow: $zLite;
//     }
//   }
//
// }
//
// nav.scrolled {
//   border-bottom: 1px solid #e1e1e1;
//   // box-shadow: $zLite;
// }
//
// nav > * > a:hover {
//   color: $landing;
//   font-weight: 400;
// }
//
// nav > .right > .try:hover > button {
//   background: lighten($landing, 10%);
//   box-shadow: $z1;
// }
//
// @media screen and (max-width: $screen-lg-min) {
//   nav > .center {
//     display: none;
//   }
// }
//
// @media screen and (max-width: $screen-xs-min) {
//   .left > a {
//     display: none;
//   }
//   .right {
//     flex: 4 !important;
//   }
// }

// Possibilities Examples Ideas
export default class Nav extends Component {
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
    <nav className={c(s.nav, this.state.scrolled && s.scrolled)}>
      <div className={s.left}>
        <img src='/images/axi1.svg' alt='Logo' />
        <a href='#!'>Overview</a>
        <a href='#!'>Examples</a>
        <a href='#!'>FAQ</a>
        <a href='#!'>Contact</a>
      </div>
      <div className={s.center} />
      <div className={s.right}>
        <a href='#!'>Sign In</a>
        <Link to='/dashboard' className={s.try}>
          <Button light>
            Try Now
          </Button>
        </Link>
      </div>
    </nav>
  )
}

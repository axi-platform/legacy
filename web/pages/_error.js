import React from 'react'
import Link from 'next/link'
import styled from 'react-emotion'

import App from '../components/App'
import {font} from '../core/style'

const Backdrop = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

  font-family: ${font};
  font-weight: 300;
`

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-top: 2px solid #3A3897;

  min-width: 15em;
  background: white;
  padding: 1.5em 2.2em;
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.03);
  }
`

const Heading = styled.h2`
  margin: 0 auto;

  color: #666;
  font-weight: 300;
  font-size: 1.9em;
`

const Text = styled.p`
  color: #666;
  font-weight: 300;
  line-height: 1.8em;
  text-align: center;
  font-size: 1.2em;
`

const Anchor = styled.a`
  position: absolute;
  bottom: -1.2em;

  color: #fff;
  background: linear-gradient(45deg, #3a3897, #a3a1ff);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all .15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
    background: linear-gradient(45deg, rgb(50, 48, 138), #8f8def);
  }
`

const Error = ({statusCode}) => (
  <Backdrop>
    <Paper>
      <Heading>Whoops, this page is gone!</Heading>
      <Text>
        We could not find the page you requested for. <br />
        Would you mind going back?
      </Text>
      <Link href='/'>
        <Anchor>Back to Home</Anchor>
      </Link>
    </Paper>
  </Backdrop>
)

Error.getInitialProps = ({res, jsonPageRes}) => {
  const statusCode = res ? res.statusCode : (jsonPageRes && jsonPageRes.status)

  return {statusCode}
}

export default App(Error)

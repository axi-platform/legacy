import React from 'react'
import styled from 'react-emotion'
import Link from 'next/link'

import {font} from '../core/style'

const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Text = styled.div`
  font-family: ${font};
  font-weight: 300;
  font-size: 2em;
  color: #333;
`

const AnchorWrapper = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 1em;

  text-decoration: none;
  font-size: 1.2em;
  color: #8e44ad;
`

const Anchor = ({href, children}) => (
  <Link prefetch href={href} passHref>
    <AnchorWrapper>{children}</AnchorWrapper>
  </Link>
)

export default () => (
  <View>
    <Text>
      Axi Platform is coming to town!
      <Anchor href='/dashboard'>Explore.</Anchor>
    </Text>
  </View>
)

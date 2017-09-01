import React from 'react'
import {hydrate} from 'emotion'
import styled from 'react-emotion'

const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Text = styled.div`
  font-family: 'Helvetica Neue';
  font-weight: 300;
  font-size: 2.7em;
`

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

export default () => (
  <View>
    <Text>Welcome to Next.js!</Text>
  </View>
)

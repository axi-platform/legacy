import React from 'react'
import styled from 'react-emotion'

import {makeTab} from '../Tabs'
import ProjectToolbar from './ProjectToolbar'

import {font} from '../../core/style'

const Section = styled.div`
  padding: 1.8em 2.5em;
  max-width: 900px;
  min-height: 95vh;
  margin: 0 auto;
  color: #777;

  font-family: ${font};
  font-weight: 300;
  line-height: 1.4em;
  font-size: 1em;
`

const Page = makeTab(state => ({tab: state.app.tab || 0}))

const Tab = ({is, children}) => (
  <Page is={is}>
    <Section>
      {children}
    </Section>
  </Page>
)

const Project = ({qs: {id}}) => (
  <div>
    <ProjectToolbar name={id} />
    <Tab is={0}>
      <h1>Hello, World!</h1>
    </Tab>
  </div>
)

export default Project

import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

import ProjectToolbar from './ProjectToolbar'

import {font} from '../../core/style'

const Section = styled.div`
  padding: 1.8em;
  max-width: 1000px;
  margin: 0 auto;
  color: #777;

  font-family: ${font};
  font-weight: 300;
  line-height: 1.4em;
  font-size: 1em;
`

const mapStateToTab = state => ({tab: state.app.tab || 0})
const Tab = connect(mapStateToTab)(({is, tab, children}) => tab === is && children)

const Project = ({qs: {id}}) => (
  <div>
    <ProjectToolbar name={id} color='linear-gradient(45deg, #d4145a, #fbb03b)' />
    <Tab is={0}>
      <Section>
        <h1>Hello, World!</h1>
      </Section>
    </Tab>
  </div>
)

export default Project

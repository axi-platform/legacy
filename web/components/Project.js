import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Ink from 'react-ink'

import Toolbar from './Toolbar'

import color from '../core/color'
// import {tabTo} from '../ducks/app'

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;

  color: #777;
  text-align: center;
  font-family: 'Helvetica Neue';
  font-weight: 300;
  line-height: 1.4em;
  font-size: 2.6em;
`

const Project = ({qs: {id}}) => (
  <div>
    <Toolbar name={id} />
    <Loader>
      Welcome, Phoomparin! <br />
      Here are some <b>Blueprints</b> to get you started.
    </Loader>
  </div>
)

export default Project

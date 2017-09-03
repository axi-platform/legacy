import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import Ink from 'react-ink'

import Toolbar from './Toolbar'

import color from '../core/color'
// import {tabTo} from '../ducks/app'

const Service = ({qs: {id}}) => (
  <div>
    <Toolbar name={id} />
  </div>
)

export default Service

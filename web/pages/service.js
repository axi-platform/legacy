import React from 'react'

import App from '../components/App'
import Project from '../components/Project'

const ServiceRoute = ({url: {query}}) => (
  <Project qs={query} />
)

export default App(ServiceRoute)

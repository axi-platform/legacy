import React from 'react'

import App from '../components/App'
import Service from '../components/Service'

const ServiceRoute = ({url: {query}}) => (
  <Service qs={query} />
)

export default App(ServiceRoute)

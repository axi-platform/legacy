import React from 'react'

import App from '../components/App'
import Service from '../components/Service'

const ServiceRoute = ({url: {query}}) => (
  <div>
    <Service qs={query} />
  </div>
)

export default App(ServiceRoute)

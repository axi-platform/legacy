import React from 'react'
import {Provider} from 'react-redux'
import {hydrate, injectGlobal} from 'emotion'
import {ThemeProvider} from 'theming'

import store from '../ducks'

const theme = {}

injectGlobal`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const App = Component => props => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  </Provider>
)

export default App

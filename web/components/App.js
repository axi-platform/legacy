import React from 'react'
import Router from 'next/router'
import Progress from 'nprogress'
import {Provider} from 'react-redux'
import {hydrate, injectGlobal} from 'emotion'
import {ThemeProvider} from 'theming'
import {lifecycle} from 'recompose'

import store from '../ducks'
import {font} from '../core/style'

const theme = {}

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)

  Router.onRouteChangeStart = () => Progress.start()
  Router.onRouteChangeComplete = () => Progress.done()
  Router.onRouteChangeError = () => Progress.done()
}

const enhance = lifecycle({
  componentWillMount() {
    /* eslint no-unused-expressions: 0 */

    injectGlobal`
      body {
        margin: 0;
        font-family: ${font};
        font-weight: 300;
      }

      * {
        box-sizing: border-box;
      }
    `
  }
})

const App = Component => enhance(props => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  </Provider>
))

export default App

import React from "react"
import {renderToString, renderToStaticMarkup} from "react-dom/server"
import {ServerRouter, createServerRenderContext} from "react-router"

import Routes from "../routes"
import initialStore from "../core/initialStore"

import Html from "../components/Html"
import App from "../components/App"

import assets from "./assets"

/* eslint import/no-unresolved: 0 import/extensions: 0 */

export default async function serverRender(req, res, next) {
  try {
    const store = await initialStore({
      cookie: req.headers.cookie,
      route: req.path,
      query: req.query,
      userAgent: req.headers["user-agent"],
      app: req.app,
      locale: req.locale
    })

    const renderContext = createServerRenderContext()

    const css = []

    const data = {
      title: "",
      description: "",
      style: "",
      script: assets.main.js,
      vendors: assets.vendors.js,
      children: ""
    }

    const context = {
      store,
      insertCss: (...styles) => {
        styles.forEach(style => css.push(style._getCss()))
      },
      setTitle: value => (data.title = value),
      setMeta: (key, value) => (data[key] = value),
    }

    data.children = renderToString(
      <App context={context}>
        <ServerRouter location={req.path} context={renderContext}>
          <Routes />
        </ServerRouter>
      </App>
    )

    const result = renderContext.getResult()

    data.style = css.join("")
    data.state = store.getState()

    let statusCode = 200
    let statusData = null

    if (result.redirect) {
      statusCode = 301
      statusData = {Location: result.redirect.pathname}
    } else if (result.missed) {
      statusCode = 404
      data.children = renderToString(
        <App context={context}>
          <ServerRouter location={req.path} context={renderContext}>
            <Routes />
          </ServerRouter>
        </App>
      )
    }
    res.status(statusCode, statusData)
    res.send(renderToStaticMarkup(<Html {...data} />))
    res.end()
  } catch (err) {
    next(err)
  }
}

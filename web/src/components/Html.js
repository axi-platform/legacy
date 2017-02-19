import React, {PropTypes} from "react"

import {SEGMENT} from "../constants"
import {IS_PROD} from "../constants/util"

const APP_NAME = "Axi Platform"
const LANG = "en-US"
const TITLE = "Axi | Turn Ideas into Physical Web Solutions"
const DESCRIPTION = `
  Axi Platform helps you develop practical solutions with the Physical Web,
  Cloud Services and Internet of Things.
`

const KEYWORDS = "Physical Web, Platform, Axi, IoT, Internet of Things"
const AUTHOR = "Phoomparin Mano and Krerkthad"
const COPYRIGHT = "All rights reserved by Axi Platform."
const URL = "https://axiplatform.com"

const IMAGE = ""
const THEME_COLOR = "#1b1f24"

// Kanit:300,400|
const GOOGLE_FONTS = "css?family=Roboto:300,400"

const Html = ({
  style, script, vendors, children, state
}) => (
  <html className="no-js" lang={LANG}>
    <head>
      <title>{TITLE}</title>

      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="author" content={AUTHOR} />
      <meta name="copyright" content={COPYRIGHT} />
      <meta name="application-name" content={APP_NAME} />

      <link rel="canonical" href="https://printat.co" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/images/touch/favicon.ico" />
      <link rel="shortcut icon" href="/images/touch/favicon-96x96.png" />
      <link rel="apple-touch-icon" href="/images/touch/apple-touch-icon.png" />

      <meta name="theme-color" content={THEME_COLOR} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="PrintAt" />

      <meta property="og:title" content={TITLE} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:url" content={URL} />
      <meta property="og:description" content={DESCRIPTION} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE} />

      <link rel="stylesheet" href="/css/grid.css" />
      <style id="css" dangerouslySetInnerHTML={{__html: style}} />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html: children}} />
      <link rel="stylesheet" href="/css/waves.min.css" />
      {IS_PROD && <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />}
      {vendors && <script id="vendors" src={vendors} />}
      {script && (
        <script id="source" src={script} data-initial-state={JSON.stringify(state)} />
      )}
      <script src="/lib/waves.min.js" />
      <link href={`https://fonts.googleapis.com/${GOOGLE_FONTS}`} rel="stylesheet" />
      {(SEGMENT && IS_PROD) && <script dangerouslySetInnerHTML={{__html: SEGMENT}} />}
    </body>
  </html>
)

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired
}

export default Html

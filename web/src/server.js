import feathers from "feathers"
import hooks from "feathers-hooks"
import sync from "feathers-sync"
import errorHandler from "feathers-errors/handler"

import {Logger, transports} from "winston"
import cors from "cors"
import helmet from "helmet"
import locale from "express-locale"
import path from "path"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import render from "./render"
import {DEFAULT_UA} from "./constants"

const PORT = 8000

const app = feathers()

global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || DEFAULT_UA

app.logger = new Logger({
  transports: [
    new transports.Console({
      timestamp: true,
      colorize: true,
      level: "debug"
    })
  ]
})

app.logger.log("info", process.env.NODE_ENV)

app.use(feathers.static(path.join(__dirname, "public")))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(locale({
  priority: ["cookie", "query", "hostname", "map", "accept-language", "default"],
  default: "en_US"
}))
app.use(cookieParser())
app.configure(hooks())

app.use(render)
// app.use(errorHandler())

app.listen(PORT, () => {
  /* eslint no-console: 0 */
  console.log(`The server is running at http://localhost:${PORT}/`)
})

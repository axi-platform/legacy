import feathers from "feathers"

import middleware from "./middleware"
import services from "./services"

import {PORT} from "./config"
import {DEFAULT_UA} from "./constants"

const app = feathers()

require("pmx").init({
  http: true
})

app.configure(middleware)
app.configure(services)

app.logger.log("info", process.env.NODE_ENV)

app.listen(3000)

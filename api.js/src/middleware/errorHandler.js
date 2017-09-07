import PrettyError from "pretty-error"

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage("feathers")

export default function errorHandler(err, req, res, next) {
  res.send(pe.render(err))
  res.end()
}

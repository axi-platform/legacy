import fsBlob from "fs-blob-store"
import path from "path"
import multer from "multer"
import dauria from "dauria"
import blobService from "feathers-blob"

import {isRole} from "../core/hooks"

const m = multer()
const blobStorage = fsBlob(path.join(__dirname, "/public/uploads"))

export default function upload() {
  /* eslint no-param-reassign: 0 */
  this.use("upload",
    m.single("uri"),
    (req, res, next) => {
      req.feathers.file = req.file
      next()
    },
    blobService({Model: blobStorage})
  )

  this.service("upload").before({
    create: [
      // isRole("guest"),
      hook => {
        if (!hook.data.uri && hook.params.file) {
          const file = hook.params.file
          hook.data = {uri: dauria.getBase64DataURI(file.buffer, file.mimetype)}
          this.app.logger.log("debug", "File Uploaded via Params")
        }
        if (!hook.data.uri && hook.data.file) {
          const file = hook.data.file
          hook.data = {uri: dauria.getBase64DataURI(file.buffer, file.mimetype)}
          this.app.logger.log("debug", "File Uploaded via Data")
        }
      }
    ]
  })
}

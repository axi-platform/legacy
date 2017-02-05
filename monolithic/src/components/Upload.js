import React from "react"
import Dropzone from "react-dropzone"

import app from "../client/api"

import {UPLOAD_PATH} from "../constants"

/**
  @func onDrop
*/
const onDrop = (files, props) => {
  files.forEach(file => {
    const reader = new FileReader()

    if (props.drop)
      props.drop(file)

    reader.onload = () => {
      app.service("upload")
        .create({uri: reader.result})
        .then(res => {
          if (props.result)
            props.result(`${UPLOAD_PATH}${res.id}`, res, file)
          console.info("UPLOAD_SUCCESS", {res, file})
        })
        .catch(err => {
          if (props.error)
            props.error(err, file)
          console.error("ONLOAD_ERR", {err, file})
        })
    }

    reader.onprogress = ({lengthComputable, total, loaded, ...opts}) => {
      if (lengthComputable) {
        if (props.progress)
          props.progress(total, loaded, file)
        console.info("ON_PROGRESS", {total, loaded, opts})
      }
    }

    reader.readAsDataURL(file)
  })
}

export default props => (
  <div className={props.className}>
    <Dropzone
      onDrop={files => onDrop(files, props)}
      style={props.style || {position: "static"}}
      {...props}
      result
    >
      {props.children}
    </Dropzone>
  </div>
)

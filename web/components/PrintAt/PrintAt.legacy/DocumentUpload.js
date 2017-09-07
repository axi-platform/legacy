import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../Grid"
import Paper from "../../Paper"
import Button from "../../Button"

import {services} from "../../../client/api"
import {humanFileSize} from "../../../core/helper"
import {setUi, notify} from "../../../ducks/app"
import {addFile, selectFile, removeFile, clearFiles} from "../../../ducks/files"

import Files from "./Files"
import Proofing from "./Proofing"

import s from "./Document.scss"

/*
  uri: file.uri
  webkitRelativePath: local.webkitRelativePath,
  isClosed: local.isClosed,
  localSize: local.size,
  lastModifiedEpoch: local.lastModified
*/

const DocumentUpload = ({station, proceed, current, files, ...opts}) => (
  <div>
    <Grid style={{paddingTop: "5.5em"}} c>
      <Grid className={s.bottom} r>
        <Grid xs={12} sm={6}>
          <Paper style={{marginBottom: "1.5em"}} title="Print Confirmation">
            <h2 className={s.heading}>
              Printing at
              <span className={s.text}>
                &nbsp;{station && station.name}
              </span>
            </h2>
            <Button onClick={proceed} disabled={files.length <= 0} base light>
              {files.length > 0 ? "Proceed" : "File must be uploaded"}
            </Button>
          </Paper>
          <Paper title="Upload Your Document">
            <Files files={files} {...opts} />
          </Paper>
        </Grid>
        <Grid xs={12} sm={6}>
          <Proofing
            file={files[current]}
            current={current}
            on={files.length > 0}
            {...opts}
          />
        </Grid>
      </Grid>
    </Grid>
  </div>
)

const mapStateToProps = state => ({
  station: state.app.station,
  files: state.files.list,
  current: state.files.current || 0
})

const mergeProps = (state, {dispatch}, props) => ({
  ...props,
  ...state,
  proceed: () => {
    const station = state.station
    const files = state.files || []

    if (station && files.length > 0) {
      dispatch(setUi("section", 2))
    } else if (!station) {
      dispatch(setUi("section", 0))
      dispatch(notify("Please select a Printer first.", "error"))
    } else if (!files || files.length === 0) {
      dispatch(setUi("section", 1))
      dispatch(notify("Please upload your files first.", "error"))
    }
  },
  select: index => dispatch(selectFile(index)),
  remove: index => {
    dispatch(removeFile(index))
  },
  clearAll: () => dispatch(clearFiles()),
  onUploaded: (path, file, local) => {
    const text = `${local.name} has been uploaded. (${humanFileSize(file.size)})`
    dispatch(notify(text, "success"))
    dispatch(addFile({
      path,
      id: file.id,
      size: file.size,
      name: local.name,
      type: local.type,
      preview: local.preview,
      lastModified: local.lastModifiedDate
    }))
  },
  onProg: (total = 0, loaded = 0, file) => {
    if (total > 0) {
      const hTotal = humanFileSize(total)
      const hLoaded = humanFileSize(loaded)
      const perc = (loaded / total) * 100
      const stat = `Uploading ${file.name} at ${perc}% (${hLoaded} of ${hTotal})`
      dispatch(notify(stat))
    }
  },
  onError: (error, file) => {
    dispatch(notify(`Failure while uploading ${file.name}.`, "error"))
    console.error(error)
  }
})

export default connect(mapStateToProps, null, mergeProps)(withStyles(s)(DocumentUpload))

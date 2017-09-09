import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import Image from "react-medium-image-zoom"

import Paper from "../../Paper"
import Button from "../../Button"
import Upload from "../../Upload"

import {humanFileSize, getFileInfo} from "../../../core/helper"

import s from "./Document.scss"

const FirstUpload = withStyles(s)(upload => (
  <Upload {...upload}>
    <Button className={s.ripple}>
      <Paper title="No Files Yet -- Upload Something.">
        <div className={s.noFiles}>
          <img src="/static/isomac.svg" role="presentation" />
          <h2 className={s.h}>
            Let&apos;s Upload some Files.
          </h2>
          <h3 className={s.h}>
            Use the Upload Menu to upload your files.
          </h3>
        </div>
      </Paper>
    </Button>
  </Upload>
))

const NoPreview = withStyles(s)(({ext}) => (
  <div className={s.noFiles}>
    <img src="/static/isomac.svg" role="presentation" />
    <h2 className={s.h}>
      {ext ? "No Preview Available for this file." : "File isn't Selected."}
    </h2>
    <h3 className={s.h}>
      {ext ? `File Type: ${ext}` : "Please Select a File first."}
    </h3>
  </div>
))

const Preview = withStyles(s)(({name, type, path, preview}) => {
  if (type.indexOf("image") > -1) {
    return (
      <Image
        image={{
          src: preview,
          alt: "Preview",
          className: s.img
        }}
        zoomImage={{
          src: preview,
          alt: "Preview"
        }}
      />
    )
  } else if (type.indexOf("pdf") > -1) {
    return (
      <div className={s.iframe}>
        <iframe
          src={`${window ? window.location.origin : ""}${path}`}
          frameBorder="0"
        />
      </div>
    )
  }
  return (
    <div className={s.pad}>
      <NoPreview ext={getFileInfo(name, type)} />
    </div>
  )
})

const Proofing = ({file, remove, on, current = 0, onUploaded, onProg}) => {
  if (file) {
    return (
      <div>
        <Paper
          title={`Proofing Service (File #${current})`}
          style={{marginBottom: "1.5em"}}
          outer={<Preview {...file} />}
        />
        <Paper title={`File Information`}>
          <h2 className={s.h}>
            {file.name}
          </h2>
          <h3 className={s.heading}>
            {humanFileSize(file.size)} - {file.lastModified.toLocaleString()}
            &nbsp;- {getFileInfo(file.name, file.type)}
          </h3>
          <div>
            <a href={file.path} target="_blank" rel="noopener noreferrer">
              <Button base light>
                Download File
              </Button>
            </a>
            <Button className={s.remove} onClick={() => remove(current)} base light>
              Remove File
            </Button>
          </div>
          <div>
            <small className={s.small}>
              ID: {file.id}
            </small>
          </div>
        </Paper>
      </div>
    )
  } else if (on) {
    return (
      <Paper title="Proofing Service - File Not Selected">
        <NoPreview />
      </Paper>
    )
  }
  return <FirstUpload progress={onProg} result={onUploaded} />
}

export default withStyles(s)(Proofing)

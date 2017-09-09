import React from "react"

import {List, ListItem} from "material-ui/List"
import IconButton from "material-ui/IconButton"
import Subheader from "material-ui/Subheader"
import Avatar from "material-ui/Avatar"

import {blue500, teal500, deepOrange500} from "material-ui/styles/colors"

import InfoIcon from "material-ui/svg-icons/action/info"
import AddIcon from "material-ui/svg-icons/action/note-add"
import ClearIcon from "material-ui/svg-icons/content/clear"
import ChartIcon from "material-ui/svg-icons/editor/insert-chart"

import FilesIcon from "material-ui/svg-icons/action/assignment"
import FileIcon from "material-ui/svg-icons/editor/insert-drive-file"
import ImageIcon from "material-ui/svg-icons/editor/insert-photo"
import PDFIcon from "material-ui/svg-icons/image/picture-as-pdf"
import WordIcon from "material-ui/svg-icons/action/description"
import PlainIcon from "material-ui/svg-icons/action/receipt"

import Upload from "../../Upload"

import {humanFileSize, getFileInfo} from "../../../core/helper"

const getIcon = (name, type) => {
  const ext = name.split(".").pop()
  if (type.indexOf("image") > -1) {
    return <ImageIcon />
  } else if (type.indexOf("pdf") > -1) {
    return <PDFIcon />
  } else if (ext === "docx") {
    return <WordIcon />
  } else if (ext === "txt") {
    return <PlainIcon />
  }
  return <FileIcon />
}

const File = ({name, size, type, lastModified, select, remove, i = 0}) => (
  <div onClick={() => select(i)}>
    <ListItem
      leftAvatar={
        <Avatar icon={getIcon(name, type)} backgroundColor={blue500} />
      }
      rightIconButton={(
        <IconButton
          onClick={() => remove(i)}
          tooltip="Remove this File"
          tooltipPosition="bottom-left"
          touch
        >
          <ClearIcon />
        </IconButton>
      )}
      primaryText={`${name} (#${i})`}
      secondaryText={`${humanFileSize(size)} - ${getFileInfo(name, type)} - ${lastModified.toLocaleString()}`}
    />
  </div>
)

const NoFiles = () => (
  <ListItem
    leftAvatar={
      <Avatar icon={<FilesIcon />} backgroundColor={deepOrange500} />
    }
    rightIcon={<ChartIcon />}
    primaryText={`No Files Yet. Please add one.`}
    secondaryText="No Files have been added yet. Please add one below."
  />
)

export default ({files = [], onUploaded, onProg, onError, ...ops}) => (
  <List>
    <Subheader inset>
      Files
    </Subheader>
    <Upload result={onUploaded} progress={onProg} error={onError}>
      <ListItem
        leftAvatar={<Avatar icon={<AddIcon />} backgroundColor={teal500} />}
        rightIcon={<InfoIcon />}
        primaryText={`Upload a File`}
        secondaryText="Upload a file"
      />
    </Upload>
    {
      files.length > 0 ? (
        <div>
          {files.map((item, i) => <File key={i} i={i} {...ops} {...item} />)}
        </div>
      ) : (
        <Upload result={onUploaded} progress={onProg} error={onError}>
          <NoFiles />
        </Upload>
      )
    }
  </List>
)

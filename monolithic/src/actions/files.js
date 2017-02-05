import {makeAction} from "../core/helper"
import {ADD_FILE, SELECT_FILE, REMOVE_FILE, CLEAR_FILES} from "../constants/files"

export const addFile = makeAction(ADD_FILE)
export const selectFile = makeAction(SELECT_FILE)
export const removeFile = makeAction(REMOVE_FILE)

export const clearFiles = makeAction(CLEAR_FILES)

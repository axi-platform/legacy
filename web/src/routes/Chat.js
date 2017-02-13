import React from "react"

import Grid from "../components/Grid"
import ChatStage from "../components/ChatStage"

import {PrintAt, PrintAtChars} from "../constants/chatscripts"

export default () => (
  <Grid c n>
    <ChatStage stage={PrintAt} users={PrintAtChars} />
  </Grid>
)

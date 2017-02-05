import React from "react"

import Notification from "../Notification"

const Root = props => (
  <div>
    {props.children}
    <Notification />
  </div>
)

export default Root

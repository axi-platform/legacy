import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Scroll.scss"

const Scroll = () => (
  <div className={s.scroll}>
    <div className={s.mouse}>
      <div className={s.wheel} />
    </div>
    <div>
      <span className={s.a1} />
      <span className={s.a2} />
      <span className={s.a3} />
    </div>
  </div>
)

export default withStyles(s)(Scroll)

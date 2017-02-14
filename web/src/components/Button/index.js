import React, {Component} from "react"
import c from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Button.scss"

@withStyles(s)
export default class Button extends Component {

  componentDidMount = () => Waves.init()

  render = () => {
    const {className, light, base, b, children, ...btn} = this.props
    return (
      <button
        {...btn}
        className={c(
          s.btn,
          className,
          base && s.button,
          light && "waves-light",
          b && s.block
        )}
        ref={ref => Waves.attach(ref)}
      >
        {children}
      </button>
    )
  }

}

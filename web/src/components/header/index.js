import {h} from "preact"
import {Link} from "preact-router/match"

import s from "./style"

export default () => (
  <header class={s.header}>
    <h1>Preact App</h1>
    <nav>
      <Link activeClassName={s.active} href="/">Home</Link>
      <Link activeClassName={s.active} href="/profile">Me</Link>
      <Link activeClassName={s.active} href="/profile/john">John</Link>
    </nav>
  </header>
)

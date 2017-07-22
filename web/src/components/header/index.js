import {h} from "preact"
import {Link} from "preact-router/match"

import s from "./style"

const paths = [{
  path: "/",
  name: "Home"
}, {
  path: "/profile",
  name: "Profile"
}, {
  path: "/profile/john",
  name: "John"
}]

export default () => (
  <header class={s.header}>
    <h1>Preact App</h1>
    <nav>
      {paths.map(i => (
        <Link key={i.path} activeClassName={s.active} href={i.path}>
          {i.name}
        </Link>
      ))}
    </nav>
  </header>
)

import React from 'react'

import { Link } from '../../router'
import s from './Docs.css'

export default function Docs (props) {
  return (
    <section>
      <nav className={s.menu}>
        <ul>
          <li>
            <Link to="/docs" exact activeClassName={s.active}>
              Introduction
            </Link>
          </li>
          <li>
            <Link to="/docs/the-gist" exact activeClassName={s.active}>
              The Gist
            </Link>
          </li>
          <li>
            <Link to="/docs/keys-points" exact activeClassName={s.active}>
              Keys Points
            </Link>
          </li>
          <li>
            <Link to="/docs/getting-started" exact activeClassName={s.active}>
              Getting Started
            </Link>
          </li>
          <li><hr /></li>
          <li>
            <a href="/annotated/index.html" target="_blank" rel="noopener noreferrer">
              Annotated sources
            </a>
          </li>
        </ul>
      </nav>
      <section className={s.content}>
        {
          props.content
            ? <div dangerouslySetInnerHTML={ {__html: props.content} }></div>
            : <p>Documentation currently under development</p>
        }
      </section>
    </section>
  )
}

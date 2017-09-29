import React from 'react'

import { Link } from '../router'

export default function Docs (props) {
  return (
    <section className="section-docs">
      <nav className="menu">
        <ul>
          <li>
            <Link to="/docs" exact>Introduction</Link>
          </li>
          <li>
            <Link to="/docs/the-gist" exact>The Gist</Link>
          </li>
          <li>
            <Link to="/docs/keys-points" exact>Keys Points</Link>
          </li>
          <li>
            <Link to="/docs/getting-started" exact>Getting Started</Link>
          </li>
          <li><hr /></li>
          <li>
            <a href="/annotated/index.html" target="_blank" rel="noopener noreferrer">Annotated sources</a>
          </li>
        </ul>
      </nav>
      <section className="content">
        {
          props.content
            ? <div dangerouslySetInnerHTML={ {__html: props.content} }></div>
            : <p>Documentation currently under development</p>
        }
      </section>
    </section>
  )
}

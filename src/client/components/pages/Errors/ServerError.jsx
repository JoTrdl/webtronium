import React from 'react'
import cn from 'classnames'

import s from './Errors.css'

export default function ServerError (props) {
  const { title, stack } = props
  return (
    <section className={cn(s.container, s.mgTop2)}>
      <h1>Server Error: {title}</h1>
      <pre>{stack}</pre>
    </section>
  )
}

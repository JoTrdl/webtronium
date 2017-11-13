import React from 'react'
import cn from 'classnames'

import s from './Errors.css'

export default function NotFound (props) {
  return (
    <section className={cn(s.container, s.mgTop2, s.center)}>
      <h1 className={cn(s.mgTop2)}>This page is not found!</h1>
    </section>
  )
}

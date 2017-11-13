import React from 'react'
import cn from 'classnames'

import s from './Footer.css'

export default function Footer (props) {
  return (
    <footer className={cn(s.footer, props.alt && s.alternate)}>
      <p className={s.noMargin}>MIT License. Copyright &copy; { (new Date()).getFullYear() }</p>
    </footer>
  )
}

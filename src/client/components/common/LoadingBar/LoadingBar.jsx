import React from 'react'
import cn from 'classnames'

import s from './LoadingBar.css'

export default function LoadingBar (props) {
  const { active, alt } = props

  return (
    <div className={cn(s.loadingBar, alt && s.alternate)}>
      { active && <div className={s.loader} />}
    </div>
  )
}

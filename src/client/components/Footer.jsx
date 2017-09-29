import React from 'react'

export default function Footer (props) {
  const alternate = (props.alt && 'alt') || ''
  return (
    <footer className={['center', 'v-align', alternate].join(' ')}>
      <p className="no-margin">MIT License. Copyright &copy; { (new Date()).getFullYear() }</p>
    </footer>
  )
}

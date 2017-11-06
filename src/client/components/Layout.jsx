import React from 'react'

import Header from './Header'
import Footer from './Footer'

export default function Layout (props) {
  return ([
    <Header key="header" alt={props.layout.alternate} />,
    <main key="main">
      { props.children && props.children }
    </main>,
    <Footer key="footer" alt={props.layout.alternate} />
  ])
}

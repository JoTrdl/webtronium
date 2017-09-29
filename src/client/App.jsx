import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

export default function App (props) {
  return ([
    <Header key="header" alt={props.viewprops.alt} />,
    <main key="main">
      { props.children && props.children }
    </main>,
    <Footer key="footer" alt={props.viewprops.alt} />
  ])
}

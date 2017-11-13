import React from 'react'

import Header from '../Header'
import Footer from '../Footer'

import s from './Layout.css'

export default function Layout (props) {
  return ([
    <Header key="header" alt={props.layout.alternate} loading={props.loading}/>,
    <main key="main" className={s.main}>
      { props.children && props.children }
    </main>,
    <Footer key="footer" alt={props.layout.alternate} />
  ])
}

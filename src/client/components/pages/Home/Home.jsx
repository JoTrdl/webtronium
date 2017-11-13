import React from 'react'

import s from './Home.css'

export default function Home () {
  return (
    <section className={s.home}>
      <div className={s.hero}>
        <div className={s.content}>
          <div className={s.wrapper}>
            <h1 className={s.animatedFadeIn}>
              <strong>P</strong>ure<strong> S</strong>erver<strong>&nbsp;R</strong>outer
            </h1>
            <p className={s.animatedFadeInUp}>
              A pure, simple and efficient pattern to build JavaScript isomorphic websites.
            </p>
            <p className={s.animatedFadeInUp}>
              <i>Built to minimize development pain and optimize performance gain.</i>
            </p>
            <a href="https://github.com/JoTrdl/pure-server-router"
              className={s.button}>
              <span>See on Github</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

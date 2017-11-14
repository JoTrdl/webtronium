import React from 'react'

import s from './Home.css'

export default function Home () {
  return (
    <section className={s.home}>
      <div className={s.hero}>
        <div className={s.content}>
          <div className={s.wrapper}>
            <h1 className={s.animatedFadeIn}>
              <strong>W</strong>ebtronium
            </h1>
            <p className={s.animatedFadeInUp}>
              A pure, simple and efficient pattern to build JavaScript isomorphic websites.
            </p>
            <p className={s.animatedFadeInUp}>
              <i>Built to minimize development pain and optimize performance gain.</i>
            </p>
            <a href="https://github.com/JoTrdl/webtronium"
              className={s.button}>
              <span>See on Github</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

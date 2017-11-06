import React from 'react'

export default class Home extends React.Component {
  render () {
    return (
      <section className="home">
        <div className="hero">
          <div className="content v-align">
            <div className="wrapper">
              <h1 className="animated fadeIn">
                <strong>P</strong>ure<strong> S</strong>erver<strong>&nbsp;R</strong>outer
              </h1>
              <p className="animated fadeInUp">
                A pure, simple and efficient pattern to build JavaScript isomorphic websites.
              </p>
              <p className="animated fadeInUp">
                <i>Built to minimize development pain and optimize performance gain.</i>
              </p>
              <a href="https://github.com/JoTrdl/pure-server-router"
                className="button button-large button-outline button-effect animated fadeInUp">
                <span>See on Github</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

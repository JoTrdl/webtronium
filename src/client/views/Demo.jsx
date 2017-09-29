import React from 'react'

import { Link } from '../router'

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value || 0
    }
    this.increment = this.increment.bind(this)
  }

  increment () {
    this.setState({value: this.state.value + 1})
  }

  render () {
    return (
      <button
        className="button button-large full-width"
        onClick={this.increment}>
        Click me: {this.state.value}
      </button>
    )
  }
}

export default function Demo (props) {
  return (
    <section className="container mg-top-1 mg-bottom-2">
      <h1>Demos</h1>
      <p>
        Check the <a href="/annotated/src/server/controllers/demo.controller.js.html">server controller</a>
        &nbsp;and the corresponding <a href="/annotated/src/client/views/Docs.jsx.html">JSX view</a>.
      </p>
      <div className="row">
        <div className="column column-25"><h3>Counter</h3></div>
        <div className="column">
          <p>
            Basic counter demo
            <br />
            You can specify a value in the query params: <a href="/demos/counter?value=1234">/demos/counter?value=1234</a>
            <br />
            The controller will send back via the view props the value and the component will initialy render it.
          </p>
          <Counter value={props.counter} />
        </div>
      </div>
      <div className="row"><div className="column"><hr /></div></div>
      <div className="row">
        <div className="column column-25"><h3>Redirect</h3></div>
        <div className="column">
          <p>
            Showcase a redirection.
            <br />
            Open your network tab and look at the requests: the final url will be up to date in the browser address bar.
          </p>
          <Link to="/demos/redirect" exact>Redirect</Link>
        </div>
      </div>
      <div className="row"><div className="column"><hr /></div></div>
      <div className="row">
        <div className="column column-25"><h3>Not found</h3></div>
        <div className="column">
          <p>Showcase the not found page:</p>
          <Link to="/demos/notfound" exact>Not found</Link>
        </div>
      </div>
      <div className="row"><div className="column"><hr /></div></div>
      <div className="row">
        <div className="column column-25"><h3>Server error</h3></div>
        <div className="column">
          <p>Showcase the server error page:</p>
          <Link to="/demos/error" exact>Server error</Link>
        </div>
      </div>
    </section>
  )
}

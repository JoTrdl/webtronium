import React from 'react'
import cn from 'classnames'

import { Link } from '../../router'
import g from '../../../style/global.css'
import s from './Demo.css'

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value || 0
    }
    this.increment = this.increment.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.value || 0})
  }

  increment () {
    this.setState({value: this.state.value + 1})
  }

  render () {
    return (
      <button
        className={cn(g.button, g.buttonLarge)}
        onClick={this.increment}>
        Click me: {this.state.value}
      </button>
    )
  }
}

export default function Demo (props) {
  return (
    <section className={cn(g.container, s.wrapper)}>
      <h1>Demos</h1>
      <p>
        Check the <a href="/annotated/src/server/controllers/demo.controller.js.html">server controller</a>
        &nbsp;and the corresponding <a href="/annotated/src/client/components/pages/Demo/Demo.jsx.html">JSX view</a>.
      </p>
      <div className={g.row}>
        <div className={cn(g.column, g.column25)}><h3>Counter</h3></div>
        <div className={g.column}>
          <p>
            Basic counter demo
            <br />
            You can specify a value in the query params: <a href="/demos/counter?value=1234">/demos/counter?value=1234</a>
            <br />
            The controller will send back via the container props the value and the component will initialy render it.
          </p>
          <Counter value={props.counter} />
        </div>
      </div>
      <div className={g.row}><div className={g.column}><hr /></div></div>
      <div className={g.row}>
        <div className={cn(g.column, g.column25)}><h3>Redirect</h3></div>
        <div className={g.column}>
          <p>
            Showcase a redirection.
            <br />
            Open your network tab and look at the requests: the final url will be up to date in the browser address bar.
          </p>
          <Link to="/demos/redirect">Redirect</Link>
        </div>
      </div>
      <div className={g.row}><div className={g.column}><hr /></div></div>
      <div className={g.row}>
        <div className={cn(g.column, g.column25)}><h3>Not found</h3></div>
        <div className={g.column}>
          <p>Showcase the not found page:</p>
          <Link to="/demos/notfound">Not found</Link>
        </div>
      </div>
      <div className={g.row}><div className={g.column}><hr /></div></div>
      <div className={g.row}>
        <div className={cn(g.column, g.column25)}><h3>Server error</h3></div>
        <div className={g.column}>
          <p>Showcase the server error page:</p>
          <Link to="/demos/error">Server error</Link>
        </div>
      </div>
    </section>
  )
}

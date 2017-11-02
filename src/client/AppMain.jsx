import React from 'react'
import { Provider, connect } from 'react-redux'

import App from './App.jsx'
import { Router } from './router'
import { fetchContext } from './store/modules/context'
import { setLoadingState } from './store/modules/loading'
import { scrollPosition, sendPageviewEvent } from './utils'

class AppMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      component: props.initialView
    }

    if (!props.initialView) {
      // if no module at startup, lazy load the component.
      // For dev mostly, in prod mode this should never happen
      // (the component is already loaded at startup).
      this.loadAsyncComponent(props.context.view.component)
    }

    this.onRouteChange = this.onRouteChange.bind(this)
    this.scrollPositions = {}
  }

  // This component should be never auto updated by React.
  // Because it manages the lazy code spliting loading, it
  // will call forceUpdate() when the component is ready to render.
  shouldComponentUpdate () {
    return false
  }

  // This function calls Webpack to lazy load
  // the component, wait till it is completed,
  // then call forceUpdate() to trigger a render.
  async loadAsyncComponent (component) {
    // default to the current component (for HMR in dev)
    const c = component || this.props.context.view.component

    const module = await import(`./views/${c}`)
    this.setState({ component: module.default })
    this.forceUpdate()
  }

  async onRouteChange ({ to, state, action }) {
    try {
      this.props.setLoading(true)

      // Save the current scroll position only if it is
      // a push action (user clicked on a link to navigate
      // somewhere in the website)
      if (action === 'PUSH') {
        this.scrollPositions[state.navKey] = scrollPosition()
      }

      // Get the new context associated with the 'to' url via the store
      const context = await this.props.fetchContext(to)

      // Update the browser title: 
      // the metadata contains metas/links too, up to you to
      // update them if needed
      document.title = context.metadata.title || 'Pure Server Router'

      // Lazy load the component to render
      await this.loadAsyncComponent(context.view.component)

      // Reset the saved scroll position if the user clicked on
      // the back button, else to go to the top.
      scrollPosition(action === 'POP'
        ? this.scrollPositions[state.navKey]
        : null
      )

      sendPageviewEvent(context.location.url)

      this.props.setLoading(false)

      // Return the actual url received from
      // the backend: keep the adddress bar synced with
      // the server response (redirection...)
      return context.location.url

    // If any error occurs during this context fetch,
    // force the browser to load the page entirely
    } catch (e) {
      window.location = to
    }
  }

  render () {
    const { history, store, context } = this.props

    return (
      <Provider store={store}>
        <Router history={history} onChange={this.onRouteChange}>
          {
            this.state.component &&
            <App layout={this.props.layout}>
              <this.state.component {...context.view.props} />
            </App>
          }
        </Router>
      </Provider>
    )
  }
}

// This component is connected to the store
export default connect(
  state => ({
    context: state.context,
    layout: state.layout
  }),
  dispatch => ({
    fetchContext: path => dispatch(fetchContext(path)),
    setLoading: active => dispatch(setLoadingState(active))
  }),
  null,
  { withRef: true } // for HMR only
)(AppMain)

// This component cannot be hot reloaded
// if any changes occur.
if (module.hot) {
  module.hot.decline()
}

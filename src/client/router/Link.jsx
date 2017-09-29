import React from 'react'
import PropTypes from 'prop-types'

/**
 * Supports:
 *
 * <Link to="">
 * <Lint to="" active>
 * <Link to="" match>
 * <Link to="" exact>
 * <Link to="" exact withQueries>
 * <Link to="" exact withQueries=['sort']>
 * 
 * active: set the active classname
 * match: match the current location with the to
 * exact: strictly compares the location and the to
 * withQueries: compare all queries too
 * withQueries(array): compare only the specified queries
 */
export default class Link extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount () {
    this.unlisten = this.context.router.listen(() => this.forceUpdate())
  }

  componentWillUnmount () {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render () {
    const { router } = this.context
    const { location } = router
    const {
      to, exact, match, withQueries,
      active, activeClassName, className,
      children, onClick, ...otherProps } = this.props

    const route = to || '#'
    const [path, qs] = route.split('?', 2)
    let classNames = className || ''

    let routeMatch = exact
      ? location.path === path
      : match
        ? location.path.match(path)
        : active

    // If 'withQueries' is passed, determine if it is
    // a route match based on thse queries.
    // Note: queries order is not important. 
    if (withQueries) {
      const queries = (qs || '').split('&').reduce((acc, s) => {
        const [q, v] = s.split('=')
        acc[q || ''] = v || ''
        return acc
      }, {})

      const expectedQueries = Array.isArray(withQueries)
        ? withQueries
        : Object.keys(queries)

      routeMatch = expectedQueries.every(q => (
        queries[q] === `${(location.query || {})[q]}`
      ))
    }

    // If the route matches, add the 'activeClassName'.
    // Default to 'active' if nothing provided.
    if (routeMatch) {
      classNames += ` ${activeClassName || 'active'}`.trim()
    }

    // Override or set the onClick handler.
    // Will called the initial one if provided and then,
    // call push() on the router.
    otherProps.onClick = function navigate (e) {
      if (e.button !== 0 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return
      }

      e.preventDefault()
      typeof onClick === 'function' && onClick(e)

      router.push(route)
    }

    return (
      <a href={route}
        className={classNames}
        {...otherProps}>
        {children}
      </a>
    )
  }
}

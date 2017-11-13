import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import ReactTestRenderer from 'react-test-renderer'

describe('Link', () => {
  const getStubbedLink = (path, query = {}) => {
    class Wrapper extends React.Component {
      static childContextTypes = {
        router: PropTypes.object
      }

      getChildContext () {
        return {
          router: {
            location: { path, query },
            listen: () => {}
          }
        }
      }

      render () {
        return React.createElement(Link, this.props)
      }
    }

    return Wrapper
  }

  it('renders a link without active class', () => {
    const Link = getStubbedLink('/')
    const tree = ReactTestRenderer.create(
      <Link to="/test">Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link without active class even if route match', () => {
    const Link = getStubbedLink('/test')
    const tree = ReactTestRenderer.create(
      <Link to="/test">Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link with active class if route exact', () => {
    const Link = getStubbedLink('/test')
    const tree = ReactTestRenderer.create(
      <Link to="/test" exact>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link with active class if route match', () => {
    const Link = getStubbedLink('/test/sub')
    const tree = ReactTestRenderer.create(
      <Link to="/test" match>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link without active class if route match', () => {
    const Link = getStubbedLink('/test/sub')
    const tree = ReactTestRenderer.create(
      <Link to="/test/other" match>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link with active class if queries match', () => {
    const Link = getStubbedLink('/test', {a: 1, b: 2})
    const tree = ReactTestRenderer.create(
      <Link to="/test?a=1&b=2" exact withQueries>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link with active class if queries match', () => {
    const Link = getStubbedLink('/test', {a: 1, b: 2})
    const tree = ReactTestRenderer.create(
      <Link to="/test?a=1&b=3" exact withQueries={['a']}>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a link without active class if queries not match', () => {
    const Link = getStubbedLink('/test', {a: 4, b: 3})
    const tree = ReactTestRenderer.create(
      <Link to="/test?a=1&b=3" exact withQueries={['a']}>Test</Link>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

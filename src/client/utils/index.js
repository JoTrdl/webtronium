
import queries from './queries'
import request from './request'

/**
 * True if running on browser
 */
const isBrowser = typeof window !== 'undefined'

/**
 * True if running on server
 */
const isServer = !isBrowser

/**
 * Call fn next tick in the calls stack
 * @param {Function} fn - The function to call after a process tick
 */
const nextTick = (fn) => {
  setTimeout(() => fn(), 0)
}

/**
 * More precise Time.now() if available
 * @type {Function}
 */
const Time = isBrowser && window.performance && window.performance.now
  ? window.performance
  : Date

/**
 * Get/Set the window position
 * @param {{x: number, y: number}} position
 * @returns {null|{x: number, y: number}} The current scroll position if position specified
 */
const scrollPosition = (position) => {
  if (typeof position !== 'undefined') {
    const p = position || { x: 0, y: 0 }
    nextTick(() => {
      // wait a tick to be sure that browser
      // got the time to render
      window.scrollTo(p.x, p.y)
    })

    return
  }

  const { documentElement } = window.document

  return {
    x: window.pageXOffset || documentElement.scrollLeft || 0,
    y: window.pageYOffset || documentElement.scrollTop || 0
  }
}

/**
 * Send a pageview analytics events.
 * @param {string} path
 */
const sendPageviewEvent = (path) => {
  if (window.ga) {
    window.ga('set', 'page', path)
    window.ga('send', 'pageview')
  }
}

export {
  isBrowser,
  isServer,
  nextTick,
  Time,
  queries,
  request,
  scrollPosition,
  sendPageviewEvent
}

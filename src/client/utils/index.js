
const isBrowser = typeof window !== 'undefined'
const isServer = !isBrowser

/**
 * Call fn next tick in the calls stack
 * @param {*} fn
 */
const nextTick = (fn) => {
  setTimeout(() => fn(), 0)
}

/**
 * More precise Time.now() if available
 */
const Time = isBrowser && window.performance && window.performance.now
  ? window.performance
  : Date

/**
 * Return the current scroll position
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
  scrollPosition,
  sendPageviewEvent
}

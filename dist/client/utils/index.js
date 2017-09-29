'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const isBrowser = typeof window !== 'undefined';

/**
 * More precise Time.now() if available
 */
const Time = isBrowser && window.performance && window.performance.now ? window.performance : Date;

/**
 * Return the current scroll position
 */
const scrollPosition = position => {
  if (typeof position !== 'undefined') {
    const p = position || { x: 0, y: 0 };
    setTimeout(() => {
      // wait a tick to be sure that browser
      // got time to render
      window.scrollTo(p.x, p.y);
    });

    return;
  }

  const { documentElement } = window.document;

  return {
    x: window.pageXOffset || documentElement.scrollLeft || 0,
    y: window.pageYOffset || documentElement.scrollTop || 0
  };
};

/**
 * Send a pageview analytics events.
 */
const sendPageviewEvent = path => {
  if (window.ga) {
    window.ga('set', 'page', path);
    window.ga('send', 'pageview');
  }
};

exports.isBrowser = isBrowser;
exports.Time = Time;
exports.scrollPosition = scrollPosition;
exports.sendPageviewEvent = sendPageviewEvent;
/* eslint-disable import/no-webpack-loader-syntax */

// Import global styles
require('./style')
require('!style-loader!css-loader!highlight.js/styles/github.css') // skip CSS modules

require('./bootstrap')

if (module.hot) {
  // Style can be hot reloaded
  module.hot.accept('./style', () => { require('./style') })
}

if (window.ANALYTICS_ID) {
  /* eslint-disable */
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', window.ANALYTICS_ID, 'auto');
  ga('send', 'pageview');
  /* eslint-enable */
}

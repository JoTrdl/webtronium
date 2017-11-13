
const config = require('../config')

// dev friendly tools
if (config.get('env') === 'development') {
  require('babel-register')
  require('node-hot')
}

// relative imports
require('app-module-path').addPath(__dirname)

// bootstrap the server
require('./server')

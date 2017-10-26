
const config = require('../config')

// dev friendly tools
if (config.get('env') === 'development') {
  require('babel-register')
  require('node-hot')
}

require('./server')

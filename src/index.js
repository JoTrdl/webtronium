
const config = require('../config')

// dev friendly tools
if (config.get('env') === 'development') {
  require('babel-register')

  // It is a bit hackish: every jsx file imported
  // on the server are watched.
  // If the file change, the process is exited with
  // an error.
  // In dev mode, there is forever + nodemon. So,
  // if we exit the process, forever will start a
  // new nodemon process...
  // All of this to have a jsx component up to date
  // on the server and avoid a React warning in the
  // browser console: 'server rendered not matching...'

  // was bored of the restart every time a client file is
  // touched and finally decided to live with the warning...
  /*
  const fs = require('fs')
  const babel = require('babel-core')
  const watched = {}

  require.extensions['.jsx'] = (module, filename) => { // eslint-disable-line node/no-deprecated-api
    const {code} = babel.transformFileSync(filename)
    module._compile(code, filename)

    !watched[filename] && fs.watchFile(filename, () => process.exit(1))
    watched[filename] = true
  }
  */
}

require('./server')

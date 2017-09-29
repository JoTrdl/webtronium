'use strict';

const fs = require('fs');
const babel = require('babel-core');

const config = require('../config');

// dev tools
if (config.get('env') === 'development') {
  require('babel-register');

  // eslint-disable-next-line node/no-deprecated-api
  require.extensions['.jsx'] = (module, filename) => {
    // This is totaly a question of taste/preference:
    // if we don't use the deprecated node api,
    // there is no choice to restart the server
    // every time we update a jsx component.
    // I personally prefer the developer experience,
    // so, I use this to catch any server require(*.jsx)
    // and watch the file for changes to invalidate the
    // require cache.
    // This case, the server output will be always up to
    // date with the jsx component and no React warnings
    // will be triggered.
    const { code } = babel.transformFileSync(filename);
    delete require.cache[filename];
    module._compile(code, filename);
  };
}

require('./server');
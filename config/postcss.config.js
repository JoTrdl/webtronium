const path = require('path')
const postcss = require('postcss')

const CLIENT_STYLE_PATH = path.resolve(__dirname, '../src/client/style')

const DEFAULT_CONFIG = [
  require('postcss-custom-properties')(),
  require('postcss-nesting')(),
  require('postcss-extend')(),
  require('postcss-atroot')(),
  require('postcss-color-function')(),
  require('postcss-cssnext')({
    browsers: ['last 2 versions', '> 5%']
  })
]

if (process.env.BABEL_ENV === 'node') {
  // babel server:
  // exports a function to process the css
  module.exports = (source, filename) => (
    postcss([
      require('postcss-import-sync2')({
        path: CLIENT_STYLE_PATH
      }),
      ...DEFAULT_CONFIG
    ]).process(source, { from: filename }).css
  )
} else {
  // else it is the webpack configuration:
  module.exports = [
    require('postcss-import')({
      addModulesDirectories: CLIENT_STYLE_PATH
    }),
    ...DEFAULT_CONFIG
  ]
}

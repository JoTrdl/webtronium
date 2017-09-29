let assets = null
let chunks = null
try {
  assets = JSON.stringify(require('../dist/bundles/assets.json')) // eslint-disable-line
  chunks = JSON.stringify(require('../dist/bundles/chunks.json')) // eslint-disable-line
} catch (e) {
  throw new Error('Assets/chunks definitions not found: run "npm run build" to build website production bundles.')
}

module.exports = {
  env: 'production',
  server: {
    port: process.env.PORT || 3000, // for heroku
    bundles: {
      assets,
      chunks
    }
  }
}

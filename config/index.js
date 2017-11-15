const path = require('path')
const convict = require('convict')

const pkg = require('../package.json')

const config = convict({
  env: {
    doc: 'The server environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  appId: {
    doc: 'Application ID',
    format: 'String',
    default: pkg.version
  },
  /**
   * Server config
   */
  server: {
    host: {
      doc: 'The server host',
      format: 'ipaddress',
      default: '0.0.0.0',
      env: 'SERVER_HOST'
    },
    port: {
      doc: 'The server port',
      format: 'port',
      default: 80,
      env: 'SERVER_PORT'
    },
    // Cache section
    cache: {
      enabled: {
        doc: 'Cache control enabled',
        format: 'Boolean',
        default: true,
        env: 'SERVER_CACHE_ENABLED'
      },
      maxAge: {
        doc: 'Default cache max age',
        format: 'integer',
        default: 24 * 60 * 60, // 1 day
        env: 'SERVER_CACHE_DEFAULT_MAX_AGE'
      }
    },
    // public assets serving
    static: {
      directory: {
        doc: 'The public directory to serve',
        format: 'String',
        default: path.resolve(__dirname, '../public'),
        env: 'SERVER_STATIC_DIR'
      },
      maxAge: {
        doc: 'Cache max age',
        format: 'duration',
        default: 365 * 24 * 60 * 60 // 1 year
      },
      prefix: {
        doc: 'URL Prefix',
        format: 'String',
        default: '/'
      },
      dynamic: {
        doc: 'Dynamic load assets',
        format: 'Boolean',
        default: true
      }
    },
    // Bundles serving config section
    bundles: {
      directory: {
        doc: 'The bundles directory to serve',
        format: 'String',
        default: path.resolve(__dirname, '../dist/bundles'),
        env: 'SERVER_BUNDLES_DIR'
      },
      maxAge: {
        doc: 'Cache max age',
        format: 'duration',
        default: 365 * 24 * 60 * 60 // 1 year
      },
      prefix: {
        doc: 'URL Prefix',
        format: 'String',
        default: '/bundles'
      },
      assets: {
        doc: 'App Assets',
        format: 'String',
        default: JSON.stringify({
          vendor: {
            js: 'vendor.js'
          },
          app: {
            js: 'app.js',
            css: null
          }
        })
      },
      chunks: {
        doc: 'App Chunks',
        format: 'String',
        default: JSON.stringify({})
      }
    },
    // critical CSS
    criticalCSSEnabled: {
      doc: 'Critical CSS extraction enabled',
      format: 'Boolean',
      default: true
    }
  },
  /**
   * Docs directory
   */
  docs: {
    path: {
      doc: 'The docs directory path',
      format: 'String',
      default: path.resolve(__dirname, '../docs')
    },
    cache: {
      doc: 'Cache the generated html ouput',
      format: 'Boolean',
      default: true
    }
  },
  /**
   * Docs directory
   */
  analytics: {
    doc: 'GA tag id',
    format: 'String',
    default: 'UA-107048742-1'
  },
  /**
   * Webpack dev server config
   */
  devServer: {
    port: {
      doc: 'The Webpack dev server port.',
      format: 'port',
      default: 8082
    }
  }
})

// load specific env file
try {
  const env = config.get('env')
  config.load(require(`./_${env}`))
} catch (e) { }

config.validate({ allowed: 'strict' })

module.exports = config

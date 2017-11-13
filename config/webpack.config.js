const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AssetsPlugin = require('assets-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin

const appConfig = require('.')
const postcssConfig = require('./postcss.config')
const generateScopedName = require('./name.cssmodules.config')

const ENV = process.env.NODE_ENV || 'development'
const IS_PROD = ENV === 'production'
const IS_DEV = ENV === 'development'

const PUBLIC_PATH = 'bundles'
const SRC_DIR = path.join(__dirname, '../src')
const BUILD_DIR = path.join(__dirname, `../dist/${PUBLIC_PATH}`)
const LAZY_CHUNKS_DIR = 'components'

const OUTPUT_STATS = {
  colors: true,
  hash: false,
  timings: false,
  version: false,
  chunks: false,
  modules: false,
  children: false,
  chunkModules: false
}

const STYLE_LOADERS = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      camelCase: true,
      getLocalIdent: (context, localIdentName, localName) => {
        return generateScopedName(localName, context.resourcePath)
      }
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins () {
        return postcssConfig
      }
    }
  }
]

const config = {
  context: `${SRC_DIR}/client/`,
  devtool: 'source-map',
  entry: {
    app: ['./index.js']
  },
  output: {
    path: BUILD_DIR,
    publicPath: `/${PUBLIC_PATH}/`,
    filename: IS_PROD ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css'],
    alias: {
      client: `${SRC_DIR}/client/`
    }
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(ttf|eot|svg|woff(2)?).*$/, loader: 'file-loader' },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[chunkhash]'
        }
      },
      {
        test: /\.css$/,
        use: IS_DEV
          ? [{ loader: 'style-loader' }, ...STYLE_LOADERS]
          : ExtractTextPlugin.extract({ use: STYLE_LOADERS })
      },
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            forceEnv: 'webpack'
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.CONTAINERS': JSON.stringify(LAZY_CHUNKS_DIR)
    }),
    // Do not recursively scan the lazy directory
    new webpack.ContextReplacementPlugin(new RegExp(LAZY_CHUNKS_DIR), false),
    // Extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          /node_modules/.test(module.context) && !/\.css$/.test(module.request)
        )
      }
    }),
    // Manifest for lazy loading
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      children: true,
      async: true
    })
  ],
  performance: {
    maxEntrypointSize: 300000,
    hints: IS_PROD ? 'warning' : false
  },
  stats: OUTPUT_STATS
}

// -----------------
// Development
// ---------------------------------------
if (IS_DEV) {
  const serverUrl = `http://${appConfig.get('server.host')}:${appConfig.get('server.port')}`
  const devServerUrl = `http://localhost:${appConfig.get('devServer.port')}`
  config.output.publicPath = `${devServerUrl}/${PUBLIC_PATH}/`
  config.entry.app.push(
    `webpack-dev-server/client?${devServerUrl}`,
    'webpack/hot/only-dev-server'
  )
  config.plugins.push(
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )

  config.devServer = {
    publicPath: config.output.publicPath,
    port: appConfig.get('devServer.port'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    hot: true,
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: false
    },
    stats: OUTPUT_STATS,
    proxy: {
      '/img': {
        target: serverUrl
      }
    }
  }
}

// -----------------
// Production
// ---------------------------------------
if (IS_PROD) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { 'preset': 'advanced' }
    }),
    new AssetsPlugin({
      path: `${BUILD_DIR}`,
      filename: 'assets.json',
      fullPath: false,
      prettyPrint: true
    }),
    new StatsWriterPlugin({
      filename: 'chunks.json',
      fields: ['chunks'],
      transform: (data) => {
        const hashes = {}
        const containers = data.chunks.reduce((acc, c) => {
          hashes[c.id] = c.hash
          c.modules.forEach(m => {
            // grab all the dynamic chunks (code splitting)
            const dynamicReason = m.reasons.find(r => r.type === 'context element')
            if (dynamicReason) {
              const p = path.resolve(config.context, dynamicReason.userRequest)
              const name = path.basename(p, '.jsx')
              acc[name] = `${m.chunks[0]}.${hashes[m.chunks[0]]}.js`
            }
          })
          return acc
        }, {})

        return JSON.stringify(containers, null, 2)
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: `${BUILD_DIR}/bundles-report.html`
    })
  )
}

module.exports = config

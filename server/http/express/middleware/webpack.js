const webpack = require('webpack')
const compose = require('composable-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('app-config-chain')

const webpackConfig = require('../../../../build/webpack')
const compiler = webpack(webpackConfig)
const paths = config.utils_paths

module.exports = (req, res, next) =>
  compose(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: paths.base(config.dir_client),
      hot: true,
      quiet: config.compiler_quiet,
      noInfo: config.compiler_quiet,
      lazy: false,
      stats: config.compiler_stats
    }),
    WebpackHotMiddleware(compiler)
  )

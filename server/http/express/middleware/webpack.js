const webpack = require('webpack')
const {compose} = require('compose-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('app-config-chain')

const webpackConfig = require('../../../../webpack')
const compiler = webpack(webpackConfig)

module.exports = compose([
  WebpackDevMiddleware(compiler, {
    publicPath: config.paths.public,
    contentBase: config.paths.client,
    hot: true,
    lazy: false
  }),
  WebpackHotMiddleware(compiler)
])

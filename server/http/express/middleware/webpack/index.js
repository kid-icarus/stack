const webpack = require('webpack')
const compose = require('composable-middleware')

const webpackConfig = require('../../../../../build/webpack')
const dev = require('./webpack-dev')
const hmr = require('./webpack-hmr')
const compiler = webpack(webpackConfig)

module.exports = (req, res, next) =>
  compose(
    dev({
      compiler,
      publicPath: webpackConfig.output.publicPath
    }),
    hmr({ compiler })
  )

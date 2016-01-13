import webpack from 'webpack'
import {compose} from 'compose-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import config from 'app-config-chain'
import webpackHandler from './webpackHandler'

import webpackConfig from '../../../../../webpack'
const compiler = webpack(webpackConfig, webpackHandler)

export default compose([
  WebpackDevMiddleware(compiler, {
    publicPath: config.paths.public,
    contentBase: config.paths.client,
    hot: true,
    lazy: false,
    quiet: true
  }),
  WebpackHotMiddleware(compiler)
])

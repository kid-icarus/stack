import webpack from 'webpack'
import {compose} from 'compose-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import config from 'app-config-chain'
import webpackConfig from '../../../webpack'
const compiler = webpack(webpackConfig)

export default compose([
  WebpackDevMiddleware(compiler, {
    publicPath: config.paths.public,
    contentBase: config.paths.client,
    noInfo: true,
    hot: true,
    lazy: false,
    quiet: false
  }),
  WebpackHotMiddleware(compiler)
])

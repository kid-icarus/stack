const WebpackDevMiddleware = require('webpack-dev-middleware')
const config = require('app-config-chain')
const paths = config.utils_paths

export default ({ compiler, publicPath }) =>
  WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.base(config.dir_client),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  })

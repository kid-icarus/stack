/* eslint key-spacing:0 */
import webpack from 'webpack'
import _debug from 'debug'

const debug = _debug('build:development')

export default (webpackConfig) => {
  debug('Create configuration.')

  // ------------------------------------
  // Enable HMR if Configured
  // ------------------------------------
  debug('Enable Hot Module Replacement (HMR).')

  webpackConfig.entry.app.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  )

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  webpackConfig.eslint.emitWarning = true

  webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
    if (/babel/.test(loader.loader)) {
      debug('Apply react-transform-hmr to babel development transforms')

      if (loader.query.env.development.plugins[0][0] !== 'react-transform') {
        debug('ERROR: react-transform must be the first plugin')
        return loader
      }

      const reactTransformHmr = {
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }
      loader.query.env.development.plugins[0][1].transforms
        .push(reactTransformHmr)
    }

    return loader
  })

  return webpackConfig
}

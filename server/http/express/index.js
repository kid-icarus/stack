const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const config = require('app-config-chain')

const app = express()
const paths = config.utils_paths

app.use(historyApiFallback({
  verbose: false
}))

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  app.use(require('./middleware/webpack'))
} else {
  app.use(express.static(paths.base(config.dir_dist)))
}

module.exports = app

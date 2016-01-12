const express = require('express')
const config = require('app-config-chain')
const paths = config.utils_paths

const app = express()
app.disable('x-powered-by')

// middleware stack
app.use(require('./middleware/errors'))
app.use(require('./middleware/formatting'))
app.use(require('./middleware/session'))

// final piece - serve static content
app.use(require('./middleware/spa'))

if (config.env === 'development') {
  app.use(require('./middleware/webpack'))
} else {
  app.use(express.static(paths.base(config.dir_dist)))
}

module.exports = app

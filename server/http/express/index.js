import express from 'express'
import config from 'app-config-chain'

import errors from './middleware/errors'
import formatting from './middleware/formatting'
import spa from './middleware/spa'
import webpack from './middleware/webpack'
import session from './middleware/session'

const paths = config.utils_paths
const app = express()
app.disable('x-powered-by')

// middleware stack
app.use(errors)
app.use(formatting)
app.use(session)

// final piece - serve static content
app.use(spa)

if (config.env === 'development') {
  app.use(webpack)
} else {
  app.use(express.static(paths.base(config.dir_dist)))
}

export default app

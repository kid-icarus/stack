// import {compose} from 'compose-middleware'
import path from 'path'
import config from 'app-config-chain'
import loadResources from './loadResources'
import _debug from 'debug'
const debug = _debug('app:api:loader')

const resources = loadResources({
  prefix: config.api.path,
  path: path.join(config.paths.base, './server/resources')
})

if (config.env !== 'production') {
  Object.keys(resources).forEach((resourceName) => {
    var endpoints = resources[resourceName]
    debug(`Loaded ${endpoints.length} endpoints for "${resourceName}"`)
    endpoints.forEach((endpoint) =>
      debug(`  - ${endpoint.name} (${endpoint.method.toUpperCase()} ${endpoint.path})`)
    )
  })
}

export default (req, res, next) => next()

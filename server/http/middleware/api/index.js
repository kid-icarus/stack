// import {compose} from 'compose-middleware'
import {Router} from 'express'
import path from 'path'
import config from 'app-config-chain'
import loadResources from './loadResources'
import wrapHandler from './wrapHandler'
import displayResources from './displayResources'
import _debug from 'debug'
const debug = _debug('app:api:loader')

// load in the resources
const resources = loadResources({
  prefix: config.api.path,
  path: path.join(config.paths.base, './server/resources')
})
const meta = displayResources(resources)

// construct the router
const router = Router({mergeParams: true})
router.get(`${config.api.path}/_resources`, (req, res) => res.json(meta))

Object.keys(resources).forEach((resourceName) => {
  var endpoints = resources[resourceName]
  debug(`Loaded ${endpoints.length} endpoints for "${resourceName}"`)
  endpoints.forEach((endpoint) => {
    debug(`  - ${endpoint.name} (${endpoint.method.toUpperCase()} ${endpoint.path})`)
    router[endpoint.method](endpoint.path, wrapHandler(endpoint.handler, endpoint.model))
  })
})

router.meta = meta

export default router

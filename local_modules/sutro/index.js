import {Router} from 'express'
import each from 'lodash.foreach'
import loadResources from './loadResources'
import wrapHandler from './wrapHandler'
import displayResources from './displayResources'
import _debug from 'debug'
const debug = _debug('sutro:loader')

export default (opt) => {
  const resources = loadResources({
    prefix: opt.prefix,
    path: opt.resources
  })
  const meta = displayResources(resources)

  // construct the router
  const router = Router({mergeParams: true})
  router.get(`${opt.prefix}/_resources`, (req, res) => res.json(meta))

  each(resources, (endpoints, resourceName) => {
    debug(`Loaded ${endpoints.length} endpoints for "${resourceName}"`)
    each(endpoints, (endpoint) => {
      debug(`  - ${endpoint.name} (${endpoint.method.toUpperCase()} ${endpoint.path})`)
      router[endpoint.method](endpoint.path, wrapHandler(endpoint.handler, endpoint.model))
    })
  })

  router.meta = meta

  return router
}

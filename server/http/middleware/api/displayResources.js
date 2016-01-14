import exportSchema from 'thinky-export-schema'

export default (resources) =>
  Object.keys(resources).reduce((p, resourceName) => {
    var endpoints = resources[resourceName]
    p[resourceName] = {
      model: exportSchema(endpoints[0].model),
      endpoints: endpoints.map((endpoint) => ({
        name: endpoint.name,
        method: endpoint.method,
        path: endpoint.path
      }))
    }
    return p
  }, {})

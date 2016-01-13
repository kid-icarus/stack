const exportSchema = (schema) =>
  Object.keys(schema).reduce((p, k) => {
    var v = schema[k]
    if (v._schema) {
      p[k] = exportSchema(v._schema)
    } else {
      p[k] = v.constructor.name.replace(/^Type/, '')
    }
    return p
  }, {})

export default (resources) =>
  Object.keys(resources).reduce((p, resourceName) => {
    var endpoints = resources[resourceName]
    p[resourceName] = {
      model: exportSchema(endpoints[0].model._schema._schema),
      endpoints: endpoints.map((endpoint) => ({
        name: endpoint.name,
        method: endpoint.method,
        path: endpoint.path
      }))
    }
    return p
  }, {})

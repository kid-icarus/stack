import exportSchema from 'thinky-export-schema'
import mapValues from 'lodash.mapvalues'
import map from 'lodash.map'

export default (resources) =>
  mapValues(resources, (endpoints) => ({
    model: exportSchema(endpoints[0].model),
    endpoints: map(endpoints, (endpoint) => ({
      name: endpoint.name,
      method: endpoint.method.toUpperCase(),
      path: endpoint.path,
      plural: endpoint.plural
    }))
  })
)

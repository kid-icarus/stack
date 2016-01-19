import exportSchema from 'thinky-export-schema'
import mapValues from 'lodash.mapValues'

export default (resources) =>
  mapValues(resources, (endpoints) => ({
    model: exportSchema(endpoints[0].model),
    endpoints: endpoints.map((endpoint) => ({
      name: endpoint.name,
      method: endpoint.method.toUpperCase(),
      path: endpoint.path,
      plural: endpoint.plural
    }))
  })
)

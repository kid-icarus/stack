import { createAPIAction } from 'tahoe'
import {plural} from 'pluralize'
import {Schema} from 'normalizr'
import template from 'template-url'
import reduce from 'lodash.reduce'

const resourceToActions = (resourceName, resource) => {
  var model = new Schema(resourceName)
  return reduce(resource.endpoints, (prev, endpoint) => {
    prev[endpoint.name] = createAPIAction({
      endpoint: (opt) => template(endpoint.path, opt),
      method: endpoint.method,
      model: model,
      collection: !endpoint.instance,
      credentials: 'include'
    })
    return prev
  }, {})
}

export default (resources) =>
  reduce((resources.toJS ? resources.toJS() : resources), (prev, v, k) => {
    prev[plural(k)] = resourceToActions(k, v)
    return prev
  }, {})

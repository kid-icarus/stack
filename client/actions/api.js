import createAPIAction from 'redux-api-actions'
import {plural} from 'pluralize'
import {Schema} from 'normalizr'
import template from 'template-url'
import _initialState from 'core/store/initialState'
const initialState = _initialState.toJS()

const resourceToActions = (resourceName, resource) => {
  var model = new Schema(resourceName)
  return resource.endpoints.reduce((prev, endpoint) => {
    prev[endpoint.name] = createAPIAction({
      endpoint: (opt) => template(endpoint.path, opt),
      method: endpoint.method,
      model: model,
      collection: endpoint.plural,
      credentials: 'include'
    })
    return prev
  }, {})
}

const actions = Object.keys(initialState.resources).reduce((prev, resourceName) => {
  var resource = initialState.resources[resourceName]
  prev[plural(resourceName)] = resourceToActions(resourceName, resource)
  return prev
}, {})

export default actions

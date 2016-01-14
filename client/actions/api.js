import createAPIAction from 'redux-api-actions'
import {plural} from 'pluralize'
import cap from 'capitalize'
import {Schema} from 'normalizr'
import template from 'template-url'
import initialState from 'core/initialState'

const nameMap = {
  create: (res) => `create${cap(res)}`,
  find: (res) => `find${cap(plural(res))}`,
  findById: (res) => `find${cap(res)}ById`,
  updateById: (res) => `update${cap(res)}ById`,
  replaceById: (res) => `replace${cap(res)}ById`,
  deleteById: (res) => `delete${cap(res)}ById`
}

const actions = Object.keys(initialState.resources).reduce((p, k) => {
  var resource = initialState.resources[k]
  var model = new Schema(k)

  resource.endpoints.forEach((res) => {
    p[nameMap[res.name](k)] = createAPIAction({
      endpoint: (opt) => template(res.path, opt),
      method: res.method,
      model: model,
      credentials: 'include'
    })
  })
  return p
}, {})

export default actions

import { handleActions } from 'redux-actions'
import mapValues from 'lodash.mapvalues'

export function toReducer (moduleName, module) {
  var copy = Object.keys(module).reduce((p, k) => {
    if (k !== 'default') {
      p[`${moduleName}.${k}`] = module[k]
    }
    return p
  }, {})
  return handleActions(copy, module.default)
}

export default (o) =>
  mapValues(o, (v, k) => toReducer(k, v))

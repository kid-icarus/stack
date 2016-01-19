import { handleActions } from 'redux-actions'

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
  Object.keys(o).reduce((p, k) => {
    p[k] = toReducer(k, o[k])
    return p
  }, {})

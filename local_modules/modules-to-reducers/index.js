import { handleActions } from 'redux-actions'
import mapValues from 'lodash.mapvalues'
import mapKeys from 'lodash.mapkeys'
import omit from 'lodash.omit'

export function toReducer (moduleName, mod) {
  if (!mod.__esModule) return mod
  if (typeof mod.default === 'undefined') {
    throw new Error(`Missing initialState export in ${moduleName}`)
  }

  var initialState = mod.default
  var reducerNames = omit(mod, 'default')
  var namespaced = mapKeys(reducerNames, (v, k) => `${moduleName}.${k}`)
  return handleActions(namespaced, initialState)
}

export default (o) =>
  mapValues(o, (v, k) => toReducer(k, v))

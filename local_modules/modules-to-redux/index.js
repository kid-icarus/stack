import { handleActions } from 'redux-actions'
import mapValues from 'lodash.mapvalues'
import mapKeys from 'lodash.mapkeys'
import omit from 'lodash.omit'

export const toReducer = (moduleName, mod) => {
  if (!mod.__esModule) return mod
  if (typeof mod.default === 'undefined') {
    throw new Error(`Missing initialState export in ${moduleName}`)
  }

  var initialState = mod.default
  var reducerNames = omit(mod, 'default')
  var namespaced = mapKeys(reducerNames, (v, k) => `${moduleName}.${k}`)
  return handleActions(namespaced, initialState)
}

export const toReducers = (o) =>
  mapValues(o, (v, k) => toReducer(k, v))

export const toAction = (moduleName, mod) => {
  if (!mod.__esModule) return mod
  var reducerNames = omit(mod, 'default')
  return mapValues(reducerNames, (v, k) => `${moduleName}.${k}`)
}

export const toActions = (o) =>
  mapValues(o, (v, k) => toAction(k, v))

import { handleActions } from 'redux-actions'
import { Map, fromJS } from 'immutable'

const initialCollections = Map()
const initialRequests = Map()

// shallow entity state
const addEntities = (state, { meta, payload }) => {
  if (payload.normalized) {
    return fromJS(payload.normalized.entities).mergeDeep(state)
  }
  return state
}
const updateEntities = (state, { meta, payload }) => {
  if (payload.normalized) {
    return state.mergeDeep(fromJS(payload.normalized.entities))
  }
  return state
}
const removeEntities = (state, { meta, payload }) => {
  // TODO
  if (payload.normalized) {
    return null
  }
  return state
}

// request state
const setResponse = (state, { meta, payload }) => {
  if (meta.requestId) {
    return state.set(meta.requestId, fromJS(payload.raw))
  }
  return state
}
const setResponseError = (state, { meta, payload }) => {
  if (meta.requestId) {
    return state.set(meta.requestId, Map({error: payload}))
  }
  return state
}

// exported actions
export const collections = handleActions({
  'tahoe.success': addEntities,
  'tahoe.realtime.add': addEntities,
  'tahoe.realtime.update': updateEntities,
  'tahoe.realtime.remove': removeEntities
}, initialCollections)

export const requests = handleActions({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError
  // 'tahoe.realtime.add': TODO,
  // 'tahoe.realtime.update': TODO,
  // 'tahoe.realtime.remove': TODO
}, initialRequests)

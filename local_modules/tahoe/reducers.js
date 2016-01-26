import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

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
const insertToResponse = (state, { meta, payload }) => {
  if (meta.requestId) {
    return state.update(meta.requestId, (v) => {
      var raw = fromJS(payload.raw)
      if (List.isList(v)) {
        return v.push(raw)
      }
      return raw
    })
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
  'tahoe.tail.insert': addEntities,
  'tahoe.tail.update': updateEntities,
  // 'tahoe.tail.remove': removeEntities
}, initialCollections)

export const requests = handleActions({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': insertToResponse
  // 'tahoe.realtime.update': TODO,
  // 'tahoe.realtime.remove': TODO
}, initialRequests)

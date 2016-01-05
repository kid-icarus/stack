import { handleActions } from 'redux-actions'
import merge from 'lodash.merge'
const initialState = {}

// shallow entity state
const ESUCCESS = (state, { meta, payload }) => {
  if (payload.normalized) {
    return merge({}, state, payload.normalized.entities)
  }
  return state
}

// request state
const RSUCCESS = (state, { meta, payload }) => {
  if (meta.requestId) {
    return merge({}, state, {[meta.requestId]: payload.raw})
  }
  return state
}

const RFAILURE = (state, { meta, payload }) => {
  // TODO: verify this
  if (meta.requestId) {
    return merge({}, state, {[meta.requestId]: payload})
  }
  return state
}

// exported actions
export const collections = handleActions({
  SUCCESS: ESUCCESS
}, initialState)

export const requests = handleActions({
  SUCCESS: RSUCCESS,
  FAILURE: RFAILURE
}, initialState)

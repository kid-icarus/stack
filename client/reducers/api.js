import { handleActions } from 'redux-actions'
import update from 'update-object'

const initialState = {}

// shallow entity state
const ESUCCESS = (state, { meta, payload }) => {
  if (payload.normalized) {
    return update(state, {$merge: payload.normalized.entities})
  }
  return state
}

// request state
const RSUCCESS = (state, { meta, payload }) => {
  if (meta.requestId) {
    return update(state, {[meta.requestId]: {$set: payload.raw}})
  }
  return state
}

const RFAILURE = (state, { meta, payload }) => {
  // TODO: verify this
  if (meta.requestId) {
    return update(state, {[meta.requestId]: {$set: payload}})
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

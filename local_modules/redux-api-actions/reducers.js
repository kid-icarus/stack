import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

const initialCollections = Immutable.fromJS({})
const initialRequests = Immutable.fromJS({})

// shallow entity state
const ESUCCESS = (state, { meta, payload }) => {
  if (payload.normalized) {
    return state.mergeDeep(Immutable.fromJS(payload.normalized.entities))
  }
  return state
}

// request state
const RSUCCESS = (state, { meta, payload }) => {
  if (meta.cursor) {
    return state.set(meta.cursor, Immutable.fromJS(payload.raw))
  }
  return state
}

const RFAILURE = (state, { meta, payload }) => {
  if (meta.cursor) {
    return state.set(meta.cursor, Immutable.Map({error: payload}))
  }
  return state
}

// exported actions
export const collections = handleActions({
  SUCCESS: ESUCCESS
}, initialCollections)

export const requests = handleActions({
  SUCCESS: RSUCCESS,
  FAILURE: RFAILURE
}, initialRequests)

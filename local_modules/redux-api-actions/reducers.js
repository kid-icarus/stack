import { handleActions } from 'redux-actions'
import u from 'dgaf-updater'

const initialState = {}

// shallow entity state
const ESUCCESS = (state, { meta, payload }) => {
  if (payload.normalized) {
    return u().merge(payload.normalized.entities).run(state)
  }
  return state
}

// request state
const RSUCCESS = (state, { meta, payload }) => {
  if (meta.requestId) {
    return u().set(meta.requestId, payload.raw).run(state)
  }
  return state
}

const RFAILURE = (state, { meta, payload }) => {
  if (meta.requestId) {
    return u().set(meta.requestId, {error: payload}).run(state)
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

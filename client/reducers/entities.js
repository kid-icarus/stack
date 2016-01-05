import { handleActions } from 'redux-actions'
import merge from 'lodash.merge'

const initialState = {}

const SUCCESS = (state, { meta, payload }) => {
  return merge({}, state, payload.normalized.entities)
  /*
  if (meta.dest) {
    return merge({}, state, {[meta.dest]: payload.raw})
  } else {
    return merge({}, state, payload.normalized.entities)
  }
  */
}

const FAILURE = (state, { payload }) => state - payload

export default handleActions({
  SUCCESS,
  FAILURE
}, initialState)

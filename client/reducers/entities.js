import { handleActions } from 'redux-actions'
import merge from 'lodash.merge'

const initialState = {}

const SUCCESS = (state, { meta, payload }) => {
  return merge({}, state, payload.entities)
}

const FAILURE = (state, { payload }) => state - payload

export default handleActions({
  SUCCESS,
  FAILURE
}, initialState)

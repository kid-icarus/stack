import { handleActions } from 'redux-actions'

const initialState = {
  organizations: []
}

const SUCCESS = (state, { payload }) =>
  console.log(state, payload)
  // state[payload.dest] =
const FAILURE = (state, { payload }) => state - payload

export default handleActions({
  SUCCESS,
  FAILURE
}, initialState)

import { handleActions } from 'redux-actions'

const initialState = 1

const incrementCounter = (state, { payload }) => state + payload
const decrementCounter = (state, { payload }) => state - payload

export default handleActions({
  incrementCounter,
  decrementCounter
}, initialState)

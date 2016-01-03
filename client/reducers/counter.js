import { handleActions } from 'redux-actions'

const initialState = 1

const incrementCounter = (state, { payload = 1 }) => state + payload
const decrementCounter = (state, { payload = 1 }) => state - payload

export default handleActions({
  incrementCounter,
  decrementCounter
}, initialState)

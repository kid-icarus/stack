import { handleActions } from 'redux-actions'

const initialState = 1

export const incrementCounter = (state, { payload = 1 }) => state + payload
export const decrementCounter = (state, { payload = 1 }) => state - payload

export default handleActions(exports, initialState)

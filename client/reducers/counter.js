const initialState = 1

export const incrementCounter = (state, { payload = 1 }) => state + payload
export const decrementCounter = (state, { payload = 1 }) => state - payload

export default initialState

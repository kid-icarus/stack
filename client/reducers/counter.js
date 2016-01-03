import { handleActions } from 'redux-actions'

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  ['increment counter']: (state, { payload }) => state + payload
}, 1)

import { handleActions } from 'redux-actions'
import { COUNTER_INCREMENT } from '../constants'

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [COUNTER_INCREMENT]: (state, { payload }) => state + payload
}, 1)

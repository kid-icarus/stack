import { handleActions } from 'redux-actions'

const initialState = []

const addTodo = (state, { payload }) => state.concat([payload])

export default handleActions({
  addTodo
}, initialState)

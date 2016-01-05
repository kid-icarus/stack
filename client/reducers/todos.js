import { handleActions } from 'redux-actions'

const initialState = []

// TODO: unshift
const addTodo = (state, {payload}) => ([{id: Date.now(), text: payload, completed: false}]).concat(state)
const deleteTodo = (state, {payload}) =>
  state.filter(todo =>
    todo.id !== payload.id
  )

export default handleActions({
  addTodo,
  deleteTodo
}, initialState)

import { handleActions } from 'redux-actions'

const initialState = []

// TODO: unshift
const addTodo = (state, {payload}) => ([{id: Date.now(), text: payload, completed: false}]).concat(state)
const deleteTodo = (state, {payload}) =>
  state.filter(todo =>
    todo.id !== payload.id
  )

const toggleTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      todo.completed = !todo.completed
    }

    return todo

  })

export default handleActions({
  addTodo,
  deleteTodo,
  toggleTodo
}, initialState)

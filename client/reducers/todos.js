import { handleActions } from 'redux-actions'
import u from 'dgaf-updater'
const initialState = []

const addTodo = (state, {payload}) =>
  u().unshift({
    id: Date.now(),
    text: payload,
    completed: false
  }).run(state)

const deleteTodo = (state, {payload}) =>
  state.filter(todo =>
    todo.id !== payload.id
  )

const toggleTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      return u().apply('completed', (v) => !v).run(todo)
    }
    return todo
  })

const saveTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      return u().set('text', payload.text).run(todo)
    }
    return todo
  })

export default handleActions({
  addTodo,
  deleteTodo,
  toggleTodo,
  saveTodo
}, initialState)

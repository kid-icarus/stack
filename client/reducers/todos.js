import { handleActions } from 'redux-actions'
import update from 'update-object'

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
      return update(todo, {
        completed: {
          $apply: (v) => !v
        }
      })
    }
    return todo
  })

const saveTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      return update(todo, {
        completed: {
          $set: payload.text
        }
      })
    }
    return todo
  })

export default handleActions({
  addTodo,
  deleteTodo,
  toggleTodo,
  saveTodo
}, initialState)

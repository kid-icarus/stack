import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

const initialState = Immutable.List()

export const addTodo = (state, {payload}) =>
  state.unshift(Immutable.Map({
    id: Date.now(),
    text: payload,
    completed: false
  }))

export const deleteTodo = (state, {payload}) =>
  state.filter(todo => todo.id !== payload.id)

export const toggleTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      return todo.update('completed', (v) => !v)
    }
    return todo
  })

export const saveTodo = (state, {payload}) =>
  state.map(todo => {
    if (todo.id === payload.id) {
      return todo.set('text', payload.text)
    }
    return todo
  })

export default handleActions(exports, initialState)

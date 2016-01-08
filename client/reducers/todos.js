import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import uuid from 'uuid'

const initialState = Immutable.Map()

export const addTodo = (state, {payload}) => {
  let id = uuid.v1()
  return state.set(id, Immutable.Map({
    id: id,
    text: payload,
    completed: false
  }))
}

export const deleteTodo = (state, {payload}) =>
  state.delete(payload.get('id'))

export const toggleTodo = (state, {payload}) =>
  state.updateIn([payload.get('id'), 'completed'], v => !v)

export const saveTodo = (state, {payload}) =>
  state.setIn([payload.get('id'), 'text'], payload.get('text'))

export default handleActions(exports, initialState)

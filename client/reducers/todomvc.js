import Immutable from 'immutable'
import uuid from 'uuid'

const initialState = Immutable.fromJS({
  toggle: false,
  items: {}
})

const Todo = Immutable.Record({
  id: uuid.v1(),
  text: 'New Todo',
  created: Date.now(),
  completed: false
})

export const addTodo = (state, {payload}) => {
  let id = uuid.v1()
  return state.setIn(['items', id], new Todo({
    id: id,
    text: payload
  }))
}

export const deleteTodo = (state, {payload}) =>
  state.deleteIn(['items', payload.get('id')])

export const toggleTodo = (state, {payload}) =>
  state.updateIn(['items', payload.get('id'), 'completed'], v => !v)

export const toggleAllTodos = (state, {payload}) =>
  state.withMutations((s) =>
    s.update('items', v =>
      v.map(i => i.set('completed', !s.get('toggle')))
    ).update('toggle', v => !v)
  )

export const saveTodo = (state, {payload}) =>
  state.setIn(['items', payload.get('id'), 'text'], payload.get('text'))

export const clearCompletedTodos = (state, {payload}) =>
  state.update('items', v =>
    v.filter(i => !i.get('completed'))
  )

export default initialState

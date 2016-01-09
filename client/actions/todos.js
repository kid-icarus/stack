import { createAction } from 'redux-actions'

export const addTodo = createAction('addTodo')
export const deleteTodo = createAction('deleteTodo')
export const toggleTodo = createAction('toggleTodo')
export const saveTodo = createAction('saveTodo')
export const toggleAllTodos = createAction('toggleAllTodos')
export const setTodoFilter = createAction('setTodoFilter')

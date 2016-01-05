import { createAction } from 'redux-actions'
import * as githubActions from 'actions/github'
import * as todosActions from 'actions/todos'

const actions = {
  incrementCounter: createAction('incrementCounter'),
  decrementCounter: createAction('decrementCounter'),
  ...githubActions,
  ...todosActions
}

export default actions

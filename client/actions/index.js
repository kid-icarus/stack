import { createAction } from 'redux-actions'
import * as githubActions from 'actions/github'

const actions = {
  incrementCounter: createAction('incrementCounter'),
  decrementCounter: createAction('decrementCounter'),
  ...githubActions
}

export default actions

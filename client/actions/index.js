import * as counterActions from 'actions/counter'
import * as githubActions from 'actions/github'
import * as todosActions from 'actions/todos'

const actions = {
  ...counterActions,
  ...githubActions,
  ...todosActions
}

export default actions

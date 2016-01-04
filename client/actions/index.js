import * as counterActions from 'actions/counter'
import * as githubActions from 'actions/github'

const actions = {
  ...counterActions,
  ...githubActions
}

export default actions

import { routeActions } from 'redux-simple-router'
import { createActions, bindActions } from 'shasta'
import localActions from 'actions/.lookup'

const actions = createActions({
  ...localActions,
  router: routeActions
})

export default (dispatch) =>
  bindActions(actions, dispatch)

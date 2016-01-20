import { actions as routeActions } from 'shasta-router'
import { createActions, bindActions } from 'shasta'
import createAPIActions from 'redux-sutro'
import localActions from 'actions/.lookup'
import initialState from 'core/store/initialState'

const resources = initialState.get('resources').toJS()

const actions = createActions({
  ...localActions,
  api: createAPIActions(resources),
  router: routeActions
})

export default (dispatch) => bindActions(actions, dispatch)

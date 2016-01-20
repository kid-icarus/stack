import { actions as routeActions } from 'shasta-router'
import { createActions } from 'shasta'
import createAPIActions from 'redux-sutro'
import localActions from 'actions/.lookup'
import initialState from 'core/store/initialState'

export default createActions({
  ...localActions,
  api: createAPIActions(initialState.get('resources')),
  router: routeActions
})

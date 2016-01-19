import { createAction } from 'redux-actions'
import { routeActions } from 'redux-simple-router'
import localActions from 'actions/.lookup'
import mapValues from 'lodash.mapvalues'

// equiv of redux createAction but recursive
const createActionsRecursive = (actions) => {
  if (typeof actions === 'string') return createAction(actions)
  if (typeof actions === 'function') return actions
  return mapValues(actions, createActionsRecursive)
}

// equiv of redux bindActionCreators but recursive
const bindActionCreatorsRecursive = (actions, dispatch) => {
  if (typeof actions === 'function') return (...args) => dispatch(actions(...args))
  return mapValues(actions, (v) => bindActionCreatorsRecursive(v, dispatch))
}

const actions = createActionsRecursive({
  ...localActions,
  router: routeActions
})

export default (dispatch) =>
  bindActionCreatorsRecursive(actions, dispatch)

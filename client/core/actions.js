import { createAction } from 'redux-actions'
import { routeActions } from 'redux-simple-router'
import localActions from 'actions/.lookup'

// equiv of redux createAction but recursive
const createActionsRecursive = (actions) => {
  if (typeof actions === 'string') return createAction(actions)
  if (typeof actions === 'function') return actions
  return Object.keys(actions).reduce((prev, k) => {
    prev[k] = createActionsRecursive(actions[k])
    return prev
  }, {})
}

// equiv of redux bindActionCreators but recursive
const bindActionCreatorsRecursive = (actions, dispatch) => {
  if (typeof actions === 'function') return (...args) => dispatch(actions(...args))
  return Object.keys(actions).reduce((prev, k) => {
    prev[k] = bindActionCreatorsRecursive(actions[k], dispatch)
    return prev
  }, {})
}

const actions = createActionsRecursive({
  ...localActions,
  router: routeActions
})

export default (dispatch) =>
  bindActionCreatorsRecursive(actions, dispatch)

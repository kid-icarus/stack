import { bindActionCreators } from 'redux'
import { createAction } from 'redux-actions'
import { routeActions } from 'redux-simple-router'
import merge from 'lodash.merge'
import localActions from 'actions/.lookup'

// turns string actions into functions
const transformActions = (actions) => {
  if (typeof actions === 'string') return createAction(actions)
  if (typeof actions === 'function') return actions
  return Object.keys(actions).reduce((p, k) => {
    p[k] = transformActions(actions[k])
    return p
  }, {})
}

export default (dispatch) => {
  const localActionFns = Object.keys(localActions).reduce((p, k) => {
    return merge(p, {
      [k]: bindActionCreators(transformActions(localActions[k]), dispatch)
    })
  }, {})

  return {
    ...localActionFns,
    router: bindActionCreators(routeActions, dispatch)
  }
}

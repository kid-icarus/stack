import { bindActionCreators } from 'redux'
import { routeActions } from 'redux-simple-router'
import merge from 'lodash.merge'
import localActions from 'actions/.lookup'

const localActionFns = Object.keys(localActions).reduce((p, k) =>
  merge(p, localActions[k])
, {})

export default (dispatch) => ({
  ...bindActionCreators(localActionFns, dispatch),
  router: bindActionCreators(routeActions, dispatch)
})

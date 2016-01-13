import { bindActionCreators } from 'redux'
import { pushPath } from 'redux-simple-router'
import merge from 'lodash.merge'
import localActions from 'glob-loader!actions/.lookup'

const localActionFns = Object.keys(localActions).reduce((p, k) => {
  return merge(p, localActions[k])
}, {})

const routeActions = {
  push: pushPath
}

export default (dispatch) =>
  ({
    ...bindActionCreators(localActionFns, dispatch),
    router: bindActionCreators(routeActions, dispatch)
  })

import { combineReducers } from 'shasta'
import { routeReducer } from 'redux-simple-router'
import { reducers as apiReducers } from 'tahoe'
import toReducers from 'modules-to-reducers'
import localReducers from 'reducers/.lookup'

export default combineReducers({
  ...apiReducers,
  ...toReducers(localReducers),
  router: routeReducer
})

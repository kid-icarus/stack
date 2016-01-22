import { combineReducers } from 'shasta'
import { reducer as routeReducer } from 'shasta-router'
import { reducers as apiReducers } from 'tahoe'
import { reducer as formReducer } from 'shasta-forms'
import toReducers from 'modules-to-reducers'
import localReducers from 'reducers/.lookup'

export default combineReducers({
  ...apiReducers,
  ...toReducers(localReducers),
  router: routeReducer,
  forms: formReducer
})

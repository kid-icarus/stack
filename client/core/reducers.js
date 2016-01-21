import { fromJS } from 'immutable'
import { combineReducers } from 'shasta'
import { reducer as routeReducer } from 'shasta-router'
import { reducers as apiReducers } from 'tahoe'
import toReducers from 'modules-to-reducers'
import localReducers from 'reducers/.lookup'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  ...apiReducers,
  ...toReducers(localReducers),
  router: routeReducer,
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action))
})

import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from 'reducers/counter'
import github from 'reducers/github'

export default combineReducers({
  counter,
  github,
  router: routeReducer
})

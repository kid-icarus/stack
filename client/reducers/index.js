import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { requests, collections } from 'redux-api-actions/reducers'
import counter from 'reducers/counter'
import todos from 'reducers/todos'

export default combineReducers({
  requests,
  collections,

  counter,
  todos,
  router: routeReducer
})

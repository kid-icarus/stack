import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from 'reducers/counter'
import entities from 'reducers/entities'
import todos from 'reducers/todos'

export default combineReducers({
  counter,
  entities,
  todos,
  router: routeReducer
})

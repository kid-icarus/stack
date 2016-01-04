import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from 'reducers/counter'
import entities from 'reducers/entities'

export default combineReducers({
  counter,
  entities,
  router: routeReducer
})

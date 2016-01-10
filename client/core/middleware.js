import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import storage from './storageEngine'

const middleware = applyMiddleware(
  thunk,
  apiMiddleware,
  storage.middleware,
  createLogger({
    stateTransformer: (state) => state.toJS()
  })
)

export default middleware

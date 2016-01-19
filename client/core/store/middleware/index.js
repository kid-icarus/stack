import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import routerMiddleware from './router'
import storage from '../storageEngine'

export default applyMiddleware(
  thunk,
  routerMiddleware,
  apiMiddleware,
  storage.middleware,
  createLogger({
    stateTransformer: (state) => state.toJS()
  })
)

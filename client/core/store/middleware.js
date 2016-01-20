import { applyMiddleware } from 'shasta'
import thunk from 'redux-thunk'
import logger from 'shasta-logger'
import { middleware as apiMiddleware } from 'tahoe'
import { middleware as routerMiddleware } from 'shasta-router'
import storage from './storageEngine'

export default applyMiddleware(
  thunk,
  routerMiddleware,
  apiMiddleware,
  storage.middleware,
  logger
)

import logger from 'shasta-logger'
import { middleware as apiMiddleware } from 'tahoe'
import { middleware as routerMiddleware } from 'shasta-router'
import storage from './storageEngine'

export default [
  routerMiddleware,
  apiMiddleware,
  storage.middleware,
  logger
]

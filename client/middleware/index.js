import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'

const middleware = applyMiddleware(
  thunk,
  apiMiddleware,
  createLogger()
)

export default middleware

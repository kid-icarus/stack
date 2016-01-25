import { apiMiddleware } from 'redux-api-middleware'
import createAction from './lib/createAction'
import * as reducers from './reducers'

export default {
  createAction,
  reducers: reducers,
  middleware: apiMiddleware
}

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'

import rootReducer from 'reducers'
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore (initialState) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(
    thunk,
    apiMiddleware,
    createLogger()
  )
  const batching = batchedSubscribe(batchedUpdates)

  if (window.devToolsExtension) {
    createStoreWithMiddleware = compose(
      middleware,
      batching,
      window.devToolsExtension()
    )
  } else {
    createStoreWithMiddleware = compose(
      middleware,
      batching
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer,
    initialState
  )

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

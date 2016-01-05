import middleware from 'middleware'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import rootReducer from 'reducers'
import { compose, createStore } from 'redux'

export default function configureStore (initialState) {
  let createStoreWithMiddleware
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
      const nextRoot = require('reducers')
      store.replaceReducer(nextRoot)
    })
  }

  return store
}

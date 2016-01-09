import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import { syncReduxAndRouter } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import { compose, createStore } from 'redux'

import rootReducer from './reducers'
import middleware from './middleware'

export function configureStore (initialState) {
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
    Immutable.fromJS(initialState || {})
  )

  syncReduxAndRouter(browserHistory, store, (state) => state.get('router'))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRoot = require('./reducers')
      store.replaceReducer(nextRoot)
    })
  }

  return store
}

export default configureStore(window.__INITIAL_STATE__)

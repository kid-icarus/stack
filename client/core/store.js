import { syncReduxAndRouter } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import { compose, createStore } from 'redux'
import storage from './storageEngine'
import rootReducer from './reducers'
import middleware from './middleware'

export function configureStore (initialState) {
  var createStoreWithMiddleware = compose(
    middleware,
    window.devToolsExtension
      ? window.devToolsExtension()
      : undefined
  )

  const store = createStoreWithMiddleware(createStore)(
    storage.reducer(rootReducer),
    Immutable.fromJS(initialState || {})
  )

  syncReduxAndRouter(browserHistory, store, (state) => state.get('router'))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRoot = require('./reducers')
      store.replaceReducer(nextRoot)
    })
  }

  storage.load(store)

  return store
}

export default configureStore(window.__INITIAL_STATE__)

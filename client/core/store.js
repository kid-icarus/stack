import Immutable from 'immutable'
import { compose, createStore } from 'redux'
import storage from './storageEngine'
import rootReducer from './reducers'
import middleware from './middleware'
import routerMiddleware from './middleware/router'
import initialState from './initialState'

export function configureStore (initialState) {
  var createStoreWithMiddleware = compose(
    middleware,
    window.devToolsExtension
      ? window.devToolsExtension()
      : undefined
  )

  const store = createStoreWithMiddleware(createStore)(
    storage.reducer(rootReducer),
    Immutable.fromJS(initialState)
  )
  storage.load(store)

  routerMiddleware.listenForReplays(store, (state) => state.get('router'))

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRoot = require('./reducers')
      store.replaceReducer(nextRoot)
    })
  }

  return store
}

export default configureStore(initialState)

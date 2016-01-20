import { compose, createStore } from 'shasta'
import { listenForReplays } from 'shasta-router'
import storage from './storageEngine'
import rootReducer from '../reducers'
import middleware from './middleware'
import initialState from './initialState'

const devtools = window.devToolsExtension
  ? window.devToolsExtension()
  : undefined

const hotReload = (store) => {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRoot = require('../reducers')
      store.replaceReducer(nextRoot)
    })
  }
}

export function configureStore (initialState) {
  var createStoreWithMiddleware = compose(
    middleware,
    devtools
  )

  const store = createStoreWithMiddleware(createStore)(
    storage.reducer(rootReducer),
    initialState
  )
  storage.load(store)
  listenForReplays(store)
  hotReload(store)

  return store
}

export default configureStore(initialState)

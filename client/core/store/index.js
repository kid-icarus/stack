import { createStore } from 'shasta'
import { listenForReplays } from 'shasta-router'
import storage from './storageEngine'
import rootReducer from '../reducers'
import middleware from './middleware'
import initialState from './initialState'

const hotReload = (store) => {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRoot = require('../reducers')
      store.replaceReducer(nextRoot)
    })
  }
}

export function configureStore (initialState) {
  const store = createStore({
    middleware: middleware,
    reducer: storage.reducer(rootReducer),
    initialState: initialState
  })
  storage.load(store)
  listenForReplays(store)
  hotReload(store)

  return store
}

export default configureStore(initialState)

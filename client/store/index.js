import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore (initialState) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(thunk)

  if (window.devToolsExtension && __DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )
  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

const devtools = window.devToolsExtension
  ? window.devToolsExtension()
  : undefined

export default ({middleware, reducer, initialState}) => {
  const applied = applyMiddleware(thunk, ...middleware)

  return compose(applied, devtools)(createStore)(
    reducer,
    initialState
  )
}

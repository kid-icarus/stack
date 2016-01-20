import createLogger from 'redux-logger'

export default createLogger({
  stateTransformer: (state) =>
    state.toJS ? state.toJS() : state
})

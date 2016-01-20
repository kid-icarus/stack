export default (store) => {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRoot = require('../reducers')
      store.replaceReducer(nextRoot)
    })
  }
}

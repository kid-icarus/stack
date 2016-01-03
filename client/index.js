import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from 'routes'
import Root from 'views/Root'
import configureStore from 'store'
import React from 'react'

const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(browserHistory, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} routes={routes} store={store} />,
  document.getElementById('root')
)

import ReactDOM from 'react-dom'
import { syncReduxAndRouter } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import React from 'react-native-web'

const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(browserHistory, store, (state) => state.router)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} routes={routes} store={store} />,
  document.getElementById('root')
)

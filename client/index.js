import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import routes from 'routes'
import Root from 'views/Root'
import store from 'core/store'
import React from 'react'
import 'font-awesome-sass-loader'

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} routes={routes} store={store} />,
  document.getElementById('root')
)

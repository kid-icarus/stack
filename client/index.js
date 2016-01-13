import fixHash from 'remove-fb-hash'
fixHash()

import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import Root from 'views/Root'
import React from 'react'

import store from 'core/store'
import routes from 'routes'

// Render the React application to the DOM
ReactDOM.render(
  <Root
    history={browserHistory}
    routes={routes}
    store={store} />,
  document.getElementById('root')
)

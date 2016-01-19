import fixHash from 'remove-fb-hash'
import DOM from 'react-dom'
import { browserHistory } from 'react-router'
import React from 'react'
import routes from 'routes'
import store from 'core/store'
import Root from 'views/Root'

fixHash()
DOM.render(
  <Root
    history={browserHistory}
    routes={routes}
    store={store} />,
  document.getElementById('root')
)

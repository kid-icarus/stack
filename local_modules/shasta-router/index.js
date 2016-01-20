import { routeActions, syncHistory } from 'redux-simple-router'
import {
  browserHistory,
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect
} from 'react-router'

const builtins = {
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect
}

const middleware = syncHistory(browserHistory)
const getRouterState = (state) => state.get('router')

export default {
  ...builtins,
  actions: routeActions,
  middleware: middleware,
  listenForReplays: (store) =>
    middleware.listenForReplays(store, getRouterState)
}

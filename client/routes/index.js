import React from 'react-native-web'
import { Route, IndexRoute } from 'react-router'
import HomeView from 'views/HomeView'
import AboutView from 'views/AboutView'

export default (
  <Route path='/'>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
  </Route>
)

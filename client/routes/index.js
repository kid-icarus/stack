import React from 'react'
import { Route, IndexRoute } from 'react-router'
import HomeView from 'views/Home'
import AboutView from 'views/About'

export default (
  <Route path='/'>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
  </Route>
)

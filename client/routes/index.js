import React from 'react'
import { Route, IndexRoute } from 'shasta-router'
import HomeView from 'views/Home'
import AboutView from 'views/About'
import TodosView from 'views/Todos'
import CRMView from 'views/CRM'
import PeopleList from 'views/CRM/PeopleList'
import PersonProfile from 'views/CRM/PersonProfile'
import SavePerson from 'views/CRM/SavePerson'
import NotFoundView from 'views/NotFound'

export default (
  <Route path='/'>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/todos' component={TodosView} />
    <Route path='/todos/:filter' component={TodosView} />
    <Route component={CRMView}>
      <Route path='/crm' component={PeopleList} />
      <Route path='/crm/person/:id' component={PersonProfile} />
      <Route path='/crm/create' component={SavePerson} />
      <Route path='/crm/edit/:id' component={SavePerson} />
    </Route>
    <Route path='*' component={NotFoundView}/>
  </Route>
)

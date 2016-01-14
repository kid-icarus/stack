import React from 'react'
import { Link } from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import {Button, Icon} from 'react-semantify'
// import jif from 'jif'
import './index.sass'

export class PeopleList extends Component {
  static propTypes = {
    people: IPropTypes.Map.isRequired
  };
  static cursors = {
    people: 'people'
  };

  filterPeople (e) {
    this.actions.filterPeople(e.target.value)
  }

  render () {
    return (

      <div>

        {/* Nav */}
        <div className='nav'>

          <div className='ui search'>
            <div className='ui icon input'>
              <input
                className='prompt'
                placeholder='Search People'
                onKeyDown={this.filterPeople}
                type = 'text' />
              <i className='search icon' />
            </div>
            <div className='results'></div>
          </div>

          <Button className='icon filterUsers'><Icon className='filter' /></Button>
          <Button className='icon'><Icon className='add' /></Button>
        </div>

        {/* List */}
        <div className='ui middle aligned divided list'>
          {
            this.props.people.map((person, id) =>
              <Link to={`/crm/${person.get('id')}`} className='item' key={id}>
                <img className='ui avatar image' src={person.get('smallImage')} />
                <div className='content'>
                  <div className='header'>{person.get('name')}</div>
                </div>
                <div className='right floated badges middle aligned'>
                  $$
                </div>
              </Link>
            ).toArray()
          }
        </div>
      </div>
    )
  }
}

export default Component.connect(PeopleList, require('core/actions'))

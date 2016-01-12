import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import {Button, Icon} from 'react-semantify'
import jif from 'jif'
import './index.sass'
import PeopleList from './PeopleList'
import PersonProfile from './PersonProfile'


export class CRMView extends Component {
  static propTypes = {
    people: IPropTypes.Map.isRequired,
    params: PropTypes.object
  };
  static defaultState = {
    name: 'funkytek'
  };
  static cursors = {
    people: 'people'
  };

  filterPeople (e) {
    this.actions.filterPeople(e.target.value)
  }

  render () {
    let uid = this.props.params.person
    return (
      <div className='crm'>

        {/* People */}
        <div className='people'>
          {
            (uid) ? <PersonProfile person={this.props.people.get(uid)} /> : <PeopleList />
          }
        </div>
        {/* Messages */}
        <div className='messages'>
          <h2>Group</h2>
          <div className='ui form'>
            <div className='field'>
              <label>Message</label>
              <textarea></textarea>
            </div>
            <Button className='primary'>Send</Button>
          </div>
        </div>

        {/* Drop */}
        <div className='drop'>
          <h2>Content</h2>
          <div className=''>
            <iframe width='100%' height='215' src='https://www.youtube.com/embed/AgbpWQCOm6I' frameBorder='0' allowFullScreen></iframe>
            <iframe width='100%' height='215' src='https://www.youtube.com/embed/2Sut_KgDTHg' frameBorder='0' allowFullScreen></iframe>
            <iframe width='100%' height='250' scrolling='no' frameBorder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/235150744&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>
          </div>
        </div>

      </div>
    )
  }
}

export default Component.connect(CRMView, require('core/actions'))

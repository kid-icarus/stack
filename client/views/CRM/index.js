import React from 'react'
import { Link } from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import {Button, Icon} from 'react-semantify'
import './index.sass'

export class CRMView extends Component {
  static propTypes = {
    people: IPropTypes.Map.isRequired
  };
  static defaultState = {
    name: 'funkytek'
  };
  static cursors = {
    people: 'people'
  };

  render () {
    return (
      <div className='crm'>

        {/* People */}
        <div className='people'>

          {/* Nav */}
          <div className='nav'>

            <div className='ui search'>
              <div className='ui icon input'>
                <input placeholder='Search People' className='prompt' type = 'text' />
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
              this.props.people.toArray().map((person) =>
                <Link to={`/crm/${person.get('id')}`} className='item' key={person.get('id')}>
                  <img className='ui avatar image' src={person.get('img')} />
                  <div className='content'>
                    <div className='header'>{person.get('name')}</div>
                  </div>
                  <div className='right floated badges middle aligned'>
                    $$
                  </div>
                </Link>
              )
            }
          </div>
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

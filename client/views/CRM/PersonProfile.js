import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import {Button, Icon} from 'react-semantify'
import jif from 'jif'
import './index.sass'

export class PersonProfile extends Component {
  static propTypes = {
    params: PropTypes.object,
    person: IPropTypes.Map.required
  };

  render () {
    let person = this.props.person.toJS()
    return (
      <div className='profile'>

        <div className='ui card'>
          <div className='image'>
            <img src={person.img} />
          </div>
          <div className='content'>
            <a className='header'>{person.name}</a>
            <div className='meta'>
              <span className='date'>Joined in 2013</span>
            </div>
            <div className='description'>
              Kristy is an art director living in New York.
            </div>
          </div>
          <div className='extra content'>
            <a>
              <i className='user icon'></i>
              22 Friends
            </a>
          </div>
        </div>

      </div>
    )
  }
}

export default Component.connect(PersonProfile, require('core/actions'))

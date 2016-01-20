import React, {PropTypes} from 'react'
// import { Link } from 'react-router'
// import IPropTypes from 'immutable-props'
import Component from 'shasta'
// import {Button, Icon} from 'react-semantify'
// import jif from 'jif'
import './index.sass'

export class PersonProfile extends Component {
  static propTypes = {
    params: PropTypes.object
  };
  static cursors = {
    people: 'people'
  };

  getModel (cursor, idName = 'id') {
    return this.props[cursor].get(this.props.params[idName])
  }

  render () {
    let person = this.getModel('people')
    return (

      <div>{person.get('name')}</div>
    )
  }
}

export default Component.connect(PersonProfile, require('core/actions'))

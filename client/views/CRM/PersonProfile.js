import React from 'react'
import {Component, PropTypes} from 'shasta'
import './index.sass'

class PersonProfile extends Component {
  static propTypes = {
    params: PropTypes.object
  };
  static storeProps = {
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

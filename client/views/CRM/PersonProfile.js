import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import {Button, Icon} from 'react-semantify'
import jif from 'jif'
import './index.sass'

export class PersonProfile extends Component {
  static propTypes = {
    params: PropTypes.object
  };

  componentDidMount() {
    console.log('did mount')
    console.log(this.props.params)
  }

  render () {
    return (
      <div>d</div>
    )
  }
}

export default Component.connect(PersonProfile, require('core/actions'))

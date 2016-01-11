import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import {Button, Search, Icon, Popup} from 'react-semantify'
import './index.sass'

export class CRMView extends Component {
  static propTypes = {
    counter: React.PropTypes.number
  };
  static defaultState = {
    name: 'funkytek'
  };
  static cursors = {
    counter: 'counter'
  };
  render () {
    return (
      <div className='crm'>
        <div className='col'>
          <div className='nav'>
            <Search>
              <input placeholder='Search People' className='prompt' type = 'text' />
              <div className='results' />
            </Search>
            <Button className='icon filterUsers'><Icon className='filter' /></Button>
            <Popup className='filterUsers'>OH HI IM A POPUP</Popup>
            <Button className='icon'><Icon className='add' /></Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Component.connect(CRMView, require('core/actions'))

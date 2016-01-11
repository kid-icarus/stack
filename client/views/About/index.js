import { Link } from 'react-router'
import {Header} from 'react-semantify'
import Component from 'redux-dgaf'
import React from 'react'
import './index.sass'

export class AboutView extends Component {
  static displayName = 'AboutView';
  render () {
    return (
      <div className='about-view'>
        <Header>This is the about view!</Header>
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default Component.connect(AboutView, require('core/actions'))

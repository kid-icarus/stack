import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import {Button, Header} from 'react-semantify'
import GH from './GH'
import './index.sass'

export class HomeView extends Component {
  static displayName = 'HomeView';
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
      <div className='home-view'>
        <Icon glyph='fort-awesome' className='star-icon'/>
        <Header>FactoryX Stack Test Page</Header>
        <div>
          Sample Counter:
          <Header className='counter'>{this.props.counter}</Header>
        </div>
        <div className='buttons'>
          <Button onClick={shield(this.actions.incrementCounter)} className='action-button'>
            Increment
          </Button>
          <Button onClick={shield(this.actions.decrementCounter)} className='action-button'>
            Decrement
          </Button>
        </div>
        <GH name={this.state.name}/>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(HomeView, require('core/actions'))

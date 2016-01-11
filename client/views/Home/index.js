import React from 'react'
import { Link } from 'react-router'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import {Button, Header, Icon, Label} from 'react-semantify'
import GH from './GH'
import './index.sass'

export class HomeView extends Component {
  static displayName = 'HomeView';
  static propTypes = {
    counter: React.PropTypes.number
  };
  static defaultState = {
    name: 'tj'
  };
  static cursors = {
    counter: 'counter'
  };
  render () {
    return (
      <div className='home-view'>
        <Icon className='plane header-icon' />
        <Header>FactoryX Stack Test Page</Header>
        <div>
          <Label>Sample Counter</Label>
          <Header className='counter'>{this.props.counter}</Header>
        </div>
        <div className='buttons'>
          <Button color='green' onClick={shield(this.actions.incrementCounter)}>
            Increment
          </Button>
          <Button color='red' onClick={shield(this.actions.decrementCounter)}>
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

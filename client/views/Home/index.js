import React from 'react'
import { Link } from 'react-router'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import {
  Button, Header, Icon,
  Grid, Row, Column
} from 'react-semantify'
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
      <Grid className='relaxed home-view centered divided'>
        <Row>
          <Column className='five wide center aligned'>
            <Icon className='trophy huge' />
            <Header>Stack Test Page</Header>
            <Header className='counter'>{this.props.counter}</Header>
            <div className='ui buttons'>
              <Button color='green' className='medium' onClick={shield(this.actions.incrementCounter)}>
                Increment
              </Button>
              <div className='or'/>
              <Button color='red' className='medium' onClick={shield(this.actions.decrementCounter)}>
                Decrement
              </Button>
            </div>
          </Column>
        </Row>
        <Row>
          <GH name={this.state.name}/>
        </Row>
        <Row>
          <Link to='/about'>Go To About View</Link>
        </Row>
      </Grid>
    )
  }
}

export default Component.connect(HomeView, require('core/actions'))

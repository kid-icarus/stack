import React, {PropTypes} from 'react'
import IPropTypes from 'immutable-props'
import { Link } from 'react-router'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import jif from 'jif'
import DocumentMeta from 'react-document-meta'
import {
  Button, Header, Icon,
  Grid, Row, Column,
  Menu, Item
} from 'react-semantify'
import GH from './GH'
import './index.sass'

export class HomeView extends Component {
  static displayName = 'HomeView';
  static propTypes = {
    counter: PropTypes.number,
    me: IPropTypes.Map
  };
  static defaultState = {
    name: 'tj'
  };
  static cursors = {
    counter: 'counter',
    me: 'me'
  };
  render () {
    return (
      <Grid className='relaxed home-view centered'>
        <DocumentMeta title='Home' />
        <Menu className='top attached'>
          <Item className='left aligned category search'>
            <div className='ui transparent icon input'>
              <input className='prompt' type='text' placeholder='Search animals...'/>
              <Icon className='search link'/>
            </div>
          </Item>
          <Item className='right'>
            {
              jif(!this.props.me, () =>
                <a className='ui button primary' href='/auth/facebook/start'>
                  Sign In
                </a>
              )
            }
            {
              jif(this.props.me, () =>
                <a className='ui button' href='/auth/logout'>
                  Sign out
                </a>
              )
            }
          </Item>
        </Menu>
        <Row>
          <Column className='center aligned'>
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

import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import classes from './index.sass'
import GH from './GH'

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
      <div className={classes.home}>
        <Icon glyph='fort-awesome' className={classes.starIcon}/>
        <Title>FactoryX Stack Test Page</Title>
        <div>
          Sample Counter:
          <Title className={classes.counter}>{this.props.counter}</Title>
        </div>
        <div className={classes.buttons}>
          <button onClick={shield(this.$actions.incrementCounter)} className={classes.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.$actions.decrementCounter)} className={classes.actionButton}>
            Decrement
          </button>
        </div>
        <GH name={this.state.name}/>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(HomeView, require('core/actions'))

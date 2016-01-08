import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import classes from './index.sass'
import GH from './GH'

export class HomeView extends Component {
  render () {
    var name = 'funkytek'
    return (
      <div className={classes.home}>
        <Icon glyph='fort-awesome' className={classes.starIcon}/>
        <Title>FactoryX Stack Test Page</Title>
        <div>
          Sample Counter:
          <Title className={classes.counter}>{this.$state.get('counter')}</Title>
        </div>
        <div className={classes.buttons}>
          <button onClick={shield(this.$actions.incrementCounter)} className={classes.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.$actions.decrementCounter)} className={classes.actionButton}>
            Decrement
          </button>
        </div>
        <GH name={name}/>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(HomeView, require('actions'))

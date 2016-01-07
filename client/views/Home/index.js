import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import actions from 'actions'
import style from './style.sass'
import GH from './GH'

export class HomeView extends Component {
  render () {
    var name = 'funkytek'
    return (
      <div className={style.home}>
        <Icon glyph='fort-awesome' className={style.starIcon}/>
        <Title>FactoryX Stack Test Page</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{this.rootState.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(this.actions.incrementCounter)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.actions.decrementCounter)} className={style.actionButton}>
            Decrement
          </button>
        </div>
        <GH name={name}/>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(actions, HomeView)

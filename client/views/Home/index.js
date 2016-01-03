import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'lib/shield'
import * as counterActions from 'actions/counter'
import Title from 'components/Title'
import style from './style.scss'

const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    double: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
    zero: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className={style.home}>
        <Icon glyph='star'/>
        <Title>Welcome to the React Redux Starter Kit</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{this.props.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(this.props.increment)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.props.decrement)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={shield(this.props.double)} className={style.actionButton}>
            Double
          </button>
          <button onClick={shield(this.props.zero)} className={style.actionButton}>
            Zero (Hose)
          </button>
        </div>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as counterActions from 'actions/counter'
import Title from 'components/Title'
import Icon from 'react-icon'
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
          <button onClick={() => this.props.increment(1)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={() => this.props.decrement(1)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={this.props.double} className={style.actionButton}>
            Double
          </button>
          <button onClick={this.props.zero} className={style.actionButton}>
            Zero (Hose)
          </button>
        </div>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)

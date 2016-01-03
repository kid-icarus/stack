import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as counterActions from 'actions/counter'
import Title from 'components/Title'
import styles from './style.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className={styles.home}>
        <Title>Welcome to the React Redux Starter Kit</Title>
        <div>
          Sample Counter:&nbsp;
          <Title className={styles.counter}>{this.props.counter}</Title>
        </div>
        <button onClick={() => this.props.increment(1)}>
          Increment
        </button>
        <button onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)

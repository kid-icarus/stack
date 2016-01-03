import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'lib/shield'
import * as counterActions from 'actions/counter'
import * as githubActions from 'actions/github'
import Title from 'components/Title'
import style from './style.scss'

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...counterActions,
    ...githubActions
  }, dispatch)
})

export class HomeView extends React.Component {
  static propTypes = {
    state: PropTypes.shape({
      github: PropTypes.shape({
        organizations: PropTypes.array.isRequired
      }),
      counter: PropTypes.number.isRequired
    }),
    actions: PropTypes.shape({
      double: PropTypes.func.isRequired,
      increment: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      zero: PropTypes.func.isRequired,
      getOrgs: PropTypes.func.isRequired
    })
  }

  render () {
    return (
      <div className={style.home}>
        <Icon glyph='star'/>
        <Title>Welcome to the React Redux Starter Kit</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{this.props.state.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(this.props.actions.increment)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.props.actions.decrement)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={shield(this.props.actions.double)} className={style.actionButton}>
            Double
          </button>
          <button onClick={shield(this.props.actions.zero)} className={style.actionButton}>
            Zero (Hose)
          </button>
          <button onClick={shield(this.props.actions.getOrgs)} className={style.actionButton}>
            Get Orgs
          </button>
        </div>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

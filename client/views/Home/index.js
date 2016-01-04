import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'lib/shield'
import Component from 'lib/Component'
import Title from 'components/Title'
import style from './style.scss'

export class HomeView extends Component {
  render () {
    let store = this.store()
    let actions = this.actions()

    return (
      <div className={style.home}>
        <Icon glyph='star'/>
        <Title>Welcome to the React Redux Starter Kit</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{store.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(actions.increment)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(actions.decrement)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={shield(actions.double)} className={style.actionButton}>
            Double
          </button>
          <button onClick={shield(actions.zero)} className={style.actionButton}>
            Zero (Hose)
          </button>
          <button onClick={shield(actions.getOrgs)} className={style.actionButton}>
            Get Orgs
          </button>
        </div>
        <ul className={style.repoList}>
          {
            this.entities('organization').map((id) =>
              <li className={style.repo} key={id}>{this.entity('organization', id).login}</li>
            )
          }
        </ul>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(HomeView)

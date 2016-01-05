import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.scss'
import actions from 'actions'

export class HomeView extends Component {
  getData (name) {
    var opt = { user: name }
    this.getActions().getOrganizations({options: opt})
    this.getActions().getRepositories({options: opt})
    this.getActions().getUser({options: opt})
  }

  render () {
    var name = 'funkytek'
    var store = this.getStore()
    var actions = this.getActions()
    var orgs = this.getCollection('organization')
    var repos = this.getCollection('repository')
    var user = this.getCollection('user').filter(({login}) => login === name)[0]
    var fetching = !orgs.length || !repos.length || !user

    return (
      <div className={style.home}>
        <Icon glyph='star'/>
        <Title>FactoryX Stack Test Page</Title>
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
          <button onClick={this.getData.bind(this, name)} className={style.actionButton}>
            Get GH Data
          </button>
        </div>
        <div className={style.githubData}>
          {
            fetching ? (<Title>No GH Data</Title>) : (
              <div>
                <div className={style.list}>
                  <Title>User Info</Title>
                  <img src={user.avatar_url} className={style.userImage}/>
                  <div className={style.listItem}>{user.name}</div>
                </div>
                <ul className={style.list}>
                  <Title>{orgs.length} organizations</Title>
                  {
                    orgs.map((org) =>
                      <li className={style.listItem} key={org.id}>{org.login}</li>
                    )
                  }
                </ul>
                <ul className={style.list}>
                  <Title>{repos.length} repositories</Title>
                  {
                    repos.map((repo) =>
                      <li className={style.listItem} key={repo.id}>{repo.full_name} - Issues: {repo.open_issues}</li>
                    )
                  }
                </ul>
              </div>
            )
          }
        </div>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(actions, HomeView)

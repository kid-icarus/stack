import React, {PropTypes} from 'react'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.sass'
import actions from 'actions'

export class HomeView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  getData (name) {
    var opt = { user: name }
    this.actions.getOrganizations({options: opt, requestId: 'orgs'})
    this.actions.getRepositories({options: opt, requestId: 'repos'})
    this.actions.getUser({options: opt, requestId: 'user'})
  }

  componentWillMount () {
    this.getData(this.props.name)
  }

  getDataView () {
    var orgs = this.rootState.requests.orgs
    var repos = this.rootState.requests.repos
    var user = this.rootState.requests.user
    return (
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
            repos.map(repo =>
              <li className={style.listItem} key={repo.id}>{repo.full_name} - Issues: {repo.open_issues}</li>
            )
          }
        </ul>
      </div>
    )
  }

  isFetching () {
    var orgs = this.rootState.requests.orgs
    var repos = this.rootState.requests.repos
    var user = this.rootState.requests.user
    return !orgs || !repos || !user
  }

  isErrored () {
    var orgs = this.rootState.requests.orgs
    var repos = this.rootState.requests.repos
    var user = this.rootState.requests.user
    return !this.isFetching() && (!!orgs.error || !!repos.error || !!user.error)
  }

  render () {
    var errorView = <Title>Failed to Load</Title>
    var loadingView = <Title>Loading...</Title>
    return (
      <div className={style.githubData}>
        {
          this.isFetching() ? loadingView : (this.isErrored() ? errorView : this.getDataView())
        }
      </div>
    )
  }
}

export default Component.connect(actions, HomeView)

import React, {PropTypes} from 'react'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.sass'
import actionsMeta from 'actions'

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
    var orgs = this.$state.requests.get('orgs')
    var repos = this.$state.requests.get('repos')
    var user = this.$state.requests.get('user')
    return (
      <div>
        <div className={style.list}>
          <Title>User Info</Title>
          <img src={user.get('avatar_url')} className={style.userImage}/>
          <div className={style.listItem}>{user.get('name')}</div>
        </div>
        <ul className={style.list}>
          <Title>{orgs.size} organizations</Title>
          {
            orgs.map((org) =>
              <li className={style.listItem} key={org.get('id')}>
                {org.get('login')}
              </li>
            )
          }
        </ul>
        <ul className={style.list}>
          <Title>{repos.size} repositories</Title>
          {
            repos.map(repo =>
              <li className={style.listItem} key={repo.get('id')}>
                {repo.get('full_name')} - Issues: {repo.get('open_issues')}
              </li>
            )
          }
        </ul>
      </div>
    )
  }

  isFetching () {
    return !(
      this.$state.requests.has('orgs') &&
      this.$state.requests.has('repos') &&
      this.$state.requests.has('user')
    )
  }

  isErrored () {
    return !this.isFetching() && (
      this.$state.requests.hasIn(['orgs', 'error']) ||
      this.$state.requests.hasIn(['repo', 'error']) ||
      this.$state.requests.hasIn(['user', 'error'])
    )
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

export default Component.connect(actionsMeta, HomeView)

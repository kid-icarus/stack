import React, {PropTypes} from 'react'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import classes from './index.sass'
import actionsMeta from 'actions'

export class HomeView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  getData (name) {
    var opt = { user: name }
    this.$actions.getOrganizations({options: opt, requestId: 'orgs'})
    this.$actions.getRepositories({options: opt, requestId: 'repos'})
    this.$actions.getUser({options: opt, requestId: 'user'})
  }

  componentWillMount () {
    this.getData(this.props.name)
  }

  isFetching () {
    return !(
      this.$requests.has('orgs') &&
      this.$requests.has('repos') &&
      this.$requests.has('user')
    )
  }

  isErrored () {
    return !this.isFetching() && (
      this.$requests.hasIn(['orgs', 'error']) ||
      this.$requests.hasIn(['repo', 'error']) ||
      this.$requests.hasIn(['user', 'error'])
    )
  }

  getDataView () {
    var orgs = this.$requests.get('orgs')
    var repos = this.$requests.get('repos')
    var user = this.$requests.get('user')

    return (
      <div>
        <div className={classes.list}>
          <Title>User Info</Title>
          <img src={user.get('avatar_url')} className={classes.userImage}/>
          <div className={classes.listItem}>{user.get('name')}</div>
        </div>
        <ul className={classes.list}>
          <Title>{orgs.size} organizations</Title>
          {
            orgs.map((org, id) =>
              <li className={classes.listItem} key={id}>
                {org.get('login')}
              </li>
            )
          }
        </ul>
        <ul className={classes.list}>
          <Title>{repos.size} repositories</Title>
          {
            repos.map((repo, id) =>
              <li className={classes.listItem} key={id}>
                {repo.get('full_name')} - Issues: {repo.get('open_issues')}
              </li>
            )
          }
        </ul>
      </div>
    )
  }

  render () {
    var errorView = <Title>Failed to Load</Title>
    var loadingView = <Title>Loading...</Title>
    return (
      <div className={classes.githubData}>
        {
          this.isFetching() ? loadingView : (this.isErrored() ? errorView : this.getDataView())
        }
      </div>
    )
  }
}

export default Component.connect(actionsMeta, HomeView)

import React, {PropTypes} from 'react'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import classes from './index.sass'

export class GHView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    orgs: PropTypes.object,
    repos: PropTypes.object,
    user: PropTypes.object
  };
  static cursors = {
    orgs: 'requests.orgs',
    repos: 'requests.repos',
    user: 'requests.user'
  };

  getData (name) {
    var opt = { user: name }
    this.$actions.getOrganizations({options: opt, cursor: 'orgs'})
    this.$actions.getRepositories({options: opt, cursor: 'repos'})
    this.$actions.getUser({options: opt, cursor: 'user'})
  }

  componentWillMount () {
    this.getData(this.props.name)
  }

  isFetching () {
    return !this.props.orgs || !this.props.repos || !this.props.user
  }

  isErrored () {
    return !this.isFetching() && (
      this.props.orgs.has('error') ||
      this.props.repos.has('error') ||
      this.props.user.has('error')
    )
  }

  getDataView () {
    return (
      <div>
        <div className={classes.list}>
          <Title>User Info</Title>
          <img src={this.props.user.get('avatar_url')} className={classes.userImage}/>
          <div className={classes.listItem}>{this.props.user.get('name')}</div>
        </div>
        <ul className={classes.list}>
          <Title>{this.props.orgs.size} organizations</Title>
          {
            this.props.orgs.map((org, id) =>
              <li className={classes.listItem} key={id}>
                {org.get('login')}
              </li>
            )
          }
        </ul>
        <ul className={classes.list}>
          <Title>{this.props.repos.size} repositories</Title>
          {
            this.props.repos.map((repo, id) =>
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

export default Component.connect(GHView, require('core/actions'))

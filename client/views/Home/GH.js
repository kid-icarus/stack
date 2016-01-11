import React, {PropTypes} from 'react'
import {List, Header} from 'react-semantify'
import Component from 'redux-dgaf'
import IPropTypes from 'immutable-props'
import './index.sass'

export class GHView extends Component {
  static displayName = 'GHView';
  static propTypes = {
    name: PropTypes.string.isRequired,
    orgs: IPropTypes.List,
    repos: IPropTypes.List,
    user: IPropTypes.Map
  };
  static cursors = {
    orgs: 'requests.orgs',
    repos: 'requests.repos',
    user: 'requests.user'
  };

  getData (name) {
    var opt = { user: name }
    if (this.isFetching() || this.isErrored()) {
      this.actions.getOrganizations({options: opt, cursor: 'orgs'})
      this.actions.getRepositories({options: opt, cursor: 'repos'})
      this.actions.getUser({options: opt, cursor: 'user'})
    }
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
        <div>
          <Header>User Info</Header>
          <img src={this.props.user.get('avatar_url')} className='user-image'/>
          <div className='list-item'>{this.props.user.get('name')}</div>
        </div>
        <List>
          <Header>{this.props.orgs.size} organizations</Header>
          {
            this.props.orgs.map((org, id) =>
              <li className='list-item' key={id}>
                {org.get('login')}
              </li>
            )
          }
        </List>
        <List>
          <Header>{this.props.repos.size} repositories</Header>
          {
            this.props.repos.map((repo, id) =>
              <li className='list-item' key={id}>
                {repo.get('full_name')} - Issues: {repo.get('open_issues')}
              </li>
            )
          }
        </List>
      </div>
    )
  }

  render () {
    return (
      <div className='github-data'>
        {
          this.isFetching()
            ? <Header>Loading...</Header>
            : (
                this.isErrored()
                ? <Header>Failed to Load</Header>
                : this.getDataView()
              )
        }
      </div>
    )
  }
}

export default Component.connect(GHView, require('core/actions'))

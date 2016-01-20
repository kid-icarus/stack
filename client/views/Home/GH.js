import React from 'react'
import {Component, PropTypes} from 'shasta'
import jif from 'jif'
import './index.sass'

export class GHView extends Component {
  static displayName = 'GHView';
  static propTypes = {
    name: PropTypes.string.isRequired,
    orgs: PropTypes.listOf(PropTypes.map),
    repos: PropTypes.listOf(PropTypes.map),
    users: PropTypes.listOf(PropTypes.map),
    user: PropTypes.map,
    me: PropTypes.map
  };
  static cursors = {
    me: 'me',
    orgs: 'requests.orgs',
    repos: 'requests.repos',
    user: 'requests.user',
    users: 'requests.users'
  };

  getData (name) {
    var opt = { user: name }
    if (this.isFetching() || this.isErrored()) {
      this.actions.github.getOrganizations({options: opt, cursor: 'orgs'})
      this.actions.github.getRepositories({options: opt, cursor: 'repos'})
      this.actions.github.getUser({options: opt, cursor: 'user'})
      this.actions.api.users.find({cursor: 'users'})
    }
  }

  componentWillMount () {
    this.getData(this.props.name)
  }

  isFetching () {
    return !(this.props.orgs || this.props.repos || this.props.users || this.props.user)
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
      <div className='ui grid relaxed centered'>
        <div className='ui row'>
          <div className='ui card'>
            <img className='ui image' src={this.props.user.get('avatar_url')} />
            <div className='ui content'>
              <div className='ui header'>{this.props.user.get('name')}</div>
              <div className='description'>{this.props.user.get('email')}</div>
              <div className='meta'>
                <span className='location'>{this.props.user.get('location')}</span>
              </div>
            </div>
            <div className='ui extra content'>
              <i className='ui icon user'/>
              {this.props.user.get('followers')} followers
            </div>
          </div>
        </div>
        <div className='ui row equal width'>
          <div className='ui list relaxed column'>
            <div className='ui header'>{this.props.orgs.size} organizations</div>
            {
              this.props.orgs.map((org, id) =>
                <div className='ui item' key={id}>
                  <i className='ui icon large github middle aligned'/>
                  <div className='content'>
                    <div className='ui header'>{org.get('login')}</div>
                    <div className='description'>
                    {
                      jif(org.has('description'), () =>
                        <div className='description'>
                          {org.get('description')}
                        </div>
                      )
                    }
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className='ui list relaxed column'>
            <div className='ui header'>{this.props.repos.size} repositories</div>
            {
              this.props.repos.map((repo, id) =>
                <div className='ui item' key={id}>
                  <i className='ui icon large github middle aligned'/>
                  <div className='content'>
                    <div className='ui header'>{repo.get('full_name')}</div>
                    {
                      jif(repo.has('description'), () =>
                        <div className='description'>
                          {repo.get('description')}
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
          {
            jif(!this.props.users.has('error'), () =>
              <div className='ui list relaxed column'>
                <div className='ui header'>{this.props.users.size} DB Users</div>
                {
                  this.props.users.map((user, id) =>
                    <div className='ui item' key={id}>
                      <i className='ui icon large user middle aligned'/>
                      <div className='content'>
                        <div className='ui header'>{user.get('name')}</div>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='github-data ui container'>
        {
          this.isFetching()
            ? <div className='ui header'>Loading...</div>
            : (
                this.isErrored()
                ? <div className='ui header'>Failed to Load</div>
                : this.getDataView()
              )
        }
      </div>
    )
  }
}

export default Component.connect(GHView, require('core/actions'))

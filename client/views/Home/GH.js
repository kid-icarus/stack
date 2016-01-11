import React, {PropTypes} from 'react'
import {List, Header, Item, Image, Icon, Card, Content} from 'react-semantify'
import Component from 'redux-dgaf'
import IPropTypes from 'immutable-props'
import jif from 'jif'
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
        <Card>
          <Image src={this.props.user.get('avatar_url')} />
          <Content>
            <Header>{this.props.user.get('name')}</Header>
            <div className='description'>{this.props.user.get('email')}</div>
            <div className='meta'>
              <span className='location'>{this.props.user.get('location')}</span>
            </div>
          </Content>
          <Content className='extra'>
            <Icon className='user'/>
            {this.props.user.get('followers')} followers
          </Content>
        </Card>
        <List className='relaxed'>
          <Header>{this.props.orgs.size} organizations</Header>
          {
            this.props.orgs.map((org, id) =>
              <Item key={id}>
                <Icon className='large github middle aligned'/>
                <div className='content'>
                  <Header>{org.get('login')}</Header>
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
              </Item>
            )
          }
        </List>
        <List className='relaxed't>
          <Header>{this.props.repos.size} repositories</Header>
          {
            this.props.repos.map((repo, id) =>
              <Item key={id}>
                <Icon className='large github middle aligned'/>
                <div className='content'>
                  <Header>{repo.get('full_name')}</Header>
                  {
                    jif(repo.has('description'), () =>
                      <div className='description'>
                        {repo.get('description')}
                      </div>
                    )
                  }
                </div>
              </Item>
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

import React from 'react'
import {Component, PropTypes} from 'shasta'
import UserList from './UserList'
import RepoList from './RepoList'
import OrgList from './OrgList'
import User from './User'
import './index.sass'

class GHView extends Component {
  static displayName = 'GHView';
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className='github-data ui container'>
        <div className='ui grid relaxed centered'>
          <div className='ui row'>
            <User name={this.props.name}/>
          </div>
          <div className='ui row equal width'>
            <OrgList name={this.props.name}/>
            <RepoList name={this.props.name}/>
            <UserList/>
          </div>
        </div>
      </div>
    )
  }
}

export default Component.connect(GHView, require('core/actions'))

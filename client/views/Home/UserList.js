import React from 'react'
import {Component, PropTypes} from 'shasta'
import './index.sass'

class GHView extends Component {
  static displayName = 'GHView';
  static propTypes = {
    users: PropTypes.listOf(PropTypes.map),
    me: PropTypes.map
  };
  static cursors = {
    me: 'me',
    users: 'requests.users'
  };

  // todo: abstract this crap
  componentWillMount () {
    if (this.props.me) {
      this.actions.api.users.find({key: 'users'})
    }
  }

  isFetching () {
    return !this.props.users
  }

  isErrored () {
    return !this.isFetching() && this.props.users.has('error')
  }

  getError () {
    return this.props.users && this.props.users.get('error')
  }

  itemView (user, id) {
    return <div className='ui item' key={id}>
      <i className='ui icon large user middle aligned'/>
      <div className='content'>
        <div className='ui header'>{user.get('name')}</div>
      </div>
    </div>
  }
  collectionView () {
    return <div className='ui list relaxed column'>
      <div className='ui header'>{this.props.users.size} Users</div>
      {
        this.props.users.map(this.itemView)
      }
    </div>
  }
  loaderView () {
    return <div className='ui header'>Loading...</div>
  }
  errorView (err) {
    return <div className='ui header'>Failed to Load: {err}</div>
  }
  render () {
    return this.isFetching()
      ? this.loaderView()
      : this.isErrored()
        ? this.errorView(this.getError())
        : this.collectionView()
  }
}

export default Component.connect(GHView, require('core/actions'))

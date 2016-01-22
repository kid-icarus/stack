import React from 'react'
import {PropTypes} from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class UserList extends DataComponent {
  static displayName = 'UserList';
  static propTypes = {
    users: PropTypes.iterable,
    me: PropTypes.map
  };
  static storeProps = {
    me: 'me',
    users: 'requests.users'
  };

  fetch () {
    this.actions.api.users.find({key: 'users'})
  }

  displayData ({users}) {
    return <div className='ui list relaxed column'>
      <div className='ui header'>{users.size} Users</div>
      {
        users.map((user) =>
          <div className='ui item' key={user.get('id')}>
            <i className='ui icon large user middle aligned'/>
            <div className='content'>
              <div className='ui header'>{user.get('name')}</div>
            </div>
          </div>
        )
      }
    </div>
  }
  displayLoader () {
    return <div className='ui header'>Loading...</div>
  }
  displayErrors (errors) {
    return <div className='errors'>
      Failed to Load:
      {
        errors.map((err, field) =>
          <div key={field}>{field}: {err.message}</div>
        ).toArray()
      }
    </div>
  }
}

export default DataComponent.connect(UserList, require('core/actions'))

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
    users: 'requests.users',
    test: 'requests.test'
  };

  fetch () {
    this.actions.api.users.find({requestId: 'users'})
    this.actions.api.users.find({requestId: 'users', tail: true})

    this.actions.api.users.findById({
      requestId: 'test',
      params: {
        id: '2b1b8a9e-9ead-4e71-9c0f-25981800e0eb'
      }
    })
    this.actions.api.users.findById({
      requestId: 'test',
      tail: true,
      params: {
        id: '2b1b8a9e-9ead-4e71-9c0f-25981800e0eb'
      }
    })
  }

  displayData ({users, test}) {
    console.log(test)
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

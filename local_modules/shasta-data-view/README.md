# shasta-data-view

provides an extensible `DataComponent` with helpers for fetching and displaying remote data

## Install

`npm install shasta-data-view`

## Example

```js
import React from 'react'
import jif from 'jif'
import {PropTypes} from 'shasta'
import DataComponent from 'shasta-data-view'

// extend DataComponent
class OrgList extends DataComponent {
  static displayName = 'OrgList';
  static propTypes = {
    orgs: PropTypes.iterable,
    me: PropTypes.map
  };
  // storeProps are required
  // fetched data from requests.* is associated with a local storeProp
  static storeProps = {
    me: 'me',
    orgs: 'requests.orgs'
  };

  // call remote fetches
  fetch () {
    var opt = {
      name: this.props.name
    }
    // action fetches data from github API
    // `requestId` associates request with storeProp
    this.actions.github.getOrganizations({requestId: 'orgs', params: opt})
  }

  // display data on success
  displayData ({orgs}) {
    return <div className='ui list relaxed column'>
      <div className='ui header'>{orgs.size} Orgs</div>
      {
        this.props.orgs.map(org =>
          <div className='ui item' key={org.get('id')}>
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
  }
  // loading indicator
  displayLoader () {
    return <div className='ui header'>Loading...</div>
  }
  // errors from fetch
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

export default DataComponent.connect(OrgList, require('core/actions'))
```
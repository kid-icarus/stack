import { Provider } from 'react-redux'
import { Router } from 'react-router'
import React from 'react'
import Component from 'redux-dgaf'
import './index.sass'

// css bs
// import 'font-awesome-sass-loader'
import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/semantic.js'

export class RootView extends React.Component {
  static displayName = 'RootView';
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='root-view'>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Component.connect(RootView, require('core/actions'))

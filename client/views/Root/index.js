import { Provider } from 'react-redux'
import { Router } from 'react-router'
import React from 'react'
import Component from 'redux-dgaf'
import classes from './index.sass'

export class RootView extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <Provider store={this.props.store}>
        <div className={classes.root}>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Component.connect(RootView, require('core/actions'))

import { Provider } from 'react-redux'
import { Router } from 'react-router'
import React from 'react'
import classess from './index.sass'
import 'font-awesome-sass-loader'

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <Provider store={this.props.store}>
        <div className={classess.root}>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
        </div>
      </Provider>
    )
  }
}

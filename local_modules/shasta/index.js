import { PropTypes as RPropTypes } from 'react'
import IPropTypes from 'react-immutable-proptypes'
import { combineReducers } from 'redux-immutablejs'
import { applyMiddleware, compose, createStore } from 'redux'
import PureComponent from 'react-pure-render/component'
import connect from './connect'
import bindMethods from './lib/bindMethods'
import createActions from './lib/createActions'
import bindActions from './lib/bindActions'

class ShastaComponent extends PureComponent {
  static propTypes = {
    actions: RPropTypes.object
  };
  static connect = connect;
  constructor (props, context) {
    super(props, context)

    if (this.constructor.defaultState) {
      this.state = this.constructor.defaultState
    }

    bindMethods(this)
  }

  // sugar accessors
  get actions () {
    return this.props.actions
  }
}

export const PropTypes = {
  ...RPropTypes,
  ...IPropTypes
}

export {
  combineReducers,
  bindActions,
  createActions,
  applyMiddleware,
  compose,
  createStore
}
export default ShastaComponent

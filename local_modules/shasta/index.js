import { PropTypes as RPropTypes } from 'react'
import IPropTypes from 'react-immutable-proptypes'
import { combineReducers } from 'redux-immutablejs'
import PureComponent from 'react-pure-render/component'
import connect from './connect'
import createStore from './createStore'
import bindMethods from './lib/bindMethods'
import createActions from './lib/createActions'

class Component extends PureComponent {
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

const PropTypes = {
  ...RPropTypes,
  ...IPropTypes
}

export {
  Component,
  PropTypes,

  // guts
  combineReducers,
  createActions,
  createStore
}

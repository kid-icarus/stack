import { PropTypes as RPropTypes } from 'react'
import IPropTypes from 'immutable-props'
import { combineReducers } from 'redux-immutablejs'
import { applyMiddleware, compose, createStore } from 'redux'
import PureComponent from 'react-pure-render/component'
import connect from './connect'
import bindMethods from './bindMethods'
import createActions from './createActions'
import bindActions from './bindActions'

class ShastaComponent extends PureComponent {
  static propTypes = {
    actions: RPropTypes.object
  };

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
ShastaComponent.connect = connect

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

import {Component} from 'shasta'
import {fromJS} from 'immutable'
import pick from 'lodash.pick'
import reduce from 'lodash.reduce'
import some from 'lodash.some'

export default class DataComponent extends Component {
  static displayName = 'DataComponent';

  constructor () {
    super(...arguments)
    if (!this.constructor.cursors) {
      throw new Error('DataComponent requires cursors to be defined!')
    }

    if (this.fetch) this.fetch()
  }

  isFetching () {
    return !this.isErrored() && some(this.constructor.cursors, (cursor, prop) =>
      typeof this.props[prop] === 'undefined'
    )
  }
  isErrored () {
    return some(this.constructor.cursors, (cursor, prop) =>
      this.props[prop] && this.props[prop].has('error')
    )
  }
  getLoadingFields () {
    return fromJS(reduce(this.constructor.cursors, (prev, cursor, prop) => {
      if (typeof this.props[prop] === 'undefined') {
        prev.push(prop)
      }
      return prev
    }, []))
  }
  getErrors () {
    return fromJS(reduce(this.constructor.cursors, (prev, cursor, prop) => {
      if (this.props[prop] && this.props[prop].has('error')) {
        prev[prop] = this.props[prop].get('error')
      }
      return prev
    }, {}))
  }
  getData () {
    return pick(this.props, Object.keys(this.constructor.cursors))
  }

  displayLoader (fields) {}
  displayErrors (errors) {}
  displayData (data) {}

  render () {
    return this.isFetching()
      ? this.displayLoader(this.getLoadingFields())
      : this.isErrored()
        ? this.displayErrors(this.getErrors())
        : this.displayData(this.getData())
  }
}

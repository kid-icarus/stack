import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'
import style from './style.sass'

export default class Title extends Component {
  static propTypes = {
    className: PropTypes.string
  }
  render () {
    return <div {...this.props} className={classNames(style.title, this.props.className)} />
  }
}

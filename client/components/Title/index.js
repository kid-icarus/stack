import React, {PropTypes} from 'react'
import classNames from 'classnames'
import style from './style.scss'
import PureComponent from 'react-pure-render/component'

export default class Title extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  }
  render () {
    return <div {...this.props} className={classNames(style.title, this.props.className)} />
  }
}

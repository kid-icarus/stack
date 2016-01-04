import React, {PropTypes} from 'react'
import classNames from 'classnames'
import style from './style.scss'
import Component from 'lib/Component'

export default class Title extends Component {
  static propTypes = {
    className: PropTypes.string
  }
  render () {
    return <div {...this.props} className={classNames(style.title, this.props.className)} />
  }
}

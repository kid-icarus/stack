import React, {PropTypes} from 'react'
import classNames from 'classnames'
import styles from './style.scss'
import PureComponent from 'react-pure-render/component'

export default class Title extends PureComponent {
  PropTypes = {
    className: PropTypes.string
  }
  render () {
    return <div {...this.props} className={classNames(styles.title, this.props.className)} />
  }
}

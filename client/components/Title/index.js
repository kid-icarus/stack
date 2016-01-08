import React, {PropTypes, Component} from 'react'
import classNames from 'classnames'
import classes from './index.sass'

export default class Title extends Component {
  static propTypes = {
    className: PropTypes.string
  };
  render () {
    return <div
      {...this.props}
      className={
        classNames(classes.title, this.props.className)
      } />
  }
}

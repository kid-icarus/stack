import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.scss'
import actions from 'actions'

export class Todo extends Component {

  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
  }

  hover () {
    console.log('hover')
  }

  render () {
    return (

      <li key={this.props.index} onMouseEnter={this.hover}>
        <div>
          <label className={style.view}>{this.props.todo}</label>
        </div>
      </li>

    )
  }
}

export default Component.connect(actions, Todo)
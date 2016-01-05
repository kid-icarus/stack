import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actions from 'actions'

export class Todo extends Component {

  static propTypes = {
    todo: React.PropTypes.object.isRequired
  }

  destroy () {
    this.actions.deleteTodo(this.props.todo)
  }

  render () {
    return (

      <li>
        <div className={style.view}>
          <label>{this.props.todo.text}</label>
          <button onClick={this.destroy.bind(this)} className={style.destroy} />
        </div>
      </li>

    )
  }
}

export default Component.connect(actions, Todo)

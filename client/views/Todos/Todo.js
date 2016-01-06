import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actions from 'actions'

export class Todo extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  static propTypes = {
    todo: React.PropTypes.object.isRequired
  }

  destroy () {
    this.actions.deleteTodo(this.props.todo)
  }

  handleDoubleClick () {
    this.setState({ editing: true })
  }

  toggle () {
    this.actions.toggleTodo(this.props.todo)
  }

  render () {
    let el
    if (this.state.editing) {
      el = (<input className={style.edit} value = {this.props.todo.text} />)
    } else {
      el = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type='checkbox'
            checked={this.props.todo.completed}
            onChange={this.toggle} />
          <label onDoubleClick={this.handleDoubleClick}>{this.props.todo.text}</label>
          <button onClick={this.destroy} className={style.destroy} />
        </div>
      )
    }

    return (<li className={(this.props.todo.completed) ? style.completed : ''}>{el}</li>)
  }
}

export default Component.connect(actions, Todo)

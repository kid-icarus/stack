import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actionsMeta from 'actions'

export class Todo extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      editing: false,
      text: this.props.todo.text || ''
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

  updateTodo (e) {
    this.setState({text: e.target.value})
  }

  saveTodo (e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      let todo = this.props.todo
      todo.text = text
      this.actions.saveTodo(todo)
      this.editComplete()
    }
  }

  editComplete () {
    this.setState({editing: false})
  }

  render () {
    let el
    if (this.state.editing) {
      el = <input
        ref='todo'
        className={style.edit}
        value={this.state.text}
        autoFocus='true'
        onChange={this.updateTodo}
        onBlur={this.editComplete}
        onKeyDown={this.saveTodo} />
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

export default Component.connect(actionsMeta, Todo)

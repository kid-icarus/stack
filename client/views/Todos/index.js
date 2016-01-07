import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actionsMeta from 'actions'
import Todo from './Todo'
import classNames from 'classnames'

export class TodosView extends Component {
  static initialState = {
    addError: false
  }

  addTodo (e) {
    var el = this.refs.todoInput

    if (e.keyCode === 13) {
      let val = el.value.trim()
      if (val === '') {
        return this.setState({addError: true})
      }

      this.actions.addTodo(val)
      el.value = ''
      el.focus()
      this.setState({addError: false})
    }
  }

  resetErrors () {
    this.setState({addError: false})
  }

  render () {
    let todos = this.$state.todos

    return (
      <div className={style.todoapp}>

        <header className={style.header}>
          <h1>todos</h1>

          <input
            className={classNames(style['new-todo'], {[style['input-error']]: this.state.addError})}
            ref='todoInput'
            onKeyDown={this.addTodo}
            onBlur={this.resetErrors}
            type='text'
            placeholder='What needs to be done?' />

        </header>
        <section className={style.main}>
          <ul className={style['todo-list']}>
            {
              todos.map((todo) => <Todo todo={todo} key={todo.get('id')} />)
            }
          </ul>
        </section>

        <div>{todos.size} todos</div>

      </div>
    )
  }

}

export default Component.connect(actionsMeta, TodosView)

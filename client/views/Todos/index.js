import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actions from 'actions'
import Todo from './Todo'
import classNames from 'classnames'

export class TodosView extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      addError: false
    }
  }

  addTodo (e) {
    if (e.keyCode === 13) {
      let val = this.refs.todoInput.value.trim()

      if (val === '') {
        this.setState({addError: true})
      } else {
        this.actions.addTodo(val)
        this.refs.todoInput.value = ''
        this.refs.todoInput.focus()
        this.setState({addError: false})
      }
    }
  }

  resetErrors () {
    this.setState({addError: false})
  }

  render () {
    let todos = this.rootState.todos

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
                todos.map((todo) => <Todo todo={todo} key={todo.id} />)
              }
            </ul>
        </section>

        <div>{todos.length} todos</div>

      </div>
    )
  }

}

export default Component.connect(actions, TodosView)

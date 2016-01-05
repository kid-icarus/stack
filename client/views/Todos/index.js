import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actions from 'actions'
import Todo from './Todo'

export class TodosView extends Component {

  addTodo (e) {
    if (e.keyCode === 13) {
      this.actions.addTodo(this.refs.todoInput.value.trim())
      this.refs.todoInput.value = ''
      this.refs.todoInput.focus()
    }
  }

  render () {
    let todos = this.store.todos

    return (
      <div className={style.todoapp}>

        <header className={style.header}>
          <h1>todos</h1>

          <input
            className={style['new-todo']}
            ref='todoInput'
            onKeyDown={this.addTodo.bind(this)}
            type='text' />

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

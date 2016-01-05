import React from 'react'
import Component from 'redux-dgaf'
import style from './style.sass'
import actions from 'actions'

export class TodosView extends Component {

  render () {
    let store = this.getStore()
    let todos = store.todos

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
                todos.map((todo, idx) =>
                  <li key={idx}>
                    <div>
                      <label className={style.view}>{todo}</label>
                    </div>
                  </li>
                )
              }

            </ul>
        </section>

        <div>{todos.length} todos</div>

      </div>
    )
  }

  addTodo (e) {
    if (e.keyCode === 13) {
      let actions = this.getActions()
      actions.addTodo(this.refs.todoInput.value.trim())
      this.refs.todoInput.value = ''
      this.refs.todoInput.focus()
    }
  }

}

export default Component.connect(actions, TodosView)

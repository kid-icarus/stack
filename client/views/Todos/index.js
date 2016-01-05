import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.scss'
import actions from 'actions'

export class TodosView extends Component {


  render () {
    let store = this.getStore()
    let actions = this.getActions()
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
    console.log(e);
    if (e.keyCode == 13) {

      let actions = this.getActions()
      actions.addTodo(this.refs.todoInput.value.trim());
      this.refs.todoInput.value = ''
      this.refs.todoInput.focus()
    }
  }


}

export default Component.connect(actions, TodosView)

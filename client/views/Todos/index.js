import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import classes from './index.sass'
import Todo from './Todo'
import classNames from 'classnames'

export class TodosView extends Component {
  static initialState = {
    addError: false
  };

  addTodo (e) {
    var el = this.refs.todoInput

    if (e.keyCode === 13) {
      let val = el.value.trim()
      if (val === '') {
        return this.setState({addError: true})
      }

      this.$actions.addTodo(val)
      el.value = ''
      el.focus()
      this.setState({addError: false})
    }
  }

  resetErrors () {
    this.setState({addError: false})
  }

  render () {
    let todos = this.$state.get('todos')
    return (
      <div className={classes.todoapp}>

        <header className={classes.header}>
          <h1>todos</h1>

          <input
            className={classNames(classes['new-todo'], {[classes['input-error']]: this.state.addError})}
            ref='todoInput'
            onKeyDown={this.addTodo}
            onBlur={this.resetErrors}
            type='text'
            placeholder='What needs to be done?' />

        </header>
        <section className={classes.main}>
          <ul className={classes['todo-list']}>
            {
              todos.map((todo, id) => <Todo todo={todo} key={id} />).toArray()
            }
          </ul>
        </section>
        <div>{todos.size} todos</div>
      </div>
    )
  }

}

export default Component.connect(TodosView, require('actions'))

import React, {PropTypes} from 'react'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import classes from './index.sass'
import Todo from './Todo'
import shield from 'function-shield'
import classNames from 'classnames'

const ascending = (a, b) => a - b
const filters = {
  All: () => true,
  Active: (i) => !i.get('completed'),
  Completed: (i) => i.get('completed')
}

export class TodosView extends Component {
  static displayName = 'TodosView';
  static defaultState = {
    addError: false
  };
  static propTypes = {
    todos: IPropTypes.Map.isRequired,
    toggled: PropTypes.bool.isRequired,
    filter: PropTypes.string.isRequired
  };
  static cursors = {
    filter: 'todomvc.filter',
    todos: 'todomvc.items',
    toggled: 'todomvc.toggle'
  };

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

  getFooter () {
    if (this.props.todos.size <= 0) {
      return null
    }
    var itemsLeft = this.props.todos.filter(filters.Active)
    return <footer className={classes.footer}>
      <span className={classes['todo-count']}>
        {itemsLeft.size} items left
      </span>
      <ul className={classes.filters}>
      {
        Object.keys(filters).map((k) =>
          <li key={k}>
            <a
              href='#'
              onClick={this.actions.setTodoFilter.bind(null, k)}
              className={
                classNames({
                  [classes.selected]: this.props.filter === k
                })
              }>{k}</a>
          </li>
        )
      }
      </ul>
      {
        this.props.todos.filter(filters.Completed).size
          ? <button
              onClick={shield(this.actions.clearCompletedTodos)}
              className={classes['clear-completed']}>
              Clear completed
            </button>
          : null
      }
    </footer>
  }

  render () {
    return (
      <div className={classes.todoapp}>
        <header className={classes.header}>
          <h1>todos</h1>
          <input
            className={
              classNames(classes['new-todo'], {
                [classes['input-error']]: this.state.addError
              })
            }
            ref='todoInput'
            onKeyDown={this.addTodo}
            onBlur={this.resetErrors}
            type='text'
            placeholder='What needs to be done?' />
        </header>
        <section className={classes.main}>
          {
            this.props.todos.size
              ? <input
                className={classes['toggle-all']}
                type='checkbox'
                onChange={this.actions.toggleAllTodos} />
              : null
          }
          <ul className={classes['todo-list']}>
            {
              this.props.todos
                .filter(filters[this.props.filter])
                .sort(i => i.get('created'), ascending)
                .map((todo, id) =>
                  <Todo todo={todo} key={id} />
                ).toArray()
            }
          </ul>
        </section>
        { this.getFooter() }
      </div>
    )
  }

}

export default Component.connect(TodosView, require('core/actions'))

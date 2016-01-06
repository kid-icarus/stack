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

  render () {
    let el
    if (this.state.editing) {
      el = (<input className='edit' />)
    }
    else {
      el = (
        <div className={style.view}>
          <label onDoubleClick={this.handleDoubleClick}>{this.props.todo.text}</label>
          <button onClick={this.destroy} className={style.destroy} />
        </div>
      )
    }

    return (

      <li>{el}</li>
    )
  }
}

export default Component.connect(actions, Todo)

import React from 'react'
import jif from 'jif'
import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'
import { Component, PropTypes } from 'shasta'
import classNames from 'classnames'
import startCase from 'lodash.startcase'

/*
  Form component
  redux-form form container that abstracts need for defining required props
  and provides props to child Field elements

  * noLabel: include (set to true) in tag if you want to not have a lable
  * label: set a label explicitly
*/

export class Form extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired,
    children: PropTypes.node
  };
  static childContextTypes = {
    fields: React.PropTypes.object
  };
  getChildContext () {
    return {fields: this.props.fields}
  }
  render () {
    return (
      <form className='ui form' onSubmit={this.props.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

/*
  # Field component
  wraps label, input and error handling into one component
  options are loaded from schema into parent form

  * name: name of the field, used for error handling, redux-form integration and auto-label
  * noLabel: include (set to true) in tag if you want to not have a lable
  * label: set a label explicitly
*/

export class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    noLabel: PropTypes.boolean,
    label: PropTypes.string
  };
  static contextTypes = {
    fields: React.PropTypes.object
  };
  static defaultProps = {
    type: 'text'
  };
  render () {
    let field = this.context.fields[this.props.name]
    console.log('field')
    console.log(this.context.fields)
    console.log(this.props.name)
    console.log(field)
    let label = this.props.label || startCase(this.props.name)
    return (
      // mixin error class if there's an error */}
      <div className={classNames('field', {'error': field.error})}>
        {/* noLabel */}
        {(this.props.noLabel) ? null : <label>{label}</label>}
        {/* acutal input */}
        <input type={this.props.type} {...field} />
        {
          jif(field.error, () =>
            <div
              className='ui basic red pointing prompt label transition visible'>
              {field.error}
            </div>
          )
        }
      </div>
    )
  }
}

/*
  shastaForm decorator
  wraps redux-form decorator and provides some default values

  * reduxMountPoint: where in the store forms should be mounted- default is 'form', we default to 'forms'
  * form: opt.name - name is an alias for 'form', simply the name of the form
  * getFormState: convert to JS for redux-form to work with immutable.js
*/

export const shastaForm = (opt = {}) =>
  reduxForm({
    reduxMountPoint: 'forms',
    form: opt.name,
    getFormState: (state, cursor) => state.get(cursor).toJS(),
    ...opt
  })

/*
  reducer
  redux-form reducer wrapped to support immutable.js
*/

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

// export redux-form's getValues
export const getValues = reduxForm.getValues

import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'
import { Component, PropTypes } from 'shasta'

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

export class FormComponent extends Component {
  constructor () {
    super(...arguments)
  }
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    validate: PropTypes.func.isRequired
  };
}

export const Form = (opt = {}) =>
  reduxForm({
    reduxMountPoint: 'forms',
    form: opt.name,
    getFormState: (state, cursor) => state.get(cursor).toJS(),
    ...opt
  })

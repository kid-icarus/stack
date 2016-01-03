import { createAction } from 'redux-actions'

export const increment = createAction('incrementCounter')
export const decrement = createAction('decrementCounter')

export const double = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(increment(getState().counter))
    }, 10)
  }
}

export const zero = () => {
  return (dispatch, getState) => {
    let init = getState().counter
    for (var i = 0; i < init; i++) {
      dispatch(decrement())
    }
  }
}

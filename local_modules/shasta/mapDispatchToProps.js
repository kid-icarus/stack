export default (getActions) => (dispatch) =>
  ({actions: getActions ? getActions(dispatch) : {}})

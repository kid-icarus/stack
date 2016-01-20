import resolveCursors from 'redux-immutable-cursors'

export default (view) => (storeState) => {
  if (!view.cursors) return {} // nothing to do
  return resolveCursors(view.cursors, storeState)
}

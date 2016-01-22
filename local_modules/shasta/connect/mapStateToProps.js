import resolveCursors from 'redux-immutable-cursors'

export default (view) => (storeState) => {
  if (!view.storeProps) return {} // nothing to do
  return resolveCursors(view.storeProps, storeState)
}

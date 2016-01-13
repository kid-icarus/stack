// removes fb shit from URL hash after login
// returns true if it corrected a hash, false if not

module.exports = () => {
  if (window.location.hash !== '#_=_') return false
  if ('history' in window && 'pushState' in history) {
    window.history.pushState('', document.title, window.location.pathname)
    return true
  }

  var scroll = {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  }
  window.location.hash = ''
  document.body.scrollTop = scroll.top
  document.body.scrollLeft = scroll.left
  return true
}

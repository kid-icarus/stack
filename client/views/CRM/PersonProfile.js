import React from 'react'
import {Component, PropTypes} from 'shasta'
import './index.sass'

class PersonProfile extends Component {
  static propTypes = {
    params: PropTypes.object
  };
  static storeProps = {
    people: 'people'
  };
  getModel (cursor, idName = 'id') {
    return this.props[cursor].get(this.props.params[idName])
  }
  componentDidMount () {
    let link = this.refs.link.getDOMNode()
    let js = document.createElement('script')
    js.id = "twitter-wjs"
    js.src = "//platform.twitter.com/widgets.js"
    link.parentNode.appendChild(js)
  }
  render () {
    let person = this.getModel('people')
    return (
      <div className='ui grid'>
      <div className='seven wide column'>
        <div className='ui card'>
          <div className='image'>
            {person.largeImage}
            <img src={person.get('largeImage')} />
          </div>
          <div className='content'>
            <a className='header'>{person.get('name')}</a>
            <div className='meta'>
              <span className='date'>{person.get('location')}</span>
            </div>
            <div className='description'>
              Notes about user
            </div>
          </div>
          <div className='extra content'>
            <a>
              $$$
              🔥🔥🔥
            </a>
          </div>
        </div>
      </div>
      <div className='nine wide column'>
        <a
          ref='link'
          className='twitter-timeline'
          href="https://twitter.com/funkytek"
          data-widget-id="691226625745096709" />
      </div>
      </div>
    )
  }
}

export default Component.connect(PersonProfile, require('core/actions'))

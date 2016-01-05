import { Link } from 'react-router'
import Component from 'redux-dgaf'
import React from 'react'
import actions from 'actions'
import Title from 'components/Title'
import style from './style.sass'

export class AboutView extends Component {
  render () {
    return (
      <div className={style.about}>
        <Title>This is the about view!</Title>
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default Component.connect(actions, AboutView)

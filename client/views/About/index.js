import { Link } from 'react-router'
import Component from 'redux-dgaf'
import React from 'react'
import actionsMeta from 'actions'
import Title from 'components/Title'
import classes from './index.sass'

export class AboutView extends Component {
  render () {
    return (
      <div className={classes.about}>
        <Title>This is the about view!</Title>
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default Component.connect(actionsMeta, AboutView)

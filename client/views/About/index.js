import { Link } from 'react-router'
import React from 'react'
import Title from 'components/Title'
import styles from './style.scss'

export class AboutView extends React.Component {
  render () {
    return (
      <div className={styles.about}>
        <Title>This is the about view!</Title>
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default AboutView

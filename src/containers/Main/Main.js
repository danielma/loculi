import React, { PropTypes } from 'react'
import { Sidebar } from 'components'
import styles from './Main.sass'

export default class MainContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className={styles.main}>
        <Sidebar />
        {this.props.children}
      </div>
    )
  }
}

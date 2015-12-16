import React from 'react'
import styles from './Button.sass'

export default function Button(props) {
  return <button className={styles.button} {...props}>{props.children}</button>
}

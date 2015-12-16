import React from 'react'
import styles from './Button.sass'

function getClassName(props) {
  return ['button'].concat(props.className).map((prop) => styles[prop]).join(' ')
}

export default function Button(props) {
  return <button className={getClassName(props)} {...props}>{props.children}</button>
}

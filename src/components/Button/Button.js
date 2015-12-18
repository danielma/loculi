import React from 'react'
import styles from './Button.sass'

function getClassName({ className, active }) {
  const styleList = ['button'].concat(className)
  if (active === true) { styleList.push('active') }
  if (active === false) { styleList.push('inactive') }

  return styleList.map((prop) => styles[prop]).join(' ')
}

export default function Button({ className = '', active = null, ...props }) {
  return (
    <button
      className={getClassName({ className, active })}
      {...props}>
      {props.children}
    </button>
  )
}

import React from 'react'
import { money } from 'utils'
import styles from './ListEnvelope.sass'
import classNames from 'classnames'

export default function ListEnvelope({ envelope, selected, ...props }) {
  const { amountCents } = envelope
  const isPositive = amountCents >= 0
  return (
    <div className={classNames(styles.listEnvelope, { [styles.selected]: selected })} {...props}>
      <div className="name">{envelope.name}</div>
      <div className={`${styles.amount} ${isPositive ? styles.positive : styles.negative}`}>{money.centsToString(envelope.amountCents)}</div>
    </div>
  )
}

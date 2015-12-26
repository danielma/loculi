import React from 'react'
import styles from '../DesignationList/DesignationList.sass'
import { money } from 'utils'

export default function InboxList({ transactions }) {
  return (
    <div>
      <div className={styles.header}>
        <span>Payee</span>
        <span className={styles.amount}>Amount</span>
      </div>
      {transactions.map((transaction) => (
        <div className={styles.designation} key={transaction.objectId}>
          <span className={styles.name}>{transaction.payee}</span>
          <span className={`${styles.amount} ${transaction.amountCents >= 0 ? styles.positive : styles.negative}`}>
            {money.centsToString(transaction.amountCents)}
          </span>
        </div>
      ))}
    </div>
  )
}

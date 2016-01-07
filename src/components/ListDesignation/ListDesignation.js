import React from 'react'
import R from 'ramda'
import styles from '../ListDesignation/ListDesignation.sass'
import { money } from 'utils'

function payee(designationOrTransaction) {
  return R.path(['transaction', 'payee'], designationOrTransaction) || designationOrTransaction.payee
}

export default function ListDesignation({ designation }) {
  return (
    <div className={styles.designation}>
      <span className={styles.name}>{payee(designation)}</span>
      <span className={`${styles.amount} ${designation.amountCents >= 0 ? styles.positive : styles.negative}`}>
        {money.centsToString(designation.amountCents)}
      </span>
    </div>
  )
}

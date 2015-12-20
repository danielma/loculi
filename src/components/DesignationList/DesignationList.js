import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { money } from 'utils'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe(props) {
    const designations = new Parse.Query('Designation')

    designations.
      equalTo('envelope', props.envelope).
      include('transaction')

    return { designations }
  },

  render() {
    const styles = require('./DesignationList.sass')

    return (
      <div>
        <div className={styles.header}>
          <span>Payee</span>
          <span className={styles.amount}>Amount</span>
        </div>
        {this.data.designations.map((designation) => (
          <div className={styles.designation} key={designation.objectId}>
            <span className={styles.name}>{designation.transaction.payee}</span>
            <span className={`${styles.amount} ${designation.amountCents >= 0 ? styles.positive : styles.negative}`}>
              {money.centsToString(designation.amountCents)}
            </span>
          </div>
        ))}
      </div>
    )
  },
})

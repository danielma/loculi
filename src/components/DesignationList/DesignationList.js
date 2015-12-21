import React, { PropTypes } from 'react'
import Parse from 'parse'
import { money } from 'utils'
import { observe } from 'utils/reactUtils'

function getObserves(props) {
  const designations = new Parse.Query('Designation')

  designations.
    equalTo('envelope', props.envelope).
    include('transaction')

  return { designations }
}

class DesignationList extends React.Component {
  static propTypes = {
    // TODO: proptypes?
    designations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const styles = require('./DesignationList.sass')

    return (
      <div>
        <div className={styles.header}>
          <span>Payee</span>
          <span className={styles.amount}>Amount</span>
        </div>
        {this.props.designations.map((designation) => (
          <div className={styles.designation} key={designation.objectId}>
            <span className={styles.name}>{designation.transaction.payee}</span>
            <span className={`${styles.amount} ${designation.amountCents >= 0 ? styles.positive : styles.negative}`}>
              {money.centsToString(designation.amountCents)}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

export default observe(getObserves)(DesignationList)

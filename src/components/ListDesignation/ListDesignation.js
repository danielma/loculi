import React, { PropTypes } from 'react'
import R from 'ramda'
import styles from '../ListDesignation/ListDesignation.sass'
import { money } from 'utils'

const payee = (designationOrTransaction) => (
  R.path(['transaction', 'payee'], designationOrTransaction) || designationOrTransaction.payee
)

export default class ListDesignation extends React.Component {
  static propTypes = {
    designation: PropTypes.shape({
      amountCents: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  handleClick = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { designation } = this.props

    return (
      <div className={styles.designation} onClick={this.handleClick}>
        <span className={styles.name}>{payee(designation)}</span>
        <span className={`${styles.amount} ${designation.amountCents >= 0 ? styles.positive : styles.negative}`}>
          {money.centsToString(designation.amountCents)}
        </span>
        {this.state.isEditing &&
          <div>
            kalamaty jane
          </div>
        }
      </div>
    )
  }
}

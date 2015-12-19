import React from 'react'
import { Envelopes, DesignationList, AddTransaction } from 'components'
import styles from './Main.sass'

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleEnvelopeSelect = (selectedEnvelope) => {
    this.setState({ selectedEnvelope })
  }

  render() {
    return (
      <div>
        <div className={styles.main}>
          <Envelopes selected={this.state.selectedEnvelope} onSelect={this.handleEnvelopeSelect} />
          {this.state.selectedEnvelope && <DesignationList envelope={this.state.selectedEnvelope} />}
        </div>
        <AddTransaction />
      </div>
    )
  }
}

import React, { PropTypes } from 'react'
import Parse from 'parse'
import R from 'ramda'
import Modal from 'react-modal'
import { EnvelopeSidebar, DesignationList, NewEnvelope } from 'components'
import { parameterize } from 'utils/string'
import { observe } from 'utils/react'

class Envelopes extends React.Component {
  static propTypes = {
    selected: PropTypes.object,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,

    // connect
    // TODO: real prop type here
    envelopes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    onSelect: () => {},
    params: {},
  }

  constructor(props) {
    super(props)

    this.state = { selectedEnvelope: null }
  }

  render() {
    const styles = require('./Envelopes.sass')
    const paramEnvelope = parameterize(this.props.params.name)
    const newEnvelope = paramEnvelope === 'new'
    const selectedEnvelope = R.find(
      (envelope) => parameterize(envelope.name) === paramEnvelope,
      this.props.envelopes)

    return (
      <div className={styles.wrapper}>
        <EnvelopeSidebar envelopes={this.props.envelopes} selected={selectedEnvelope} />
        <div className={styles.designationList}>
          {selectedEnvelope ?
            <DesignationList envelope={selectedEnvelope} /> :
            <div className={styles.blankSlate} />}
        </div>
        <Modal isOpen={newEnvelope} onRequestClose={() => this.props.history.goBack()}>
          <NewEnvelope />
        </Modal>
      </div>
    )
  }
}

export default observe({ envelopes: new Parse.Query('Envelope') })(Envelopes)

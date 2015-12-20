import React, { PropTypes } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import R from 'ramda'
import Modal from 'react-modal'
import { EnvelopeSidebar, DesignationList, NewEnvelope } from 'components'
import { parameterize } from 'utils/string'

export default React.createClass({
  displayName: 'Envelopes',

  propTypes: {
    selected: PropTypes.object,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  },

  mixins: [ParseReact.Mixin],

  getDefaultProps() {
    return {
      onSelect: () => {},
      params: {},
    }
  },

  getInitialState() {
    return { selectedEnvelope: null }
  },

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  render() {
    const styles = require('./Envelopes.sass')
    const paramEnvelope = parameterize(this.props.params.name)
    const newEnvelope = paramEnvelope === 'new'
    const selectedEnvelope = R.find(
      (envelope) => parameterize(envelope.name) === paramEnvelope,
      this.data.envelopes)

    return (
      <div className={styles.wrapper}>
        <EnvelopeSidebar envelopes={this.data.envelopes} selected={selectedEnvelope} />
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
  },
})

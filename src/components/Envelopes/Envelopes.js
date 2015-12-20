import React, { PropTypes } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import R from 'ramda'
import { ListEnvelope, DesignationList } from 'components'
import { parameterize } from 'utils/string'

export default React.createClass({
  displayName: 'Envelopes',

  propTypes: {
    selected: PropTypes.object,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
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
    const selectedEnvelope = R.find(
      (envelope) => parameterize(envelope.name) === paramEnvelope,
      this.data.envelopes)

    return (
      <div className={styles.wrapper}>
        <div className={styles.envelopes}>
          {this.data.envelopes.map((envelope) => (
            <ListEnvelope
              key={envelope.objectId}
              envelope={envelope}
              selected={envelope === selectedEnvelope} />
          ))}
        </div>
        <div className={styles.designationList}>
          {selectedEnvelope ?
            <DesignationList envelope={selectedEnvelope} /> :
            <div className={styles.blankSlate} />}
        </div>
      </div>
    )
  },
})

import React, { PropTypes } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { ListEnvelope, DesignationList } from 'components'

export default React.createClass({
  propTypes: {
    selected: PropTypes.object,
  },

  mixins: [ParseReact.Mixin],

  getDefaultProps() {
    return {
      onSelect: () => {},
      selected: {},
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

    return (
      <div className={styles.envelopes}>
        <div>
          {this.data.envelopes.map((envelope) => (
            <ListEnvelope
              key={envelope.objectId}
              envelope={envelope}
              selected={this.props.selected.objectId === envelope.objectId}
              onClick={() => this.setState({ selectedEnvelope: envelope })} />
          ))}
        </div>
        {this.state.selectedEnvelope && <DesignationList envelope={this.state.selectedEnvelope} />}
      </div>
    )
  },
})

import React, { PropTypes } from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { ListEnvelope } from 'components'

export default React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
    selected: PropTypes.object,
  },

  mixins: [ParseReact.Mixin],

  getDefaultProps() {
    return {
      onSelect: () => {},
      selected: {},
    }
  },

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  render() {
    return (
      <div>
        {this.data.envelopes.map((envelope) => (
          <ListEnvelope
            key={envelope.objectId}
            envelope={envelope}
            selected={this.props.selected.objectId === envelope.objectId}
            onClick={() => this.props.onSelect(envelope)} />
        ))}
      </div>
    )
  },
})

import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { money } from 'utils'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  render() {
    return (
      <div>
        {this.data.envelopes.map((envelope) => (
          <p key={envelope.id.objectId} style={{ marginBottom: '2rem' }}>
            Name: {envelope.name}<br />
            Amount: {money.centsToString(envelope.amountCents)}
          </p>
        ))}
      </div>
    )
  },
})

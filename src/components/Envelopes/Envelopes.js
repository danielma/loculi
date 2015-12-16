import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  render() {
    return (
      <div className='expenseCreator centered'>
        {this.data.envelopes.map((envelope) => (
          <p key={envelope.id.objectId}>
            Name: {envelope.name}
            AmountCents: {envelope.amountCents}
          </p>
        ))}
      </div>
    )
  }
})

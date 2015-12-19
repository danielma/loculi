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
    const styles = require("./Envelopes.sass")

    return (
      <div>
        {this.data.envelopes.map((envelope) => (
          <div className={styles.envelope} key={envelope.id.objectId}>
            Name: {envelope.name}<br />
            Amount: {money.centsToString(envelope.amountCents)}
          </div>
        ))}
      </div>
    )
  },
})

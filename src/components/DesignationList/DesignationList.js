import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { money } from 'utils'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe(props) {
    const designations = new Parse.Query('Designation')

    designations.
      equalTo('envelope', props.envelope).
      include('transaction')

    return { designations }
  },

  render() {
    return (
      <div>
        {this.data.designations.map((designation) => (
          <div key={designation.objectId}>
            {designation.transaction.payee}
            {money.centsToString(designation.amountCents)}
          </div>
        ))}
      </div>
    )
  },
})

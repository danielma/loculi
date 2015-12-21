import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import R from 'ramda'
import { money } from 'utils'
import Immutable from 'immutable'
import { Button, MoneyInput } from 'components'
import { observe } from 'utils/react'

const separateEnvelopes = R.groupBy((envelope) => {
  if (envelope.name === 'Income Cash Pool') {
    return 'income'
  }

  return 'normal'
})

// TODO: put this iside the envelopes page intelligently
export default React.createClass({
  displayName: 'NewFund',

  mixins: [ParseReact.Mixin],

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  getInitialState() {
    return {
      fundings: Immutable.Map({}),
    }
  },

  handleSubmit(e) {
    e.preventDefault()

    Parse.Cloud.run('createTransaction', {
      amountCents: this.getTotal(),
      payee: 'Funding',
      designations: this.state.fundings.
        map((amountCents, envelopeId) => ({ amountCents, envelopeId })).toArray(),
    })
  },

  setEnvelopeFunding({ objectId }, value) {
    const fundings = this.state.fundings.set(objectId, value)

    this.setState({ fundings })
  },

  getTotal() {
    return this.state.fundings.reduce((acc, amount) => acc + amount, 0)
  },

  getFunding({ objectId }) {
    return this.state.fundings.get(objectId)
  },

  render() {
    const { normal, income } = separateEnvelopes(this.data.envelopes)

    const incomeCents = income && income[0] && income[0].amountCents || 0

    const available = incomeCents - this.getTotal()

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {normal && normal.map((envelope) => (
            <div key={envelope.objectId}>
              <span>{envelope.name}: </span>
              <MoneyInput
                value={this.getFunding(envelope)}
                onChange={(value) => this.setEnvelopeFunding(envelope, value)} />
            </div>
          ))}

          <Button type="submit" disabled={available < 0}>Fund!</Button>
        </form>
        {income && <strong>
          You have {money.centsToString(available)} available for funding
        </strong>}
      </div>
    )
  },
})

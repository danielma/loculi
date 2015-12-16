import React from 'react'
import Parse from 'parse'
import ParseReact from 'parse-react'
import { Button } from 'components'

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  render() {
    return (
      <div className='expenseCreator centered'>
        <input
          className='name'
          type='text'
          ref='name'
          placeholder='File a new expense' />
        <input
          className='cost'
          type='text'
          ref='cost'
          placeholder='$0.00' />
        <select ref='envelope'>
          {[{ id: {} }].concat(this.data.envelopes).map(function(envelope) {
            return <option key={envelope.id.objectId} value={envelope.id.objectId}>{envelope.name}</option>
          })}
        </select>
        <Button onClick={this.addExpense}>
          Add expense +
        </Button>
      </div>
    )
  }
})

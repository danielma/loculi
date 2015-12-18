import React from 'react'
import Parse from 'parse'
import Immutable from 'immutable'
import ParseReact from 'parse-react'
import { Button } from 'components'

const emptyDesignation = Immutable.Map({
  amountCents: 0,
  envelopeId: null,
})

export default React.createClass({
  displayName: 'AddExpense',

  mixins: [ParseReact.Mixin],

  observe() {
    return { envelopes: new Parse.Query('Envelope') }
  },

  getInitialState() {
    return {
      transactionAmountCents: 0,
      designations: Immutable.List([emptyDesignation]),
      isIncome: false,
    }
  },

  componentWillUpdate() {
    console.log(this.state.designations.toJS())
  },

  stringToCents(string) {
    return Math.abs(parseFloat(string)) * 100 * (this.state.isIncome ? 1 : -1)
  },

  updateTransactionAmount(amountText) {
    this.setState({ transactionAmountCents: this.stringToCents(amountText) })
  },

  updateDesignationAmount(index, amountText) {
    const designations = this.state.designations.
      update(index, (designation) => (
        designation.merge({ amountText, amountCents: this.stringToCents(amountText) })
      ))

    this.setState({ designations })
  },

  updateDesignationEnvelope(index, envelopeId) {
    const designations = this.state.designations.
      update(index, (designation) => designation.set('envelopeId', envelopeId))

    this.setState({ designations })
  },

  addExpense() {
    Parse.Cloud.run('createTransaction', {
      amountCents: this.state.transactionAmountCents,
      payee: this.refs.payee.value,
      designations: this.state.designations.toJS(),
    })
  },

  addDesignation() {
    this.setState({ designations: this.state.designations.push(emptyDesignation) })
  },

  removeDesignation(index) {
    this.setState({ designations: this.state.designations.delete(index) })
  },

  isValid() {
    return [
      this.refs.payee && this.refs.payee.value.trim() !== '',
      this.state.transactionAmountCents === this.getDesignationTotal(),
      this.state.designations.every((designation) => designation.get('envelopeId')),
    ].every((bool) => bool === true)
  },

  getDesignationTotal() {
    return this.state.designations.
      reduce((acc, designation) => acc + designation.get('amountCents'), 0)
  },


  render() {
    return (
      <div className="expenseCreator centered">
        <input
          type="text"
          ref="payee"
          placeholder="File a new expense" />
        <input
          type="text"
          onChange={(e) => this.updateTransactionAmount(e.target.value)}
          placeholder="$0.00" />
        {this.state.designations.map((designation, index) => (
          <div key={index}>
            <input
              type="text"
              onChange={(e) => this.updateDesignationAmount(index, e.target.value)}
              value={designation.get('amountText')}
              placeholder="$0.00" />
            <select
              value={designation.get('envelopeId')}
              onChange={(e) => this.updateDesignationEnvelope(index, e.target.value)}>
              {[{}].concat(this.data.envelopes).map((envelope) => (
                <option key={envelope.objectId} value={envelope.objectId}>{envelope.name}</option>
              ))}
            </select>
            {index > 0 && <Button onClick={() => this.removeDesignation(index)}>-</Button>}
            <Button onClick={this.addDesignation}>+</Button>
          </div>
        ))}
        <Button onClick={this.addExpense} disabled={!this.isValid()}>
          Add expense +
        </Button>
      </div>
    )
  },
})

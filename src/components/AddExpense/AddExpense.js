import React from 'react'
import Parse from 'parse'
import Immutable from 'immutable'
import ParseReact from 'parse-react'
import { Button, MoneyInput } from 'components'
import { money } from 'utils'

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

  stringToCents(string) {
    return Math.abs(parseFloat(string)) * 100 * this.getSignMultiplier()
  },

  updateTransactionAmount(transactionAmountCents) {
    this.setState({ transactionAmountCents })
  },

  updateDesignationAmount(index, amountCents) {
    const designations = this.state.designations.
      update(index, (designation) => designation.set('amountCents', amountCents))

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
      payee: this.state.payee,
      designations: this.state.designations.toJS(),
    })
  },

  addDesignation() {
    this.setState({ designations: this.state.designations.push(emptyDesignation) })
  },

  removeDesignation(index) {
    this.setState({ designations: this.state.designations.delete(index) })
  },

  isValidAmount() {
    return this.getTransactionDesignationAmountDifference() === 0
  },

  isValid() {
    return [
      this.state.payee && (this.state.payee.trim() !== ''),
      this.isValidAmount(),
      this.state.designations.every((designation) => designation.get('envelopeId')),
    ].every((bool) => bool === true)
  },

  getTransactionDesignationAmountDifference() {
    return (
      (this.state.transactionAmountCents || 0) - this.getDesignationTotal()
    ) * this.getSignMultiplier()
  },

  getDesignationTotal() {
    return this.state.designations.
      reduce((acc, designation) => acc + designation.get('amountCents'), 0)
  },

  getSignMultiplier() {
    return this.state.isIncome ? 1 : -1
  },

  render() {
    return (
      <div className="expenseCreator centered">
        <input
          type="text"
          ref="payee"
          value={this.state.payee}
          onChange={(e) => this.setState({ payee: e.target.value })}
          placeholder="File a new expense" />
        <MoneyInput
          type="text"
          onChange={(value) => this.updateTransactionAmount(value)}
          reverseDisplay={!this.state.isIncome}
          value={this.state.transactionAmountCents} />
        {this.state.designations.map((designation, index) => (
          <div key={index}>
            <MoneyInput
              onChange={(value) => this.updateDesignationAmount(index, value)}
              reverseDisplay={!this.state.isIncome}
              value={designation.get('amountCents')} />
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
        {this.isValidAmount() || <p>
          Off by {money.centsToString(this.getTransactionDesignationAmountDifference())}!
        </p>}
        <Button onClick={this.addExpense} disabled={!this.isValid()}>
          Add expense +
        </Button>
      </div>
    )
  },
})

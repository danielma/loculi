import React, { PropTypes } from 'react'
import { Button } from 'components'
import { string } from 'utils'
import Parse from 'parse'

export default React.createClass({
  displayName: 'NewEnvelope',

  contextTypes: {
    history: PropTypes.object,
  },

  handleSubmit(e) {
    e.preventDefault()

    const envelope = new Parse.Object('Envelope')
    const name = this.refs.name.value
    const slug = string.parameterize(name)
    envelope.set('name', name)

    envelope.save().
      then(() => this.context.history.pushState({}, `/envelopes/${slug}`),
           () => this.setState({ error: true }))
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="name" placeholder="name" />

        <Button type="submit">Add</Button>
      </form>
    )
  },
})

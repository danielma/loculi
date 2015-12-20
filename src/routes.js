import React from 'react'
import { Route } from 'react-router'
import { App } from 'containers'
import * as components from 'components'

export default (
  <Route path="/" component={App}>
    <Route path="envelopes" component={components.Envelopes} />
    <Route path="add" component={components.AddTransaction} />
  </Route>
)

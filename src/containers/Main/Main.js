import React from 'react'
import { Envelopes, AddTransaction } from 'components'

export default function MainContainer() {
  return (
    <div>
      <Envelopes />
      <div style={{ height: "30px" }}></div>
      <AddTransaction />
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router'

export default function Sidebar() {
  return (
    <div>
      <Link to="/envelopes">Envelopes</Link>
      <Link to="/add">Add Transaction</Link>
    </div>
  )
}

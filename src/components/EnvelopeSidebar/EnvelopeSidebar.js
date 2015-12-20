import React from 'react'
import { ListEnvelope, Button } from 'components'
import styles from './EnvelopeSidebar.sass'

export default function EnvelopeSidebar({ envelopes, selected }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.envelopes}>
        {envelopes.map((envelope) => (
          <ListEnvelope
            key={envelope.objectId}
            envelope={envelope}
            selected={envelope === selected} />
        ))}
      </div>
      <div className={styles.footer}>
        <Button className="sm">+</Button>
      </div>
    </div>
  )
}

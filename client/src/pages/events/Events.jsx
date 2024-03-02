import React from 'react'
import { EventsSection } from 'src/components/Homepage/Homepage'
import styles from './Events.module.css'

const Events = () => {
  return (
    <div className={styles.eventsPage}>
      <EventsSection />
    </div>
  )
}

export default Events
Events.authGuard = false
Events.guestGuard = false
Events.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

Events.getLayout = page => <div>{page}</div>

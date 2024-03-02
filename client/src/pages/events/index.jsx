import React from 'react'
import { EventsSection } from 'src/components/Homepage/Homepage'
import styles from './Events.module.css'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'

const Events = () => {
  return (
    <CustomPagesLayout>
      <div className={styles.eventsPage}>
        <EventsSection />
      </div>
    </CustomPagesLayout>
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

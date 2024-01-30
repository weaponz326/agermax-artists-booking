import React, { useState } from 'react'
import Link from 'next/link'

const Finance = () => {
  return (
    <div>
      <h3>This page is a generic page that will be made dynamic and specific to users types who will login</h3>
      <h4>The following quick links can give you a preview for the finance pages;</h4>
      <p>Note: Check the browser URL to see the full route</p>
      <ul>
        <li>
          <Link href={'/admin/finance/admin'}>Admin Finance</Link>
        </li>
        <li>
          <Link href={'/admin/finance/organizer'}>Organizer Finance</Link>
        </li>
        <li>
          <Link href={'/admin/finance/artist'}>Artist Finance</Link>
        </li>
      </ul>
    </div>
  )
}

export default Finance

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

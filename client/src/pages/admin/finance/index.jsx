import styles from './Finance.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Finance = () => {
  return (
    <div className={styles.financePage}>
      <PaymentTable />
    </div>
  )
}

export default Finance

const data = [
  {
    paymentId: 'P001',
    payee: 'Event Organizer A',
    amount: 1500,
    date: '2024-01-30',
    status: 'Paid'
  },
  {
    paymentId: 'P002',
    payee: 'Event Organizer B',
    amount: 8500,
    date: '2024-02-18',
    status: 'Pending'
  }
  // add more payment objects here
]

const PaymentRow = ({ payment }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <tr>
      <td>{payment.paymentId}</td>
      <td>{payment.payee}</td>
      <td>{payment.amount}</td>
      <td>{payment.date}</td>
      <td>{payment.status}</td>
      <td>
        <ViewDetailsAction
          id={payment.paymentId}
          payee={payment.payee}
          amount={payment.amount}
          date={payment.date}
          status={payment.status}
        />
      </td>
    </tr>
  )
}

export const PaymentTable = () => {
  return (
    <table className={styles.paymentTable}>
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Payee</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(payment => (
          <PaymentRow key={payment.paymentId} payment={payment} />
        ))}
      </tbody>
    </table>
  )
}

export const ViewDetailsAction = ({ id, payee, amount, date, status }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push({ pathname: `/admin/finance/details/${id}`, query: { payee, amount, date, status } })}
      className={styles.viewDetailsActionWrapper}
    >
      View Details
    </div>
  )
}

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

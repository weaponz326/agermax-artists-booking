import styles from './Finance.module.css'
import React, { useState } from 'react'
import { Table } from 'antd'
import Link from 'next/link'
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
    date: '2022-02-15',
    status: 'Paid'
  },
  {
    paymentId: 'P002',
    payee: 'Event Organizer B',
    amount: 1500,
    date: '2022-02-15',
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
// export const FinancialTable = () => {
//   const router = useRouter()

//   // Sample data for the financial table
//   const data = [
//     {
//       paymentId: 'P001',
//       payee: 'Event Organizer A',
//       amount: 1500,
//       date: '2022-02-15',
//       status: 'Paid',
//       action: <ViewDetailsAction id={paymentId} />
//     },
//     {
//       paymentId: 'P002',
//       payee: 'Event Organizer B',
//       amount: 2000,
//       date: '2022-02-18',
//       status: 'Pending'
//       // action: <ViewDetailsAction id={this.paymentId} />
//     }
//     // Add more data as needed
//   ]

//   // Define columns for the table
//   const columns = [
//     {
//       title: 'Payment ID',
//       dataIndex: 'paymentId',
//       key: 'paymentId',
//       sorter: (a, b) => a.paymentId.localeCompare(b.paymentId)
//     },
//     {
//       title: 'Payee',
//       dataIndex: 'payee',
//       key: 'payee',
//       sorter: (a, b) => a.payee.localeCompare(b.payee)
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       sorter: (a, b) => a.amount - b.amount,
//       render: amount => `$${amount.toFixed(2)}` // Format amount as currency
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       sorter: (a, b) => new Date(a.date) - new Date(b.date)
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       sorter: (a, b) => a.status.localeCompare(b.status)
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       key: 'action',
//       sorter: (a, b) => a.action.localeCompare(b.action)
//     }
//   ]

//   return <Table dataSource={data} columns={columns} />
// }

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

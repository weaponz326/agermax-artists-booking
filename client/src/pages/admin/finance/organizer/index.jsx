import styles from './OrganizerFinance.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Table, Space, Dropdown } from 'antd'

const OrganizerFinance = () => {
  const initialData = [
    {
      paymentId: 'P001',
      payeeFirstName: 'Aka',
      payeeLastName: 'Ebenezer',
      payeeContact: '+233 544803023',
      amount: '1500',
      date: '2024-01-30',
      status: 'Paid'
    },
    {
      paymentId: 'P002',
      payeeFirstName: 'Kojo ',
      payeeLastName: 'Appiah',
      payeeContact: '+233 48235694',
      amount: '700',
      date: '2024-01-30',
      status: 'Pending'
    }
    // add more payment objects here
  ]
  const columns = [
    {
      title: 'Payee',
      dataIndex: 'payeeFirstName',
      key: 'paymentId',
      sorter: (a, b) => b.payeeFirstName.localeCompare(a.payeeFirstName),
      render: (text, record) => `${record.payeeFirstName} ${record.payeeLastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'payeeContact',
      key: 'payeeContact',
      sorter: (a, b) => a.payeeContact.localeCompare(b.payeeContact)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'paymentId',
      sorter: (a, b) => a.amount.localeCompare(b.amount)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'paymentId',
      sorter: (a, b) => a.date.localeCompare(b.date)
    },
    {
      title: 'Action',
      key: 'paymentId',
      render: (text, record) => (
        <Space size='middle'>
          <ViewDetailsAction
            id={record.paymentId}
            payee={`${record.payeeFirstName} ${record.payeeLastName}`}
            amount={record.amount}
            status={record.status}
          />
        </Space>
      )
    }
  ]

  return (
    <div className={styles.financePage}>
      <Table columns={columns} dataSource={initialData} />
    </div>
  )
}

export default OrganizerFinance

export const ViewDetailsAction = ({ id, payee, amount, date, status }) => {
  const router = useRouter()
  return (
    <div
      onClick={() =>
        router.push({ pathname: `/admin/finance/organizer/details/${id}`, query: { payee, amount, date, status } })
      }
      className={styles.viewDetailsActionWrapper}
    >
      View Details
    </div>
  )
}

OrganizerFinance.authGuard = false
OrganizerFinance.guestGuard = false
OrganizerFinance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

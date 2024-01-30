import styles from './AdminFinance.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Table, Space, Dropdown } from 'antd'
import { FinanceProvider, useFinanceContext } from './FinanceContext'

const initialData = [
  {
    paymentId: 'P001',
    payeeFirstName: 'Kofi',
    payeeLastName: 'Fosu',
    payeeContact: '+233 544803023',
    amount: '1500',
    date: '2024-01-30',
    status: 'Paid'
  },
  {
    paymentId: 'P002',
    payeeFirstName: 'Kojo ',
    payeeLastName: 'Appiah',
    payeeContact: '+233 482356946',
    amount: '700',
    date: '2024-01-30',
    status: 'Pending'
  }
  // add more payment objects here
]

const Finance = () => {
  return (
    <FinanceProvider>
      <AdminFinance />
    </FinanceProvider>
  )
}

export default Finance

export const AdminFinance = () => {
  // const [data, setData] = useState(initialData)
  const { data, updateData } = useFinanceContext()

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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export const ViewDetailsAction = ({ id, payee, amount, date, status }) => {
  const router = useRouter()
  return (
    <FinanceProvider>
      <div
        onClick={() =>
          router.push({
            pathname: `/admin/finance/admin/details/${id}`,
            query: { payee, amount, date, status }
          })
        }
        className={styles.viewDetailsActionWrapper}
      >
        View Details
      </div>
    </FinanceProvider>
  )
}

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

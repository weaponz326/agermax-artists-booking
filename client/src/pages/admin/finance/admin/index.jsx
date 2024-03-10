import styles from './AdminFinance.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Table, Space } from 'antd'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'

//Import Internal COmponents
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import AdminPagesNavBar from 'src/components/AdminPagesSharedComponents/AdminPagesNavBar/AdminPagesNavBar'

//Import from Material UI Components
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

//Import Providers & services
import { usePaymentsContext } from 'src/providers/PaymentsProvider'
import { useInvoiceContext } from 'src/providers/InvoiceProvider'
import { useAuth } from 'src/hooks/useAuth'

const Finance = () => {
  const { user } = useAuth()
  const [activeView, setActiveView] = useState('invoice')
  const { invoiceData } = useInvoiceContext()
  const { paymentsData } = usePaymentsContext()
  const [invoiceDataSource, setInvoiceDataSource] = useState([])
  const [paymentsDataSource, setPaymentsDataSource] = useState([])
  const [queriedInvoiceData, setQueriedInvoiceData] = useState(null)
  const [queriedPaymentData, setQueriedPaymentData] = useState(null)

  useEffect(() => {
    setQueriedInvoiceData(invoiceDataSource)
    setQueriedPaymentData(paymentsDataSource)
  }, [paymentsDataSource, invoiceDataSource])

  useEffect(() => {
    if (user && invoiceData && paymentsData) {
      if (user.role === 'admin') {
        setInvoiceDataSource(invoiceData)
        setPaymentsDataSource(paymentsData)
      } else if (user.role === 'organizer') {
        const filteredInvoiceData = invoiceData.filter(invoice => invoice.organizerId === user._id)
        setInvoiceDataSource(filteredInvoiceData)
        const filteredPaymentsData = paymentsData.filter(payment => payment.bookingOrganizerId === user._id)
        setPaymentsDataSource(filteredPaymentsData)
      }
    }
  }, [invoiceData, paymentsData, user])

  return (
    <>
      <AdminPagesNavBar
        activeView={activeView}
        setActiveView={setActiveView}
        invoiceDataSource={invoiceDataSource}
        setInvoiceDataSource={setInvoiceDataSource}
        paymentsDataSource={paymentsDataSource}
        setPaymentsDataSource={setPaymentsDataSource}
        queriedInvoiceData={queriedInvoiceData}
        queriedPaymentData={queriedPaymentData}
        setQueriedInvoiceData={setQueriedInvoiceData}
        setQueriedPaymentData={setQueriedPaymentData}
      />
      <AdminFinance
        activeView={activeView}
        queriedInvoiceData={queriedInvoiceData}
        queriedPaymentData={queriedPaymentData}
        setQueriedInvoiceData={setQueriedInvoiceData}
        setQueriedPaymentData={setQueriedPaymentData}
      />
    </>
  )
}

export default Finance

export const AdminFinance = ({ activeView, queriedInvoiceData, queriedPaymentData }) => {
  /****************Set up columns for table display***************/
  const invoicesColumns = [
    {
      title: 'Event',
      dataIndex: 'eventTitle',
      key: 'eventTitle',
      sorter: (a, b) => b.eventTitle.localeCompare(a.eventTitle),
      render: (text, event) => text
    },
    {
      title: 'Organizer',
      dataIndex: 'organizerFirstName',
      key: 'booker',
      sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
      render: (text, booker) => `${booker.organizerFirstName} ${booker.organizerLastName}`
    },
    {
      title: 'Phone',
      dataIndex: 'organizerContactPhone',
      key: 'organizerContactPhone',
      sorter: (a, b) => a.organizerContactPhone.localeCompare(b.organizerContactPhone)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Date',
      dataIndex: 'invoiceDate',
      key: 'date',
      sorter: (a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate),
      render: text => dayjs(text).format('YYYY-MM-DD')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Action',
      key: 'viewDetails',
      render: (_, invoice) => <ViewDetailsAction id={invoice._id} type={activeView} />
    }
  ]

  const paymentsColumns = [
    {
      title: 'Organizer',
      dataIndex: 'organizerFirstName',
      key: '1',
      sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
      render: (text, payment) => `${payment.organizerFirstName} ${payment.organizerLastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'organizerContactPhone',
      key: '2',
      sorter: (a, b) => a.organizerContactPhone.localeCompare(b.organizerContactPhone)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      sorter: (a, b) => a.amount - b.amount,
      render: amount => `${(amount / 100).toFixed(2)}`
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: '4',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: text => dayjs(text).format('YYYY-MM-DD')
    },

    {
      title: 'Action',
      key: 'viewDetails',
      render: (_, payment) => <ViewDetailsAction id={payment._id} type={activeView} />
    }
  ]

  if (activeView === 'invoice') {
    return (
      <div className={styles.financePage}>
        <h4>Invoices</h4>
        <Table columns={invoicesColumns} dataSource={queriedInvoiceData} />
      </div>
    )
  } else if (activeView === 'payments') {
    return (
      <div className={styles.financePage}>
        <h4>Payments</h4>
        <Table columns={paymentsColumns} dataSource={queriedPaymentData} />
      </div>
    )
  }
}

// AdminFinance component part

export const ViewDetailsAction = ({ id, type }) => {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/admin/finance/admin/details/${id}?type=${type}`)
  }

  return (
    <div onClick={handleViewDetails} className={styles.viewDetailsActionWrapper}>
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

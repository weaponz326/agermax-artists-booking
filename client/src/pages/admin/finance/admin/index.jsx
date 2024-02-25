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
import { updateInvoice } from 'src/services/invoice'
import dayjs from 'dayjs'

//Import Providers
import PaymentsProvider, { usePaymentsContext } from 'src/providers/PaymentsProvider'
import InvoiceProvider, { useInvoiceContext } from 'src/providers/InvoiceProvider'

const Finance = () => {
  const [activeView, setActiveView] = useState('Invoices')
  return (
    <InvoiceProvider>
      <PaymentsProvider>
        <AdminPagesNavBar activeView={activeView} setActiveView={setActiveView} />
        <AdminFinance activeView={activeView} setActiveView={setActiveView} />
      </PaymentsProvider>
    </InvoiceProvider>
  )
}

export default Finance

export const AdminFinance = ({ activeView, setActiveView }) => {
  const [invoiceDataSource, setInvoiceDataSource] = useState([])
  const [paymentsDataSource, setPaymentsDataSource] = useState([])
  const { invoiceData } = useInvoiceContext()
  const { paymentsData } = usePaymentsContext()

  /****************Fetch Details for table display***************/
  useEffect(() => {
    if (invoiceData) setInvoiceDataSource(invoiceData)
    if (paymentsData) setPaymentsDataSource(paymentsData)
  }, [invoiceData, paymentsData])

  const invoicesColumns = [
    {
      title: 'Organizer',
      dataIndex: 'organizerFirstName',
      key: 'booker',
      sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
      render: (text, booker) => `${booker.organizerFirstName} ${booker.organizerLastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      sorter: (a, b) => a.contactPhone.localeCompare(b.contactPhone)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount.localeCompare(b.amount)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date)
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (text, booker) => (
        <Space size='middle'>
          <ViewInvoiceAction booker={booker} />
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'viewDetails',
      render: (text, booker) => (
        <Space size='middle'>
          <ViewDetailsAction booker={booker} />
        </Space>
      )
    }
  ]

  const paymentsColumns = [
    {
      title: 'Organizer',
      dataIndex: 'name',
      key: '1',
      sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
      render: (text, booker) => `${booker.organizerFirstName} ${booker.organizerLastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'contactPhone',
      key: '2',
      sorter: (a, b) => a.contactPhone.localeCompare(b.contactPhone)
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '3',
      sorter: (a, b) => a.amount.localeCompare(b.amount)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '4',
      sorter: (a, b) => a.date.localeCompare(b.date)
    },
    {
      title: 'Invoice',
      key: '5',
      render: (text, booker) => (
        <Space size='middle'>
          <ViewInvoiceAction booker={booker} />
        </Space>
      )
    },
    {
      title: 'Status',
      key: '6',
      render: (text, booker) => (
        <Space size='middle'>
          <ViewInvoiceAction booker={booker} />
        </Space>
      )
    },

    {
      title: 'Action',
      key: '7',
      render: (text, booker) => (
        <Space size='middle'>
          <ViewDetailsAction booker={booker} />
        </Space>
      )
    }
  ]

  if (activeView === 'Invoices') {
    return (
      <div className={styles.financePage}>
        <h4>Invoices</h4>
        <Table columns={invoicesColumns} dataSource={invoiceDataSource} />
      </div>
    )
  } else {
    return (
      <div className={styles.financePage}>
        <h4>Payments</h4>
        <Table columns={paymentsColumns} dataSource={paymentsDataSource} />
      </div>
    )
  }
}

export const ViewDetailsAction = ({ booker }) => {
  console.log(booker)
  const router = useRouter()
  return (
    <InvoiceProvider>
      <div
        onClick={() =>
          router.push({
            pathname: `/admin/finance/admin/details/${booker._id}`,
            query: { booker }
          })
        }
        className={styles.viewDetailsActionWrapper}
      >
        View Details
      </div>
    </InvoiceProvider>
  )
}

export const ViewInvoiceAction = ({ booker }) => {
  /****************Fetch Modal***************/
  const [openModal, setOpenModal] = useState(false)
  function unhideModal() {
    // if (user) {
    setOpenModal(true)
    // } else {
    //   logout()
    // }
  }

  function hideModal() {
    setOpenModal(false)
  }

  return (
    <InvoiceProvider>
      <div onClick={unhideModal} className={styles.viewDetailsActionWrapper}>
        Invoice
      </div>
      <SlideInModal
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
        modalContent={<InvoiceModalContent booker={booker} />}
        SubmitButton={'Submit'}
      />
    </InvoiceProvider>
  )
}

export const InvoiceModalContent = ({ booker }) => {
  /****************Invoice Data***************/
  const [invoiceData, setInvoiceData] = useState({
    booking: booker && booker._id,
    amount: booker?.amount || '',
    tax: booker?.tax || '',
    email: booker?.email || '',
    status: booker?.status || '',
    invoiceDate: dayjs(booker?.invoiceDate) || '',
    paymentDueDate: dayjs(booker?.paymentDueDate) || ''
  })

  const handleChange = e => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateInvoice = async e => {
    e.preventDefault()
    try {
      const newInvoice = await updateInvoice(invoiceData)
      console.log('Invoice updated Successfully! : ', newInvoice)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error update invoice: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className={styles.modalCardContentUserDetails} onSubmit={handleUpdateInvoice}>
        <h3 style={{ margin: '0' }}>Invoice Details</h3>
        <TextField
          placeholder='Amount'
          className={styles.modalCardContentInputField}
          type='text'
          name='amount'
          id='amount'
          value={invoiceData.amount}
          onChange={handleChange}
          required
          label='Invoice Amount'
          size='small'
          variant='outlined'
        />
        <TextField
          placeholder='Tax ID'
          className={styles.modalCardContentInputField}
          type='text'
          name='tax'
          id='tax'
          value={invoiceData.tax}
          onChange={handleChange}
          required
          label='Tax ID'
          size='small'
          variant='outlined'
        />
        <TextField
          placeholder='Payee Email'
          className={styles.modalCardContentInputField}
          type='email'
          name='email'
          id='email'
          value={invoiceData.email}
          onChange={handleChange}
          required
          label='Payee Email'
          size='small'
          variant='outlined'
        />
        <TextField
          placeholder='Booking Status'
          className={styles.modalCardContentInputField}
          type='email'
          name='email'
          id='email'
          value={invoiceData.status}
          onChange={handleChange}
          required
          label='Booking Status'
          size='small'
          variant='outlined'
        />

        <DatePicker
          className={styles.modalCardContentInputField}
          label='Invoice Date'
          value={invoiceData.invoiceDate}
          // minDate={nextDay} // Set the minimum selectable date to be the next day
          onChange={date => setInvoiceData({ ...invoiceData, invoiceDate: date })}
          renderInput={params => <TextField {...params} required />}
          disablePast
        />
        <DatePicker
          className={styles.modalCardContentInputField}
          label='Payment Due Date'
          value={invoiceData.paymentDueDate}
          // minDate={nextDay} // Set the minimum selectable date to be the next day
          onChange={date => setInvoiceData({ ...invoiceData, paymentDueDate: date })}
          renderInput={params => <TextField {...params} required />}
          disablePast
        />
        <TabButton className={styles.modalCardContentSaveButton}>Update</TabButton>
      </form>
    </LocalizationProvider>
  )
}

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

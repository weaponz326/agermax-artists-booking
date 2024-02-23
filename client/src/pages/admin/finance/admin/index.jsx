import styles from './AdminFinance.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Table, Space } from 'antd'
import InvoiceProvider, { useInvoiceContext } from 'src/providers/InvoiceProvider'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'

//Import from Material UI Components
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { updateInvoice } from 'src/services/invoice'

const Finance = () => {
  return (
    <InvoiceProvider>
      <AdminFinance />
    </InvoiceProvider>
  )
}

export default Finance

export const AdminFinance = () => {
  // const [data, setData] = useState(initialData)
  const { data, updateData } = useInvoiceContext()

  const columns = [
    {
      title: 'Payee',
      dataIndex: 'payeeFirstName',
      key: 'payeeName',
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
      render: (text, record) => (
        <Space size='middle'>
          <ViewInvoiceAction
            id={record.paymentId}
            payee={`${record.payeeFirstName} ${record.payeeLastName}`}
            amount={record.amount}
            status={record.status}
          />
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'viewDetails',
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
    <InvoiceProvider>
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
    </InvoiceProvider>
  )
}

export const ViewInvoiceAction = ({ id, payee, amount, date, status }) => {
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
        modalContent={<InvoiceModalContent />}
        SubmitButton={'Submit'}
      />
    </InvoiceProvider>
  )
}

export const InvoiceModalContent = () => {
  /****************Invoice Data***************/
  const [invoiceData, setInvoiceData] = useState({
    // booking: booking && booking._id,
    amount: '',
    tax: '',
    email: '',
    status: '',
    invoiceDate: '',
    paymentDueDate: ''
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
          defaultValue={invoiceData.amount}
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
          defaultValue={invoiceData.tax}
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
          defaultValue={invoiceData.email}
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
          defaultValue={invoiceData.status}
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

      {/* <div className={styles.bookingActionButtons}>
        <TabButton className={styles.modalCardContentSaveButton}>View Details</TabButton>
      </div> */}
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

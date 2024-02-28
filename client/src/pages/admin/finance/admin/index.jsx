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
import PaymentsProvider, { usePaymentsContext } from 'src/providers/PaymentsProvider'
import InvoiceProvider, { useInvoiceContext } from 'src/providers/InvoiceProvider'
import { updateInvoice } from 'src/services/invoice'

const Finance = () => {
  const [activeView, setActiveView] = useState('invoice')
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
    if (invoiceData) {
      setInvoiceDataSource(invoiceData)
    }
    if (paymentsData) {
      setPaymentsDataSource(paymentsData)
    }
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
        <Table columns={invoicesColumns} dataSource={invoiceDataSource} />
      </div>
    )
  } else if (activeView === 'payments') {
    return (
      <div className={styles.financePage}>
        <h4>Payments</h4>
        <Table columns={paymentsColumns} dataSource={paymentsDataSource} />
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

// export const ViewInvoiceAction = ({ invoice }) => {
//   /****************Fetch Modal***************/
//   const [openModal, setOpenModal] = useState(false)
//   function unhideModal() {
//     setOpenModal(true)
//   }

//   function hideModal() {
//     setOpenModal(false)
//   }

//   return (
//     <InvoiceProvider>
//       <div onClick={unhideModal} className={styles.viewDetailsActionWrapper}>
//         Invoice
//       </div>
//       <SlideInModal
//         openModal={openModal}
//         unhideModal={unhideModal}
//         hideModal={hideModal}
//         modalContent={<InvoiceModalContent invoice={invoice} />}
//         SubmitButton={'Submit'}
//       />
//     </InvoiceProvider>
//   )
// }

// export const InvoiceModalContent = ({ invoice }) => {
//   /****************Snack Bar***************/
//   const [open, setOpen] = useState(false)
//   const handleClick = () => {
//     setOpen(true)
//   }

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return
//     }

//     setOpen(false)
//   }

//   /****************Invoice Data***************/
//   const [invoiceData, setInvoiceData] = useState({
//     _id: invoice && invoice._id,
//     amount: invoice?.amount || '',
//     tax: invoice?.tax || '',
//     email: invoice?.email || '',
//     status: invoice?.status || '',
//     invoiceDate: dayjs(invoice?.invoiceDate) || '',
//     paymentDueDate: dayjs(invoice?.paymentDueDate) || ''
//   })

//   const handleChange = e => {
//     setInvoiceData({
//       ...invoiceData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleUpdateInvoice = async e => {
//     e.preventDefault()

//     try {
//       const newInvoice = await updateInvoice(invoiceData)
//       console.log('Invoice updated Successfully! : ', newInvoice)
//       setOpen(true)
//       // Optionally, you can redirect or perform any other action after successful booking creation
//     } catch (error) {
//       console.error('Error update invoice: ', error)
//       // Handle error, e.g., display an error message to the user
//     }
//   }

//   /****************Render*******************/
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <form className={styles.modalCardContentUserDetails} onSubmit={handleUpdateInvoice}>
//         <h3 style={{ margin: '0' }}>Invoice Details</h3>
//         <TextField
//           placeholder='Amount'
//           className={styles.modalCardContentInputField}
//           type='text'
//           name='amount'
//           id='amount'
//           value={invoiceData.amount}
//           onChange={handleChange}
//           required
//           label='Invoice Amount'
//           size='small'
//           variant='outlined'
//         />
//         <TextField
//           placeholder='Tax ID'
//           className={styles.modalCardContentInputField}
//           type='text'
//           name='tax'
//           id='tax'
//           value={invoiceData.tax}
//           onChange={handleChange}
//           required
//           label='Tax ID'
//           size='small'
//           variant='outlined'
//         />
//         <TextField
//           placeholder='Payee Email'
//           className={styles.modalCardContentInputField}
//           type='email'
//           name='email'
//           id='email'
//           value={invoiceData.email}
//           onChange={handleChange}
//           required
//           label='Payee Email'
//           size='small'
//           variant='outlined'
//         />

//         <DatePicker
//           className={styles.modalCardContentInputField}
//           label='Invoice Date'
//           value={invoiceData.invoiceDate}
//           // minDate={nextDay} // Set the minimum selectable date to be the next day
//           onChange={date => setInvoiceData({ ...invoiceData, invoiceDate: date })}
//           renderInput={params => <TextField {...params} required />}
//           disablePast
//         />
//         <DatePicker
//           className={styles.modalCardContentInputField}
//           label='Payment Due Date'
//           value={invoiceData.paymentDueDate}
//           // minDate={nextDay} // Set the minimum selectable date to be the next day
//           onChange={date => setInvoiceData({ ...invoiceData, paymentDueDate: date })}
//           renderInput={params => <TextField {...params} required />}
//           disablePast
//         />
//         <h3>Select Payment Status: </h3>
//         <select
//           className={styles.modalCardContentInputField}
//           name='status'
//           id='status'
//           value={invoiceData.status}
//           onChange={e => setInvoiceData({ ...invoiceData, status: e.target.value })}
//         >
//           <option value='unpaid' selected>
//             Unpaid
//           </option>
//           <option value='underReview'>Under Review</option>
//           <option value='paid'>Paid</option>
//         </select>
//         <TabButton className={styles.modalCardContentSaveButton}>Update</TabButton>
//       </form>
//       <Snackbar
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleClose} severity='success' variant='filled' sx={{ width: '100%' }}>
//           Invoice Updated Successfully!
//         </Alert>
//       </Snackbar>
//     </LocalizationProvider>
//   )
// }

Finance.authGuard = false
Finance.guestGuard = false
Finance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// Finance.getLayout = page => <div>{page}</div>

import React from 'react'
import Finance from '../admin'

const OrganizerFinance = () => {
  return <Finance />
}

export default OrganizerFinance

// import styles from './OrganizerFinance.module.css'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { Avatar, Table, Space, Dropdown } from 'antd'
// import { useAuth } from 'src/hooks/useAuth'
// import { useInvoiceContext } from 'src/providers/InvoiceProvider'
// import { usePaymentsContext } from 'src/providers/PaymentsProvider'
// import { AdminPagesNavBar } from '../../bookings/admin'

// const Finance = () => {
//   const { user } = useAuth()
//   const [activeView, setActiveView] = useState('invoice')
//   const { invoiceData } = useInvoiceContext()
//   const { paymentsData } = usePaymentsContext()
//   const [invoiceDataSource, setInvoiceDataSource] = useState([])
//   const [paymentsDataSource, setPaymentsDataSource] = useState([])

//   return (
//     <>
//       <AdminPagesNavBar
//         activeView={activeView}
//         setActiveView={setActiveView}
//         invoiceDataSource={invoiceDataSource}
//         setInvoiceDataSource={setInvoiceDataSource}
//         paymentsDataSource={paymentsDataSource}
//         setPaymentsDataSource={setPaymentsDataSource}
//       />
//       <OrganizerFinance
//         activeView={activeView}
//         setActiveView={setActiveView}
//         invoiceData={invoiceData}
//         paymentsData={paymentsData}
//         invoiceDataSource={invoiceDataSource}
//         setInvoiceDataSource={setInvoiceDataSource}
//         paymentsDataSource={paymentsDataSource}
//         setPaymentsDataSource={setPaymentsDataSource}
//         user={user}
//       />
//     </>
//   )
// }

// export default Finance

// export const OrganizerFinance = ({
//   user,
//   activeView,
//   setActiveView,
//   invoiceData,
//   paymentsData,
//   invoiceDataSource,
//   setInvoiceDataSource,
//   paymentsDataSource,
//   setPaymentsDataSource
// }) => {
//   /****************Fetch Details for table display***************/
//   useEffect(() => {
//     if (invoiceData) {
//       const filteredInvoiceData = invoiceData.filter(invoice => invoice.booking.organizerID === user._id)
//       setInvoiceDataSource(filteredInvoiceData)
//     }
//     if (paymentsData) {
//       const filteredPaymentsData = paymentsData.filter(payment => payment.organizerID === user._id)
//       setPaymentsDataSource(filteredPaymentsData)
//     }
//   }, [invoiceData, paymentsData])

//   const invoicesColumns = [
//     {
//       title: 'Organizer',
//       dataIndex: 'organizerFirstName',
//       key: 'booker',
//       sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
//       render: (text, booker) => `${booker.organizerFirstName} ${booker.organizerLastName}`
//     },

//     {
//       title: 'Phone',
//       dataIndex: 'organizerContactPhone',
//       key: 'organizerContactPhone',
//       sorter: (a, b) => a.organizerContactPhone.localeCompare(b.organizerContactPhone)
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       sorter: (a, b) => a.amount - b.amount
//     },
//     {
//       title: 'Date',
//       dataIndex: 'invoiceDate',
//       key: 'date',
//       sorter: (a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate),
//       render: text => dayjs(text).format('YYYY-MM-DD')
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       sorter: (a, b) => a.status.localeCompare(b.status)
//     },
//     {
//       title: 'Action',
//       key: 'viewDetails',
//       render: (_, invoice) => <ViewDetailsAction id={invoice._id} type={activeView} />
//     }
//   ]

//   const paymentsColumns = [
//     {
//       title: 'Organizer',
//       dataIndex: 'organizerFirstName',
//       key: '1',
//       sorter: (a, b) => b.organizerFirstName.localeCompare(a.organizerFirstName),
//       render: (text, payment) => `${payment.organizerFirstName} ${payment.organizerLastName}`
//     },

//     {
//       title: 'Phone',
//       dataIndex: 'organizerContactPhone',
//       key: '2',
//       sorter: (a, b) => a.organizerContactPhone.localeCompare(b.organizerContactPhone)
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: '3',
//       sorter: (a, b) => a.amount - b.amount,
//       render: amount => `${(amount / 100).toFixed(2)}`
//     },
//     {
//       title: 'Date',
//       dataIndex: 'createdAt',
//       key: '4',
//       sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
//       render: text => dayjs(text).format('YYYY-MM-DD')
//     },

//     {
//       title: 'Action',
//       key: 'viewDetails',
//       render: (_, payment) => <ViewDetailsAction id={payment._id} type={activeView} />
//     }
//   ]

//   if (activeView === 'invoice') {
//     return (
//       <div className={styles.financePage}>
//         <h4>Invoices</h4>
//         <Table columns={invoicesColumns} dataSource={invoiceDataSource} />
//       </div>
//     )
//   } else if (activeView === 'payments') {
//     return (
//       <div className={styles.financePage}>
//         <h4>Payments</h4>
//         <Table columns={paymentsColumns} dataSource={paymentsDataSource} />
//       </div>
//     )
//   }
// }

// export const ViewDetailsAction = ({ id, type }) => {
//   const router = useRouter()

//   const handleViewDetails = () => {
//     router.push(`/admin/finance/organizer/details/${id}?type=${type}`)
//   }

//   return (
//     <div onClick={handleViewDetails} className={styles.viewDetailsActionWrapper}>
//       View Details
//     </div>
//   )
// }

OrganizerFinance.authGuard = false
OrganizerFinance.guestGuard = false
OrganizerFinance.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// OrganizerFinance.getLayout = page => <div>{page}</div>

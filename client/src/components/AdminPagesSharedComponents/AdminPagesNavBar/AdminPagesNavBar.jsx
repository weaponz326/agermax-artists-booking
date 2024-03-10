import { DatePicker } from 'antd'
import TabButton from '../ViewTab/TabButton'
import SearchBar from '../SearchBar/SearchBar'
import styles from './AdminPagesNavBar.module.css'
import { GridFilterAltIcon } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const AdminPagesNavBar = ({
  setActiveView,
  activeView,
  invoiceDataSource,
  setInvoiceDataSource,
  paymentsDataSource,
  setPaymentsDataSource
}) => {
  const [query, setQuery] = useState('')
  const [queriedInvoiceData, setQueriedInvoiceData] = useState(null)
  const [queriedPaymentData, setQueriedPaymentData] = useState(null)

  useEffect(() => {
    setQueriedInvoiceData(invoiceDataSource)
    setQueriedPaymentData(paymentsDataSource)
  }, [paymentsDataSource, invoiceDataSource])

  /*********Handle Search Query************** */
  function handleQueryChange(e) {
    const value = e.target.value
    setQuery(value)

    if (activeView === 'invoice' && invoiceDataSource) {
      if (!value.trim()) {
        // If query is empty, show all invoiceDataSource
        setInvoiceDataSource(invoiceDataSource)
      } else {
        // Otherwise, filter invoiceDataSource based on the query
        const filteredList = invoiceDataSource.filter(
          invoice =>
            invoice.email.toLowerCase().includes(value.toLowerCase()) ||
            invoice.organizerFirstName.toLowerCase().includes(value.toLowerCase()) ||
            invoice.organizerLastName.toLowerCase().includes(value.toLowerCase())
        )
        setInvoiceDataSource(filteredList)
      }
    }
    if (activeView === 'payments' && paymentsDataSource) {
      if (!value.trim()) {
        // If query is empty, show all paymentsDataSource
        setPaymentsDataSource(paymentsDataSource)
      } else {
        // Otherwise, filter paymentsDataSource based on the query
        const filteredList = paymentsDataSource.filter(
          payment =>
            payment.email.toLowerCase().includes(value.toLowerCase()) ||
            payment.organizerFirstName.toLowerCase().includes(value.toLowerCase()) ||
            payment.organizerLastName.toLowerCase().includes(value.toLowerCase())
        )
        setPaymentsDataSource(filteredList)
      }
    }
  }

  return (
    <nav className={styles.navigationPanel}>
      <div className={styles.calendarViewTabs}>
        <ViewStyleTabs setActiveView={setActiveView} activeView={activeView} />
        <div className={styles.searchBar}>
          <SearchBar
            onChange={handleQueryChange}
            placeholder={activeView === 'invoice' ? 'Search Invoice ...' : 'Search Payments ...'}
            value={query}
          />
        </div>
      </div>
    </nav>
  )
}

export default AdminPagesNavBar

export const ViewStyleTabs = ({ activeView, setActiveView, handleTabSelection }) => {
  return (
    <div className={styles.viewStylesTabs}>
      <TabButton
        id={'1'}
        onClick={() => setActiveView('invoice')}
        className={activeView === 'invoice' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        Invoices
      </TabButton>
      <TabButtonDivider />

      <TabButton
        id={'2'}
        onClick={() => setActiveView('payments')}
        className={activeView === 'payments' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        Payments
      </TabButton>
    </div>
  )
}

export const TabButtonDivider = () => {
  const style = {
    height: '1.5em',
    width: '2px',
    padding: '0',
    backgroundColor: '#ddd',
    margin: 'auto 5px'
  }

  return <div style={style} className={styles.tabButtonDivider}></div>
}

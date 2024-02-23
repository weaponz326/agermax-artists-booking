import { DatePicker } from 'antd'
import TabButton from '../ViewTab/TabButton'
import SearchBar from '../SearchBar/SearchBar'
import styles from './AdminPagesNavBar.module.css'
import { GridFilterAltIcon } from '@mui/x-data-grid'

const AdminPagesNavBar = ({ setActiveView, activeView }) => {
  return (
    <nav className={styles.navigationPanel}>
      <div className={styles.calendarViewTabs}>
        <ViewStyleTabs setActiveView={setActiveView} activeView={activeView} />
        <div className={styles.searchBar}>
          <SearchBar placeholder={activeView === 'Invoices' ? 'Search Invoice' : 'Search Payments'} />
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
        onClick={() => setActiveView('Invoices')}
        className={activeView === 'Invoices' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        Invoices
      </TabButton>
      <TabButtonDivider />

      <TabButton
        id={'2'}
        onClick={() => setActiveView('Payments')}
        className={activeView === 'Payments' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
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

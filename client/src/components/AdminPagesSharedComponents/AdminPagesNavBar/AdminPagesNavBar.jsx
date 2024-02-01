import { DatePicker } from 'antd'
import TabButton from '../ViewTab/TabButton'
import SearchBar from '../SearchBar/SearchBar'
import styles from './AdminPagesNavBar.module.css'
import { GridFilterAltIcon } from '@mui/x-data-grid'

const AdminPagesNavBar = ({ setActiveEventsView, activeEventsView }) => {
  function handleTabSelection(e) {
    setActiveEventsView(e.target.id)
  }
  return (
    <nav className={styles.navigationPanel}>
      <div className={styles.calendarViewTabs}>
        <div className={styles.dateFilter}>
          <TabButton className={styles.selectMonth}>
            <div className={styles.selectMonthContent}>
              <DatePicker style={{ border: 'none' }} />
            </div>
          </TabButton>
          <TabButton className={styles.filterTab}>
            <div className={styles.filterTabContent}>
              <GridFilterAltIcon />
              <span>Filter</span>
            </div>
          </TabButton>
        </div>
        <ViewStyleTabs setActiveEventsView={setActiveEventsView} activeEventsView={activeEventsView} />
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default AdminPagesNavBar

export const ViewStyleTabs = ({ activeEventsView, setActiveEventsView }) => {
  return (
    <div className={styles.viewStylesTabs}>
      <TabButton
        id={'ThreeDView'}
        onClick={e => handleTabSelection(e)}
        className={activeEventsView === 'ThreeDView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        D
      </TabButton>      

      <TabButton
        id={'WeekView'}
        onClick={e => handleTabSelection(e)}
        className={activeEventsView === 'WeekView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        W
      </TabButton>
      <TabButtonDivider />

      <TabButtonDivider />
      <TabButton
        id={'MonthView'}
        onClick={e => handleTabSelection(e)}
        className={activeEventsView === 'MonthView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        M
      </TabButton>
      <TabButtonDivider />
      
      <TabButton
        id={'ListView'}
        onClick={e => handleTabSelection(e)}
        className={activeEventsView === 'ListView' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        List
      </TabButton>
    </div>
  )
}

export const TabButtonDivider = () => {
  const style = {
    height: '80%',
    width: '2px',
    padding: '0',
    backgroundColor: '#ddd',
    margin: 'auto 0'
  }

  return <div style={style} className={styles.tabButtonDivider}></div>
}

import { DatePicker } from 'antd'
import TabButton from '../ViewTab/TabButton'
import SearchBar from '../SearchBar/SearchBar'
import styles from './AdminUsersPageNavBar.module.css'
import { GridFilterAltIcon } from '@mui/x-data-grid'
import { useState } from 'react'

const AdminUsersPageNavBar = ({ setActiveEventsView, activeEventsView }) => {
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
        <AdminUsersPageViewStyleTabs setActiveEventsView={setActiveEventsView} activeEventsView={activeEventsView} />
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default AdminUsersPageNavBar

export const AdminUsersPageViewStyleTabs = ({ usersData, usersList, setUsersList, query, setQuery }) => {
  const [activeView, setActiveView] = useState('1')

  function handleTabSelection(e) {
    setActiveView(e.target.id)
    setQuery('')

    e.target.id === '1' && setUsersList(usersData)
    e.target.id === '2' && setUsersList(usersData.filter(users => users.type === 'Artist'))
    e.target.id === '3' && setUsersList(usersData.filter(users => users.type === 'Organizer'))
    e.target.id === '4' && setUsersList(usersData.filter(users => users.type === 'Staff'))
  }
  return (
    <div className={styles.viewStylesTabs}>
      <TabButton
        id={'1'}
        onClick={e => handleTabSelection(e)}
        className={activeView === '1' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        All
      </TabButton>

      <TabButtonDivider />
      <TabButton
        id={'2'}
        onClick={e => handleTabSelection(e)}
        className={activeView === '2' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        A
      </TabButton>
      <TabButtonDivider />

      <TabButton
        id={'3'}
        onClick={e => handleTabSelection(e)}
        className={activeView === '3' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        O
      </TabButton>
      <TabButtonDivider />

      <TabButton
        id={'4'}
        onClick={e => handleTabSelection(e)}
        className={activeView === '4' ? `${styles.listViewTab} ${styles.activeTab}` : styles.listViewTab}
      >
        S
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
    margin: 'auto 3px'
  }

  return <div style={style} className={styles.tabButtonDivider}></div>
}

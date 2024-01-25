// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import UsersListTable from 'src/components/AdminPagesSharedComponents/UsersListTable/UsersListTable'
import AdminPagesNavBar, {
  ViewStyleTabs
} from 'src/components/AdminPagesSharedComponents/AdminPagesNavBar/AdminPagesNavBar'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import styles from './users.module.css'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import SidebarAddUser from './AddUserDrawer'

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [users, setUsers] = useState([])

  return (
    <div className={styles.usersListPage}>
      <nav className={styles.usersListPageNavBar}>
        <SearchBar />
        <ViewStyleTabs />
        <TabButton className={styles.usersListPageNavBarAddUsersBtn}>Add Users</TabButton>
      </nav>
      <UsersListTable className={styles.usersListPageListTable} setOpenModal={setOpenModal} />
      <SlideInModal openModal={openModal} />
    </div>
  )
}

export default UsersListPage

UsersListPage.authGuard = false
UsersListPage.guestGuard = false
UsersListPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// UsersListPage.getLayout = page => <div>{page}</div>

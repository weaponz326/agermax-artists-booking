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
import { AdminUsersPageViewStyleTabs } from 'src/components/AdminPagesSharedComponents/AdminUsersPageNavBar/AdminUsersPageNavBar'

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [users, setUsers] = useState([])

  function unhideModal() {
    setOpenModal(true)
    console.log('unhide')
  }

  function hideModal() {
    setOpenModal(false)
  }

  return (
    <div className={styles.usersListPage}>
      <nav className={styles.usersListPageNavBar}>
        <SearchBar />
        <AdminUsersPageViewStyleTabs />
        <TabButton onClick={unhideModal} className={styles.usersListPageNavBarAddUsersBtn}>
          Add Users
        </TabButton>
      </nav>
      <UsersListTable
        className={styles.usersListPageListTable}
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
      />
      <SlideInModal openModal={openModal} unhideModal={unhideModal} hideModal={hideModal} />
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

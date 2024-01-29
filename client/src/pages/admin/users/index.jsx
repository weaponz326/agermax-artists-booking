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
import axios from 'axios'
import usersData from './Music Artists Data'

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [usersList, setUsersList] = useState(usersData)
  const [query, setQuery] = useState('')

  // useEffect(() => {
  //   //Fetch Users List Data with Axios
  //   const fetchUsers = async () => {
  //     try {
  //       const usersData = await axios.get('https://api.mockaroo.com/api/7e49e110?count=100&key=15462290')
  //       setUsersList(usersData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchUsers()
  // }, [])

  function unhideModal() {
    setOpenModal(true)
  }

  function hideModal() {
    setOpenModal(false)
  }

  return (
    <div className={styles.usersListPage}>
      <nav className={styles.usersListPageNavBar}>
        <SearchBar
          usersList={usersList}
          setUsersList={setUsersList}
          usersData={usersData}
          query={query}
          setQuery={setQuery}
        />
        <AdminUsersPageViewStyleTabs
          usersData={usersData}
          usersList={usersList}
          setUsersList={setUsersList}
          query={query}
          setQuery={setQuery}
        />
        <TabButton onClick={unhideModal} className={styles.usersListPageNavBarAddUsersBtn}>
          Add Users
        </TabButton>
      </nav>
      <UsersListTable
        className={styles.usersListPageListTable}
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
        usersList={usersList}
        setUsersList={setUsersList}
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

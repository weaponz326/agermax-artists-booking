// ** React Imports
import { useState, useEffect } from 'react'

// import { UserOutlined } from '@ant-design/icons'
// import { Avatar } from 'antd'

import UsersListTable from 'src/components/AdminPagesSharedComponents/UsersListTable/UsersListTable'
import axios from 'axios'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import styles from './users.module.css'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import { AdminUsersPageViewStyleTabs } from 'src/components/AdminPagesSharedComponents/AdminUsersPageNavBar/AdminUsersPageNavBar'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import { useUsers } from 'src/providers/UsersProvider'
import { getUserById, updateUserDetailsById } from 'src/services/users'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { Snackbar, Alert } from '@mui/material'
import AvatarsImage from 'src/views/components/avatars/AvatarsImage'

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [query, setQuery] = useState('')
  const { users } = useUsers()
  const [activeView, setActiveView] = useState('1')
  const [modalType, setModalType] = useState('Add User')
  const [selectedUser, setSelectedUser] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  /* **********
   * Functions *
   ********** */

  useEffect(() => {
    if (users !== undefined) {
      setUsersList(users)
    }
  }, [users])
  useEffect(() => {
    if (!query || query === '') {
      setUsersList(users)
    } else {
    }
  }, [query])

  function unhideModal() {
    setOpenModal(true)
  }

  function hideModal() {
    setOpenModal(false)
  }

  function handleAddUser() {
    setModalType('Add User')
    setOpenModal(true)
  }

  function handleQueryChange(e) {
    setQuery(e.target.value)
    if (users) {
      if (!query || query === '') {
        setUsersList(users)
      } else {
        setActiveView('1')
        const filteredList = users.filter(
          user =>
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase())
        )
        setUsersList(filteredList)
      }
    }
  }

  return (
    <div className={styles.usersListPage}>
      <nav className={styles.usersListPageNavBar}>
        <SearchBar
          usersList={usersList}
          setUsersList={setUsersList}
          usersData={users}
          query={query}
          setQuery={setQuery}
          onChange={handleQueryChange}
          value={query}
        />
        <AdminUsersPageViewStyleTabs
          usersData={users}
          usersList={usersList}
          setUsersList={setUsersList}
          query={query}
          setQuery={setQuery}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <TabButton onClick={handleAddUser} className={styles.usersListPageNavBarAddUsersBtn}>
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
        setModalType={setModalType}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <SlideInModal
        openModal={openModal}
        unhideModal={unhideModal}
        hideModal={hideModal}
        modalContent={
          modalType === 'Add User' ? (
            <AddUserModalContent
              setUsersList={setUsersList}
              hideModal={hideModal}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
            />
          ) : (
            <EditUserModalContent
              selectedUser={selectedUser}
              setUsersList={setUsersList}
              hideModal={hideModal}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
            />
          )
        }
      />
    </div>
  )
}

const AddUserModalContent = ({ setUsersList, hideModal }) => {
  const [submitting, setSubmitting] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }
  const auth = useAuth()

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsersList(response.data.users); // Assuming your API responds with an array of users
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // ** Router for redirection after successful registration
  const router = useRouter()
  const [userData, setUserData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    contactPhone: '',
    address: '',
    bio: '',
    nickName: '',
    socialMediaLinks: [''],
    availableDates: [''],
    eventsHosted: [''],
    companyName: '',
    organizationNumber: '',
    gallery: ['']
  })

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value })
  }

  const handleCreateUser = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add-user`, userData)
      if (response.status === 201) {
        // Assuming response.data.userData contains the newly added user
        setUsersList(prevUsers => [...prevUsers, response.data.userData])
        hideModal()
        setSnackbarMessage('User added successfully')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        fetchUsers();
      } else {
        console.error('Failed to add user', response.data.message)
        setSnackbarMessage('Failed to add user')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      }
    } catch (err) {
      console.error('An error occurred while adding the user', err.response?.data?.message || err.message)
      setSnackbarMessage(err.response?.data?.message)
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <div className={styles.modalCardContentPictureInput}>
        <ImageUpload />
      </div>
      <form className={styles.modalCardContentUserDetails} onSubmit={handleCreateUser}>
        <input
          placeholder='First Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='firstName'
          id='firstName'
          value={userData.firstName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Last Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='lastName'
          id='lastName'
          value={userData.lastName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />

        <input
          placeholder='Email Address'
          className={styles.modalCardContentInputField}
          type='email'
          name='email'
          id='email'
          value={userData.email} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Phone'
          className={styles.modalCardContentInputField}
          type='tel'
          name='contactPhone'
          id='contactPhone'
          value={userData.contactPhone} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Address'
          className={styles.modalCardContentInputField}
          type='text'
          name='address'
          id='address'
          value={userData.address} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />

        <input
          placeholder='Nickname'
          className={styles.modalCardContentInputField}
          type='text'
          name='nickname'
          id='nickname'
          value={userData.nickName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <input
          placeholder='Company Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='companyName'
          id='companyName'
          value={userData.companyName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <input
          placeholder='Organization Number'
          className={styles.modalCardContentInputField}
          type='text'
          name='organizationNumber'
          id='organizationNumber'
          value={userData.organizationNumber} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <textarea
          placeholder='Biography'
          className={styles.modalCardContentInputField}
          type='text'
          name='bio'
          id='bio'
          value={userData.bio} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <div className={styles.modalCardContentUserProfile}>
          <div className={styles.modalCardContentUserProfileTitle}>Profile</div>
          <select
            className={styles.modalCardContentInputField}
            name='role'
            id='role'
            value={userData.role}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
          >
            <option value='' disabled>
              [Select Role]
            </option>
            <option value='organizer'>Organizer</option>
            <option value='artist'>Artist</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <TabButton className={styles.modalCardContentSaveButton}>Add New User</TabButton>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          style={{ zIndex: 1400 }} // Ensure this is higher than the modal's z-index
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </>
  )
}

export const EditUserModalContent = ({ selectedUser, hideModal }) => {
  const [userData, setUserData] = useState({
    profilePhoto: selectedUser?.profilePhoto || '',
    firstName: selectedUser?.firstName || '',
    lastName: selectedUser?.lastName || '',
    role: selectedUser?.role || '',
    email: selectedUser?.email || '',
    contactPhone: selectedUser?.contactPhone || '',
    address: selectedUser?.address || '',
    bio: selectedUser?.bio || '',
    nickName: selectedUser?.nickName || '',
    socialMediaLinks: selectedUser?.socialMediaLinks || [''],
    availableDates: selectedUser?.availableDates || [''],
    eventsHosted: selectedUser?.eventsHosted || [''],
    companyName: selectedUser?.companyName || '',
    organizationNumber: selectedUser?.organizationNumber || '',
    gallery: selectedUser?.gallery || ['']
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById(selectedUser)
      setUserData(data)
    }
    fetchUserData()
  }, [selectedUser])

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value })
    console.log(userData)
  }
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsersList(response.data.users); // Assuming your API responds with an array of users
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async e => {
    e.preventDefault()
    try {
      const response = await updateUserDetailsById(selectedUser, userData) // Ensure correct ID usage
      if (response.status === 200) {
        console.log('User updated successfully:', response.data)
        hideModal()
        setSnackbarMessage('User updated successfully')
        setSnackbarSeverity('success')
        setUserData(response.data)
        fetchUsers();
      } else {
        console.log('Update failed:', response.data)
        setSnackbarMessage('Failed to update user')
        setSnackbarSeverity('error')
      }
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Failed to update user:', error.response?.data?.message || error.message)
      setSnackbarMessage(error.response?.data?.message || 'Failed to update user')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <>
      <div className={styles.modalCardContentPictureInput}>
        {selectedUser.profilePhoto ? selectedUser.profilePhoto : <AvatarsImage />}
      </div>
      <form className={styles.modalCardContentUserDetails} onSubmit={handleUpdateUser}>
        <input
          placeholder='First Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='firstName'
          id='firstName'
          value={userData.firstName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Last Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='lastName'
          id='lastName'
          value={userData.lastName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />

        <input
          placeholder='Email Address'
          className={styles.modalCardContentInputField}
          type='email'
          name='email'
          id='email'
          value={userData.email} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Phone'
          className={styles.modalCardContentInputField}
          type='tel'
          name='contactPhone'
          id='contactPhone'
          value={userData.contactPhone} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          placeholder='Address'
          className={styles.modalCardContentInputField}
          type='text'
          name='address'
          id='address'
          value={userData.address} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <textarea
          placeholder='Biography'
          className={styles.modalCardContentInputField}
          type='text'
          name='bio'
          id='bio'
          value={userData.bio} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <input
          placeholder='Nickname'
          className={styles.modalCardContentInputField}
          type='text'
          name='nickname'
          id='nickname'
          value={userData.nickName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <input
          placeholder='Company Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='companyName'
          id='companyName'
          value={userData.companyName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <input
          placeholder='Organization Number'
          className={styles.modalCardContentInputField}
          type='text'
          name='organizationNumber'
          id='organizationNumber'
          value={userData.organizationNumber} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <div className={styles.modalCardContentUserProfile}>
          <div className={styles.modalCardContentUserProfileTitle}>Profile</div>
          <select
            className={styles.modalCardContentInputField}
            name='role'
            id='role'
            value={userData.role}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
            disabled
          >
            <option value='organizer'>Organizer</option>
            <option value='artist'>Artist</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <TabButton className={styles.modalCardContentSaveButton}>Update Now</TabButton>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          hideModal={hideModal}
          style={{ zIndex: 1400 }} // Ensure this is higher than the modal's z-index
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </>
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

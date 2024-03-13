// ** React Imports
import { useState, useEffect } from 'react'
import UsersListTable from 'src/components/AdminPagesSharedComponents/UsersListTable/UsersListTable'
import axios from 'axios'
import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import styles from './users.module.css'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import { AdminUsersPageViewStyleTabs } from 'src/components/AdminPagesSharedComponents/AdminUsersPageNavBar/AdminUsersPageNavBar'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import { useUsers } from 'src/providers/UsersProvider'
import { getUserById, updateUserById, updateUserDetailsById } from 'src/services/users'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { Snackbar, Alert } from '@mui/material'
import AvatarsImage from 'src/views/components/avatars/AvatarsImage'
import TextField from '@mui/material/TextField'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [query, setQuery] = useState('')
  const { users, updateUser, setUsers, deleteUser } = useUsers()
  const [activeView, setActiveView] = useState('1')
  const [modalType, setModalType] = useState('Add User')
  const [selectedUser, setSelectedUser] = useState('')

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')

  useEffect(() => {
    if (users) {
      setUsersList(users)
    }
  }, [users])

  /* **********
   * Functions *
   ********** */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  /************Modal Controllers****** */
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

  /************Query Handler****** */

  function handleQueryChange(e) {
    const value = e.target.value
    setQuery(value)

    if (users) {
      if (!value.trim()) {
        // If query is empty, show all users
        setUsersList(users)
      } else {
        // Otherwise, filter users based on the query
        const filteredList = users.filter(
          user =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.lastName.toLowerCase().includes(value.toLowerCase())
        )
        setUsersList(filteredList)
      }
      // Set active view to '1' if there are users to display
      setActiveView(users.length > 0 && '1')
    }
  }

  /************Render****** */

  return (
    <div className={styles.usersListPage}>
      <nav className={styles.usersListPageNavBar}>
        <SearchBar query={query} setQuery={setQuery} onChange={handleQueryChange} value={query} />
        <AdminUsersPageViewStyleTabs
          users={users}
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
        users={users}
        setUsersList={setUsersList}
        setModalType={setModalType}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        deleteUser={deleteUser}
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
              updateUser={updateUser}
              setUsers={setUsers}
              users={users}
            />
          )
        }
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        hideModal={hideModal}
        anchorOrigin={{ vertical: 'down', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export const AddUserModalContent = ({
  setUsersList,
  hideModal,
  snackbarMessage,
  setSnackbarMessage,
  snackbarSeverity,
  setSnackbarSeverity,
  setSnackbarOpen
}) => {
  const { user } = useAuth()
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '')
  const [submitting, setSubmitting] = useState(false)
  const { addUser, setIsUsersListUpdated } = useUsers()

  // ** Router for redirection after successful registration
  const router = useRouter()
  const [userData, setUserData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    password: 'admin',
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
      const { data } = await addUser(userData)
      console.log('New user added successfully ', data)
      setSnackbarMessage('User added successfully')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setIsUsersListUpdated(true)
      hideModal()
    } catch (err) {
      console.error('An error occurred while adding a user', err.message)
      setSnackbarMessage('Error adding user')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setSubmitting(false)
      setIsUsersListUpdated(false)
    }
  }

  return (
    <>
      <div className={styles.modalCardContentPictureInput}>
        <ImageUpload setProfilePhoto={setProfilePhoto} userData={userData} setUserData={setUserData} />{' '}
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
      </form>
    </>
  )
}

export const EditUserModalContent = ({
  selectedUser,
  snackbarMessage,
  setSnackbarMessage,
  snackbarSeverity,
  setSnackbarSeverity,
  setSnackbarOpen,
  hideModal,
  updateUser,
  setUsers,
  users
}) => {
  const { uploadUserPhotoUpdate } = useUsers()
  const { setIsUserUpdated } = useAuth()
  const [profilePhoto, setProfilePhoto] = useState(selectedUser?.profilePhoto || '')

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
      setProfilePhoto(data.profilePhoto)
    }
    fetchUserData()
  }, [selectedUser])

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value })
    console.log(userData)
  }

  const handleUpdateUser = async e => {
    e.preventDefault()
    try {
      const profilePhotoResponse = await uploadUserPhotoUpdate(userData) // Upload profile photo separately
      console.log(profilePhotoResponse)
      const updatedUserData = { ...userData }
      const response = await updateUser(selectedUser, updatedUserData) // Ensure correct ID usage
      console.log('User updated successfully! ', response)
      setSnackbarMessage('User updated successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setIsUserUpdated(true)
      hideModal()
      // setUserData(response.data) // Update userData with the response

      setSnackbarOpen(true)
    } catch (error) {
      console.error('Failed to update user:', error)
      setSnackbarMessage('Failed to update user')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setIsUserUpdated(false)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setUserData({ ...userData, profilePhoto: file })
    console.log(userData)
  }

  return (
    <>
      <div className={styles.modalCardContentPictureInput}>
        {/* {selectedUser.profilePhoto ? selectedUser.profilePhoto : <AvatarsImage />} */}
        <ImageUpload setFormData={setUserData} formData={userData} profilePhoto={profilePhoto} />
        {/* <img className={styles.profilePhoto} src={`${userData.profilePhoto}`} alt={<AvatarsImage />} /> */}
      </div>
      <form className={styles.modalCardContentUserDetails} onSubmit={handleUpdateUser}>
        <TextField
          placeholder='First Name'
          label='First Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='firstName'
          id='firstName'
          value={userData.firstName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          size='small'
        />
        <TextField
          placeholder='Last Name'
          label='Last Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='lastName'
          id='lastName'
          value={userData.lastName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          size='small'
        />

        <TextField
          placeholder='Email Address'
          label='Email Address'
          className={styles.modalCardContentInputField}
          type='email'
          name='email'
          id='email'
          value={userData.email} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          disabled
          size='small'
        />
        <TextField
          placeholder='Phone'
          label='Phone'
          className={styles.modalCardContentInputField}
          type='tel'
          name='contactPhone'
          id='contactPhone'
          value={userData.contactPhone} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          size='small'
        />
        <TextField
          placeholder='Address'
          label='Address'
          className={styles.modalCardContentInputField}
          type='text'
          name='address'
          id='address'
          value={userData.address} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          size='small'
        />
        <TextField
          placeholder='Biography'
          label='Biography'
          className={styles.modalCardContentInputField}
          type='text'
          name='bio'
          id='bio'
          value={userData.bio} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          // size='small'
        />
        <TextField
          placeholder='Nickname'
          label='Nickname'
          className={styles.modalCardContentInputField}
          type='text'
          name='nickname'
          id='nickname'
          value={userData.nickName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          size='small'
        />
        <TextField
          placeholder='Company Name'
          label='Company Name'
          className={styles.modalCardContentInputField}
          type='text'
          name='companyName'
          id='companyName'
          value={userData.companyName} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          size='small'
        />
        <TextField
          placeholder='Organization Number'
          label='Organization Number'
          className={styles.modalCardContentInputField}
          type='text'
          name='organizationNumber'
          id='organizationNumber'
          value={userData.organizationNumber} // @todo fix this when we have a real user to edit
          onChange={e => handleChange(e.target.name, e.target.value)}
          size='small'
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

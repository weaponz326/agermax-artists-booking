// ** React Imports
import { useState, useEffect } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import UsersListTable from 'src/components/AdminPagesSharedComponents/UsersListTable/UsersListTable'

import SearchBar from 'src/components/AdminPagesSharedComponents/SearchBar/SearchBar'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import styles from './users.module.css'
import SlideInModal from 'src/components/AdminPagesSharedComponents/SlidingModal/SlideInModal'
import { AdminUsersPageViewStyleTabs } from 'src/components/AdminPagesSharedComponents/AdminUsersPageNavBar/AdminUsersPageNavBar'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import { useUsers } from 'src/providers/UsersProvider'
import { getUserById, updateUserDetails } from 'src/services/users'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const UsersListPage = () => {
  // ** State for storing users data
  const [openModal, setOpenModal] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [query, setQuery] = useState('')
  const { users } = useUsers()
  const [activeView, setActiveView] = useState('1')
  const [modalType, setModalType] = useState('Add User')
  const [selectedUser, setSelectedUser] = useState('')

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
          modalType === 'Add User' ? <AddUserModalContent /> : <EditUserModalContent selectedUser={selectedUser} />
        }
      />
    </div>
  )
}

export const AddUserModalContent = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const auth = useAuth()

  // ** Router for redirection after successful registration
  const router = useRouter()
  const [userData, setUserData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    password: '123456789',
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
    console.log(userData)
  }

  const handleCreateUser = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    auth.register(userData, err => {
      setSubmitting(false)
      if (err) {
        setError(err.response.data.message || 'An error occurred. Please try again.')
      } else {
        router.push('/admin/users') // Or redirect to a 'success' page
      }
    })
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

export const EditUserModalContent = ({ selectedUser }) => {
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

  const handleUpdateUser = async e => {
    e.preventDefault()
    try {
      const response = await updateUserDetails(selectedUser, userData)
      console.log('User updated successfully:', response)
      // Handle success, e.g., show success message to the user
    } catch (error) {
      console.error('Failed to update user:', error.message)
      // Handle error, e.g., show error message to the user
    }
  }

  return (
    <>
      <div className={styles.modalCardContentPictureInput}>
        <ImageUpload />
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

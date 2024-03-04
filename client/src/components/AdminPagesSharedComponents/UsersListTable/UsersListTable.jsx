import React, { useState, useEffect } from 'react'
import axios from 'axios' // Import axios here
import { Table, Space, Dropdown, Menu, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { deleteUserById } from 'src/services/users'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const UsersListTable = ({
  hideModal,
  unhideModal,
  usersList,
  setUsersList,
  setModalType,
  selectedUser,
  setSelectedUser
}) => {
  const data = usersList
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'picture',
      key: 'picture',
      render: text => <Avatar src={text} size={40} />
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      sorter: (a, b) => b.firstName.localeCompare(a.firstName),
      render: (text, record) => `${record.firstName} ${record.lastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      sorter: (a, b) => a.contactPhone - b.contactPhone
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role)
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Dropdown overlay={getMenu(record)}>
            <EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        </Space>
      )
    }
  ]

  // Handlers for edit and delete actions
  const handleEdit = userId => {
    setModalType('Edit User')
    setSelectedUser(userId)
    unhideModal(true)
  }

  const promptDelete = userId => {
    setUserToDelete(userId)
    setOpenDeleteDialog(true)
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      setUsersList(response.data.users) // Assuming your API responds with an array of users
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await deleteUserById(userToDelete) 
        console.log('User deleted successfully:', response)
        setUsersList(currentUsersList => currentUsersList.filter(user => user._id !== userToDelete))
        setSnackbarMessage('User deleted successfully.')
        setSnackbarSeverity('success')
      } catch (error) {
        // This block will execute if there's an error with the deletion process.
        console.error('Failed to delete user:', error.message)
        setSnackbarMessage('Failed to delete user. Please try again.')
        setSnackbarSeverity('error')
      } finally {
        // This block executes after try/catch, regardless of the outcome.
        setSnackbarOpen(true)
        setOpenDeleteDialog(false)
        setUserToDelete(null)
      }
    }
  }

  // Dropdown menu content
  const getMenu = record => (
    <Menu>
      <Menu.Item key='edit' onClick={() => handleEdit(record._id)}>
        Edit
      </Menu.Item>
      <Menu.Item key='delete' onClick={() => promptDelete(record._id)}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Table dataSource={usersList} columns={columns} />
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant='filled' onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default UsersListTable

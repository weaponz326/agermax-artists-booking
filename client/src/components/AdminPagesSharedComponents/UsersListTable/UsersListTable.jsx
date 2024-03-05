import React, { useState, useEffect } from 'react'

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
  setSelectedUser,
  users,
  deleteUser
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

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await deleteUser(userToDelete)
        console.log('User deleted successfully:', response)
        setSnackbarMessage('User deleted successfully!')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
      } catch (error) {
        console.error('Failed to delete user:', error.message)
        setSnackbarMessage('Failed to delete user. Please try again.')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      } finally {
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

  if (!users) return <div>Loading...</div>
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

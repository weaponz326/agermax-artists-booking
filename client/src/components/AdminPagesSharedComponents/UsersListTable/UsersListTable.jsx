import { Table, Button, Space, Dropdown, Menu, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import SlideInModal from '../SlidingModal/SlideInModal'

const UsersListTable = ({ setOpenModal }) => {
  const [showDrawer, setShowerDrawer] = useState(false)
  // Sample user data with profile pictures
  const data = [
    {
      key: '1',
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
      type: 'Artist',
      profilePic: '/images/ellipse-121.png' // Replace with the actual URL of the profile picture
    },
    {
      key: '2',
      name: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.com',
      type: 'Customer',
      profilePic: '/images/ellipse-121.png' // Replace with the actual URL of the profile picture
    }
    // Add more users as needed
  ]

  // Define columns for the table
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profilePic',
      key: 'profilePic',
      render: text => <Avatar src={text} size={40} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type)
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
    // Implement edit logic here
    console.log(`Edit user with ID ${userId}`)
    setOpenModal(true)
  }

  const handleDelete = userId => {
    // Implement delete logic here
    console.log(`Delete user with ID ${userId}`)
  }

  // Dropdown menu content
  const getMenu = record => (
    <Menu>
      <Menu.Item key='edit' onClick={() => handleEdit(record.key)}>
        Edit
      </Menu.Item>
      <Menu.Item key='delete' onClick={() => handleDelete(record.key)}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Table dataSource={data} columns={columns} />
      <SlideInModal OnOpen={showDrawer} />
    </div>
  )
}

export default UsersListTable

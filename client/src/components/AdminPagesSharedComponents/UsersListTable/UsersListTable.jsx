import { Table, Button, Space, Dropdown, Menu, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import SlideInModal from '../SlidingModal/SlideInModal'

const UsersListTable = ({ hideModal, unhideModal, artistsList, setArtistsList }) => {
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Doe',
  //     phone: '123-456-7890',
  //     email: 'john@example.com',
  //     type: 'Artist',
  //     profilePic: '/images/ellipse-121.png' // Replace with the actual URL of the profile picture
  //   },
  //   {
  //     key: '2',
  //     name: 'Jane Smith',
  //     phone: '987-654-3210',
  //     email: 'jane@example.com',
  //     type: 'Customer',
  //     profilePic: '/images/ellipse-121.png' // Replace with the actual URL of the profile picture
  //   }
  //   // Add more users as needed
  // ]

  // Define columns for the table
  const data = artistsList

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
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => `${record.firstName} ${record.lastName}`
    },

    {
      title: 'Phone',
      dataIndex: 'contactPhone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone)
    },
    {
      title: 'Email',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
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
          <Dropdown menu={getMenu(record)}>
            <EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        </Space>
      )
    }
  ]

  // Handlers for edit and delete actions
  const handleEdit = userId => {
    console.log(`Edit user with ID ${userId}`)
    unhideModal(true)
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
      <Table dataSource={artistsList} columns={columns} />
    </div>
  )
}

export default UsersListTable

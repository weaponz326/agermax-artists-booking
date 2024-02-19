import { Table, Space, Dropdown, Menu, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { deleteUserById } from 'src/services/users'

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

  const handleDelete = async userId => {
    // Implement delete logic here
    try {
      const response = await deleteUserById(userId)
      console.log('User deleted successfully:', response)
      // Handle success, e.g., show success message to the user
    } catch (error) {
      console.error('Failed to delete user:', error.message)
      // Handle error, e.g., show error message to the user
    }
  }

  // Dropdown menu content
  const getMenu = record => (
    <Menu>
      <Menu.Item key='edit' onClick={() => handleEdit(record._id)}>
        Edit
      </Menu.Item>
      <Menu.Item key='delete' onClick={() => handleDelete(record._id)}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Table dataSource={usersList} columns={columns} />
    </div>
  )
}

export default UsersListTable

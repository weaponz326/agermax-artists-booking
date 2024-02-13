import { Table, Space, Dropdown, Menu, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

const UsersListTable = ({ hideModal, unhideModal, usersList, setUsersList }) => {
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
      key: 'phone',
      sorter: (a, b) => a.contactPhone.localeCompare(b.contactPhone)
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
      <Table dataSource={usersList} columns={columns} />
    </div>
  )
}

export default UsersListTable

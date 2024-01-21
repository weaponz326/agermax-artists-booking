// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/pages/admin/users/AddUserDrawer'

// ** renders client column
const userRoleObj = {
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  artist: { icon: 'tabler:circle-check', color: 'success' },
  organizer: { icon: 'tabler:edit', color: 'info' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const UserList = () => {
  // ** State for storing users data
  const [users, setUsers] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)


  // ** Function to fetch users from all categories
  const fetchUsers = async () => {
    try {
      const apiURL = process.env.NEXT_PUBLIC_API_URL
      const endpoints = [
        `${apiURL}/artists`
        `${apiURL}/organizers`,
        `${apiURL}/admin`
      ]

      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint)))

      const combinedData = responses.flatMap(response =>
        response.data.map(user => ({
          id: user._id,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.contactEmail,
          phone: user.contactPhone,
          address: user.address
          // Additional fields can be added as needed
        }))
      )

      setUsers(combinedData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  const dispatch = useDispatch()

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)


  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 0.25,
      minWidth: 180
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.25,
      minWidth: 180
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 0.2,
      minWidth: 160
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 0.3,
      minWidth: 220
    }
    // Add other columns as needed
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {/* Render stats and other data */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>{/* Filter content */}</CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader   toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={users}
            columns={columns}
            disableRowSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            // Other DataGrid properties
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserList

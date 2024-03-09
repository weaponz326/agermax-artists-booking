import React, { useEffect, useState } from 'react'
import styles from './MainDashboard.module.css'

import { useAuth } from 'src/hooks/useAuth'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  getRecentBookings,
  getTotalBookings,
  getTotalPendingBookings,
  getUpcomingBookings
} from 'src/services/bookings'
import { getRecentUsers, getTotalArtists, getTotalOrganizers } from 'src/services/users'
import { getTotalUnpaidInvoices } from 'src/services/invoice'
import { EventsListItem } from '../../bookings/admin'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import { useRouter } from 'next/router'

// Define styled components
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 140, // Adjust the height as per your design
  marginBottom: 12
}))

const ChartCard = styled(StyledCard)(({ theme }) => ({
  height: 'auto' // Adjust the height as per your chart component
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.grey[900],
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  }
}))

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper
}))

const MainDashboard = () => {
  const { user } = useAuth()
  const router = useRouter()

  /******************States for Data Rendering *****************/
  /****************Booking States Depending Different Users************/
  const [userBookingsCount, setUserBookingsCount] = useState(null)
  const [artistsCount, setArtistsCount] = useState(null)
  const [organizersCount, setOrganizersCount] = useState(null)
  const [unpaidInvoiceCount, setUnpaidInvoiceCount] = useState(null)
  const [pendingBookingsCount, setPendingBookingsCount] = useState(null)
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(null)
  const [recentBookings, setRecentBookings] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState(null)
  const [recentUsers, setRecentUsers] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getters
        const { totalBookings } = await getTotalBookings(user)
        const { totalArtists } = await getTotalArtists()
        const { totalOrganizers } = await getTotalOrganizers()
        const { totalPendingBookings } = await getTotalPendingBookings(user)
        const { totalUnpaidInvoices } = await getTotalUnpaidInvoices(user)
        const { recentBookings } = await getRecentBookings(user)
        const { recentUsers } = await getRecentUsers()
        const { approvedBookings } = await getUpcomingBookings(user)

        //Setters
        setUserBookingsCount(totalBookings)
        setArtistsCount(totalArtists)
        setOrganizersCount(totalOrganizers)
        setPendingBookingsCount(totalPendingBookings)
        setUnpaidInvoiceCount(totalUnpaidInvoices)
        setRecentBookings(recentBookings)
        setRecentUsers(recentUsers)
        setUpcomingBookings(approvedBookings)
        console.log({
          recentUsers
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* Greeting and Notifications */}
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            Hey {user.role}, {user.firstName}! 👋
          </Typography>
          <Typography variant='subtitle1'>
            You have {pendingBookingsCount} pending bookings and 2* unread messages.
          </Typography>
        </Grid>

        {/* Cards Grid */}
        <Grid container item spacing={2}>
          {/* Chart Card */}
          <Grid item xs={12} lg={6}>
            <ChartCard>
              {/* Replace with your actual chart */}
              <Typography variant='h6' sx={{ my: 2 }}>
                Total bookings
              </Typography>
              <Box sx={{ height: 300 }}>{userBookingsCount}</Box>
            </ChartCard>
          </Grid>

          {/* Info Cards */}
          {user && user.role === 'admin' && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <StyledCard>
                <Typography variant='subtitle1'>Total Artists</Typography>
                <Typography variant='h4'>{artistsCount}</Typography>
                <Typography variant='h4'></Typography>
                <Typography variant='h4'></Typography>
              </StyledCard>
              <StyledCard>
                <Typography variant='subtitle1'>Total Organizers</Typography>
                <Typography variant='h4'>{organizersCount}</Typography>
                <Typography variant='h4'></Typography>
                <Typography variant='h4'></Typography>
              </StyledCard>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <Typography variant='subtitle1'>Pending bookings</Typography>
              <Typography variant='h4'>{pendingBookingsCount}</Typography>
              <StyledButton size='small' onClick={() => router.push(`/admin/bookings/${user.role}`)}>
                Bookings
              </StyledButton>
            </StyledCard>

            <StyledCard>
              <Typography variant='subtitle1'>Unread Messages</Typography>
              <Typography variant='h4'>1*</Typography>
              <StyledButton size='small'>Inbox</StyledButton>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <Typography variant='subtitle1'>Unpaid Invoices</Typography>
              <Typography variant='h4'>{unpaidInvoiceCount}</Typography>
              <StyledButton size='small' onClick={() => router.push(`/admin/finance/${user.role}`)}>
                Invoice
              </StyledButton>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
        </Grid>

        {/* Recent Bookings and Users List */}
        <Grid container item spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Recent bookings{' '}
                  <Button size='small' flex onClick={() => router.push(`/admin/bookings/${user.role}`)}>
                    See all
                  </Button>
                </Typography>

                <StyledList>
                  {recentBookings &&
                    recentBookings.map((booking, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>{booking.eventTitle}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={booking.eventTitle} secondary={booking.organizerID} />
                      </ListItem>
                    ))}
                </StyledList>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Users List */}
          {user && user.role === 'admin' && (
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Recent users{' '}
                    <Button size='small' onClick={() => router.push(`/admin/users`)}>
                      See all
                    </Button>
                  </Typography>
                  {/* List of Recent Users */}
                  {recentUsers && recentUsers.map(user => <UsersDashboardListItem user={user} />)}
                </CardContent>
              </Card>
            </Grid>
          )}
          {user && user.role === 'admin' && (
            <Grid item xs={12} md={6}>
              <ChartCard>
                {/* Replace with your actual chart */}
                <Typography variant='h6' sx={{ my: 2 }}>
                  Income
                </Typography>
                <Box sx={{ height: 300 }}></Box>
              </ChartCard>
            </Grid>
          )}
        </Grid>

        {/* Upcoming Bookings */}
        <Grid container item spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Upcoming Events{' '}
                  <Button size='small' flex onClick={() => router.push(`/admin/bookings/${user.role}`)}>
                    See all
                  </Button>
                </Typography>

                <StyledList>
                  {upcomingBookings && upcomingBookings.length > 0
                    ? upcomingBookings.map((booking, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar>{booking.eventTitle}</Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={booking.eventTitle} secondary={booking.organizerID} />
                        </ListItem>
                      ))
                    : 'No Approved Upcoming events to display now.'}
                </StyledList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainDashboard

const UsersDashboardListItem = ({ user }) => {
  return (
    <div className={styles.usersListItemWrapper}>
      <div className={styles.userProfile}>
        <img className={styles.userImg} src={user ? user.profilePhoto : 'N/A'} alt='' />
        <div>{user ? `${user.firstName} ${user.lastName}` : 'N/A'}</div>
      </div>
      <TabButton className={styles.userRole}>{user && user.role}</TabButton>
    </div>
  )
}

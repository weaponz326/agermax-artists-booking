import React, { useEffect, useState } from 'react'
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

  /******************States for Data Rendering *****************/
  /****************Booking States Depending Different Users************/
  const [userBookings, setUserBookings] = useState([])

  useEffect(() => {
    if (bookings && user) {
      if (user.role === 'admin') {
        setUserBookings(bookings)
      } else if (user.role === 'organizer') {
        const userBookings = bookings.filter(booking => booking.organizerID === user._id)
        setUserBookings(userBookings)
      } else if (user.role === 'artist') {
        const userBookings = bookings.filter(booking => booking.artistID === user._id)
        setUserBookings(userBookings)
      }
    }
  }, [bookings, user])

  const recentBookings = [
    { name: 'Mike Eriksson', role: 'Artist' },
    { name: 'Anna Johnsson', role: 'Organizer' }
    // ... more items
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* Greeting and Notifications */}
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            Hey {user.role}, {user.firstName}! 👋
          </Typography>
          <Typography variant='subtitle1'>
            You have {userBookings.length} pending bookings and 2 unread messages.
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
              <Box sx={{ height: 300 }}>45</Box>
            </ChartCard>
          </Grid>

          {/* Info Cards */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <Typography variant='subtitle1'>Total Artists</Typography>
              <Typography variant='h4'>24</Typography>
              <Typography variant='h4'></Typography>
              <Typography variant='h4'></Typography>
            </StyledCard>
            <StyledCard>
              <Typography variant='subtitle1'>Total Organizers</Typography>
              <Typography variant='h4'>13</Typography>
              <Typography variant='h4'></Typography>
              <Typography variant='h4'></Typography>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <Typography variant='subtitle1'>Pending bookings</Typography>
              <Typography variant='h4'>4</Typography>
              <StyledButton size='small'>Bookings</StyledButton>
            </StyledCard>

            <StyledCard>
              <Typography variant='subtitle1'>Unread Messages</Typography>
              <Typography variant='h4'>1</Typography>
              <StyledButton size='small'>Inbox</StyledButton>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <StyledCard>
              <Typography variant='subtitle1'>Unpaid Invoices</Typography>
              <Typography variant='h4'>1</Typography>
              <StyledButton size='small'>Invoice</StyledButton>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
        </Grid>

        {/* Recent Bookings and Users List */}
        <Grid container item spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Recent bookings{' '}
                  <Button size='small' flex>
                    See all
                  </Button>
                </Typography>

                <StyledList>
                  {recentBookings.map((booking, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>{booking.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={booking.name} secondary={booking.role} />
                    </ListItem>
                  ))}
                </StyledList>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Users List */}
          <Grid item xs={12} md={3}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Recent users <Button size='small'>See all</Button>
                </Typography>
                {/* List of users */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard>
              {/* Replace with your actual chart */}
              <Typography variant='h6' sx={{ my: 2 }}>
                Income
              </Typography>
              <Box sx={{ height: 300 }}></Box>
            </ChartCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainDashboard

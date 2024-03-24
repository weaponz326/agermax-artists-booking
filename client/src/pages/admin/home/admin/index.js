import React, { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'
import { getMonth, getYear } from 'date-fns'
import { Line } from 'react-chartjs-2'
import { Avatar as AntDesignAvatar } from 'antd'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend)

// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import styles from './MainDashboard.module.css'
import { formatDate, formatTime } from 'src/utils/dateUtils'

import { useAuth } from 'src/hooks/useAuth'
import {
  Box,
  Grid,
  Card,
  CardHeader,
  InputAdornment,
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
  getAllBookings,
  getOrganizersByArtistID,
  getRecentBookings,
  getTop10BookedArtists,
  getTotalBookings,
  getTotalPendingBookings,
  getUpcomingBookings,
  getVenuesByArtistID
} from 'src/services/bookings'
import { getRecentUsers, getTotalArtists, getTotalOrganizers } from 'src/services/users'
import { getTotalUnpaidInvoices } from 'src/services/invoice'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'

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
  const [topPerformers, setTopPerformers] = useState(null)
  const [listOfVenues, setListOfVenues] = useState(null)
  const [listOfOrganizers, setListOfOrganizers] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getters
        const { totalBookings } = await getTotalBookings(user)
        if (user.role === 'artist') {
          const { artistOrganizers } = getOrganizersByArtistID(user)
          const { venues } = getVenuesByArtistID(user)
          setListOfOrganizers(artistOrganizers)
          setListOfVenues(venues)
          // console.log(venues)
        }
        if (user.role != 'artist') {
          const { totalArtists } = await getTotalArtists()
          const { totalOrganizers } = await getTotalOrganizers()
          const { totalPendingBookings } = await getTotalPendingBookings(user)
          const { totalUnpaidInvoices } = await getTotalUnpaidInvoices(user)
          const { recentBookings } = await getRecentBookings(user)
          const { recentUsers } = await getRecentUsers()
          const { approvedBookings } = await getUpcomingBookings(user)
          const { top10BookedArtists } = await getTop10BookedArtists()

          //Setters
          setArtistsCount(totalArtists)
          setOrganizersCount(totalOrganizers)
          setPendingBookingsCount(totalPendingBookings)
          setUnpaidInvoiceCount(totalUnpaidInvoices)
          setRecentBookings(recentBookings)
          setRecentUsers(recentUsers)
          setUpcomingBookings(approvedBookings)
          setTopPerformers(top10BookedArtists)
        }
        setUserBookingsCount(totalBookings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [user])

  const [bookingsChartData, setBookingsChartData] = useState(null)

  // Existing useEffect to fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings`)
        const bookings = response.data

        const currentYear = new Date().getFullYear()
        const bookingsPerMonth = Array.from({ length: 12 }).fill(0)

        bookings.forEach(booking => {
          const date = new Date(booking.dateTimeRequested)
          const year = getYear(date)
          const month = getMonth(date)

          if (year === currentYear) {
            bookingsPerMonth[month]++
          }
        })

        const newBookingsChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Total Bookings',
              data: bookingsPerMonth,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              borderRadius: 5,
              barThickness: 10
            }
          ]
        }

        setBookingsChartData(newBookingsChartData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
        setBookingsChartData(null) // Reset the chart data on error
      }
    }

    fetchChartData()
  }, [])

  const [incomeChartData, setIncomeChartData] = useState(null)

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payments`)
        const payments = response.data

        const currentYear = new Date().getFullYear()
        const incomePerMonth = Array.from({ length: 12 }).fill(0)

        payments.forEach(payment => {
          const date = new Date(payment.createdAt) // Using 'createdAt' as the payment date
          const year = getYear(date)
          const month = getMonth(date)

          if (year === currentYear) {
            incomePerMonth[month] += payment.amount
          }
        })

        const newIncomeChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Total Income',
              data: incomePerMonth,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
              tension: 0.4 // Adjusts the curve of the line
            }
          ]
        }

        setIncomeChartData(newIncomeChartData)
      } catch (error) {
        console.error('Error fetching income data:', error)
        setIncomeChartData(null) // Reset the chart data on error
      }
    }

    if (user) {
      fetchIncomeData()
    }
  }, [user])

  if (!user) return <FallbackSpinner />
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* Greeting and Notifications */}
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            Hey {user.role}, {user.firstName}! 👋
          </Typography>
          <Typography variant='subtitle1'>
            You have {pendingBookingsCount} pending bookings and 0* unread messages.
          </Typography>
        </Grid>

        {/* Cards Grid */}
        <Grid container item spacing={2}>
          {/* Chart Card */}
          <Grid item xs={12} lg={6}>
            <ChartCard>
              <Typography variant='h6' sx={{ my: 2 }}>
                Total bookings
              </Typography>
              <Box sx={{ height: 300 }}>
                {bookingsChartData ? (
                  <Bar key={JSON.stringify(bookingsChartData)} data={bookingsChartData} />
                ) : (
                  <Typography>Loading chart data...</Typography>
                )}
              </Box>
            </ChartCard>
          </Grid>

          {/* Info Cards */}
          {user.role === 'admin' && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <StyledCard>
                <Typography variant='subtitle1'>Total Performers</Typography>
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
              <Typography variant='h4'>0*</Typography>
              <StyledButton size='small'>Inbox</StyledButton>
            </StyledCard>
          </Grid>
          {user.role != 'artist' && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <StyledCard>
                <Typography variant='subtitle1'>Unpaid Invoices</Typography>
                <Typography variant='h4'>{unpaidInvoiceCount}</Typography>
                <StyledButton size='small' onClick={() => router.push(`/admin/finance/${user.role}`)}>
                  Invoice
                </StyledButton>
              </StyledCard>
            </Grid>
          )}

          {/* Artist Special  Lists */}
          {/* Artist Top Venues booked */}
          {user.role === 'artist' && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Top List of Most Venues Booked at
                  </Typography>

                  <StyledList>
                    {listOfVenues
                      ? listOfVenues.map((venue, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={venue} />
                          </ListItem>
                        ))
                      : 'No List of Most Venues Booked at to display now.'}
                  </StyledList>
                </CardContent>
              </Card>
            </Grid>
          )}
          {/* Artist Top Organizers booked by*/}
          {user.role === 'artist' && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Top list of Organizers booked by
                  </Typography>
                  <StyledList>
                    {listOfOrganizers
                      ? listOfOrganizers.map((organizer, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={organizer.fullName} />
                          </ListItem>
                        ))
                      : 'No List of Top Organizers Booked by to display now.'}
                  </StyledList>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Recent Bookings and Users List */}
        {user.role != 'artist' && (
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
                            <AntDesignAvatar src={booking.mainBanner} alt={booking.eventTitle} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={booking.eventTitle}
                            secondary={new Date(booking.dateTimeRequested).toLocaleDateString()}
                          />
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
              <Grid item xs={12} lg={6}>
                <ChartCard>
                  <Typography variant='h6' sx={{ my: 2 }}>
                    Total Income
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    {incomeChartData ? (
                      <Line key={JSON.stringify(incomeChartData)} data={incomeChartData} />
                    ) : (
                      <Typography>Loading income data...</Typography>
                    )}
                  </Box>
                </ChartCard>
              </Grid>
            )}{' '}
            {/* Upcoming Bookings */}
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
                              <AntDesignAvatar src={booking.mainBanner} alt={booking.eventTitle}></AntDesignAvatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={booking.eventTitle}
                              secondary={`${(formatDate, formatTime(booking.dateTimeRequested))}, ${
                                booking.locationVenue
                              }, ${formatTime(booking.startTime)} - ${formatTime(booking.endTime)} `}
                            />
                          </ListItem>
                        ))
                      : 'No Approved Upcoming events to display now.'}
                  </StyledList>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Top Performers */}
        {user.role != 'artist' && (
          <Grid container item spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 350 }}>
                <CardContent>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Top Performers{' '}
                    <Button size='small' flex onClick={() => router.push(`/artists`)}>
                      See all
                    </Button>
                  </Typography>

                  <StyledList>
                    {topPerformers && topPerformers.length > 0
                      ? topPerformers.map((performer, index) => (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar src={performer.profilePhoto}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${performer.firstName} ${performer.lastName}`}
                              secondary={performer.totalBookings}
                            />
                          </ListItem>
                        ))
                      : 'No top Performers to display now.'}
                  </StyledList>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
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

MainDashboard.authGuard = false
MainDashboard.guestGuard = false
MainDashboard.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
// MainDashboard.getLayout = page => <div>{page}</div>

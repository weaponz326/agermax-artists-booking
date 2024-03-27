import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { LocalizationProvider, TimePicker, DateCalendar } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import { Tag } from 'src/pages/artists/[id]'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'iconsax-react'
import styles from './BookingCard.module.css'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import dayjs from 'dayjs'
import useBookingFormData from 'src/hooks/useBookingFormData'
import { useRouter } from 'next/router'
import { useBookings } from 'src/providers/BookingsProvider'
import Tooltip from 'src/@core/theme/overrides/tooltip'
import BookingCardSchedular, { BookingCardSummary } from './CustomBookingCard'
import TabButton from '../AdminPagesSharedComponents/ViewTab/TabButton'
import { BookingsModalContent } from 'src/pages/admin/bookings/admin'

const customLocale = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Override the day abbreviations
}

function BookingCard({ open, setOpen, artist, allowCancel }) {
  const { createBooking } = useBookings()
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const [activeStep, setActiveStep] = useState(0)

  const [disableNext, setDisableNext] = useState(true)

  /************************Form Data ***************************/
  const { formData, handleChangeFormData } = useBookingFormData()

  const customTheme = createTheme({
    components: {
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: '#4B627F',
            padding: '0',
            justifyContent: 'space-between',
            fontFamily: 'inherit'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            border: 'none',
            padding: '0',
            fontFamily: 'inherit'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: '#183D4C',
            fontSize: '19px',
            fontWeight: '450',
            border: 'none',
            fontFamily: 'inherit'
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: '9px',
            '&:hover': {
              backgroundColor: '#FC8A5E'
            }
          }
        }
      },

      // MuiMobileStepper-dot: {
      //   styleOverrides: {
      //     root: {
      //       padding: '5px  16px',
      //       borderRadius: '9px',
      //       background: '#FC8A5E',
      //       '&.Mui-selected': {
      //         backgroundColor: '#f07a4b'
      //       },
      //       color: 'white',
      //       fontFamily: 'inherit'
      //     }
      //   }
      // },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            padding: '24px',
            fontFamily: 'inherit'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            padding: '0',
            fontFamily: 'inherit'
          }
        }
      },

      MuiMobileStepper: {
        styleOverrides: {
          root: {
            fontSize: '16px',
            fontFamily: 'inherit',
            color: 'red'
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#4B627F',
            fontFamily: 'inherit',
            padding: '0',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#B9FACF', // Example hover style
              borderRadius: '9px'
            },
            '&.Mui-selected': {
              backgroundColor: '#f07a4b', // Example selected state style
              borderRadius: '9px'
            },
            '&:focus.Mui-selected': {
              backgroundColor: '#f07a4b', // Change to desired style when focused and selected
              borderRadius: '9px'
            }
          }
        }
      }
    }
  })

  const handleSubmit = async e => {
    // e.preventDefault()
    try {
      const newBooking = await createBooking(formData)
      console.log('New booking created: ', newBooking)
      // Optionally, you can redirect or perform any other action after successful booking creation
    } catch (error) {
      console.error('Error creating booking: ', error)
      // Handle error, e.g., display an error message to the user
    }
  }

  //Handle Disable or Enable effects of buttons
  useEffect(() => {
    if (!formData.startTime || !formData.endTime || !formData.dateTimeRequested || !formData.getInTime) {
      setDisableNext(true)
    } else {
      setDisableNext(false)
    }
  }, [formData])

  //Handlers for Next and Back Buttons Click and Submission of Date
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    //Handle Condition, Embed Artist ID and submit form
    if (activeStep === 1) handleSubmit()
  }

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep(prevActiveStep => prevActiveStep - 1)
    if (activeStep === 0) setOpen(false)
    return
  }

  if (artist) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={customLocale}>
        <ThemeProvider theme={customTheme}>
          <div className={styles.bookingCardWrapper}>
            {activeStep === 0 && (
              <BookingCardSchedular
                setOpen={setOpen}
                artist={artist}
                formData={formData}
                handleChangeFormData={handleChangeFormData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleBack={handleBack}
                handleNext={handleNext}
                disableNext={disableNext}
              />
            )}
            {activeStep === 1 && (
              <BookingsModalContent
                setOpen={setOpen}
                artist={artist}
                formData={formData}
                handleChangeFormData={handleChangeFormData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleBack={handleBack}
                handleNext={handleNext}
                disableNext={disableNext}
              />
            )}

        

            {activeStep === 2 && (
              <Grid container direction='column' overflow={'auto'} height='100%'>
                <Typography sx={{ fontSize: '24px', fontWeight: '700' }} gutterBottom>
                  {artist && artist.firstName} {artist && artist.lastName}
                </Typography>
                <Grid container gap={1} marginBottom={4}>
                  {artist.genre.length > 0 && artist.genre.map((g, index) => <Tag key={`${g}-${index}`}>{g}</Tag>)}
                </Grid>
                <Grid container justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='19px' fontWeight='600'>
                    Summary
                  </Typography>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    fontSize='15px'
                    color='#62AFE8'
                    onClick={() => setActiveStep(0)}
                  >
                    Change
                  </Typography>
                </Grid>
                <Grid container className={styles.summaryDetailsContainer}>
                  <Grid item>
                    <Calendar />
                  </Grid>
                  <Grid item>
                    <Typography fontSize='15px' color='#4B627F'>
                      Date
                    </Typography>
                    <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
                      {dayjs(formData.dateTimeRequested).format('YYYY-MM-DD')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={styles.summaryDetailsContainer}>
                  <Grid item>
                    <Clock />
                  </Grid>
                  <Grid display='flex' gap={8}>
                    <Grid item textAlign='center'>
                      <Typography fontSize='15px' color='#4B627F'>
                        Get In
                      </Typography>
                      <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
                        {dayjs(formData.getInTime).format('HH:mm')}
                      </Typography>
                    </Grid>
                    <Grid item textAlign='center'>
                      <Typography fontSize='15px' color='#4B627F'>
                        Start
                      </Typography>
                      <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
                        {dayjs(formData.startTime).format('HH:mm')}
                      </Typography>
                    </Grid>
                    <Grid item textAlign='center'>
                      <Typography fontSize='15px' color='#4B627F'>
                        End
                      </Typography>
                      <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>
                        {dayjs(formData.endTime).format('HH:mm')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container gap={4} marginTop={3}>
                  <Typography sx={{ fontSize: '19px', fontWeight: '600' }}>Your Details</Typography>
                </Grid>
                <Grid container direction='column' marginTop={3} color="'#4B627F'">
                  <TextField
                    fullWidth
                    type='text'
                    label='First Name'
                    value={user.firstName}
                    // onChange={handleFieldChange('email')}
                    sx={{ mb: 1 }}
                    size='small'
                  />
                  <TextField
                    fullWidth
                    type='text'
                    label='Last Name'
                    value={user.lastName}
                    // onChange={handleFieldChange('email')}
                    sx={{ mb: 1 }}
                    size='small'
                  />
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={user.email}
                    // onChange={handleFieldChange('email')}
                    sx={{ mb: 1 }}
                    size='small'
                  />
                  <TextField
                    fullWidth
                    type='tel'
                    label='Phone'
                    value={user.contactPhone}
                    // onChange={handleFieldChange('email')}
                    sx={{ mb: 1 }}
                    size='small'
                  />
                </Grid>
                <Grid marginTop='auto'>
                  <NavMobileStepper
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                </Grid>
              </Grid>
              // <BookingCardSummary setActiveStep={setActiveStep} setOpen={setOpen} activeStep={activeStep} artist={artist}/>
            )}
            {activeStep === 3 && (
              <Grid textAlign='center' color='#183D4C'>
                <Typography fontSize='32px' fontWeight='450' marginTop='55px'>
                  Thank you!
                </Typography>
                <Typography fontSize='17px' fontWeight='400' marginTop='40px'>
                  Your booking is now pending moderation. We will get back to you with further details.
                </Typography>
                <Grid marginTop={4}>
                  <CheckCircle
                    style={{
                      color: '#32ED7D',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      padding: '0px',
                      border: '2px solid red'
                    }}
                  />
                </Grid>
                <Button
                  onClick={() => router.push(`/admin/bookings/${user.role}`)}
                  sx={{
                    background: '#FC8A5E',
                    width: '70%',
                    fontSize: '19px',
                    marginTop: '8rem',
                    color: 'white',
                    borderRadius: '50px',
                    textTransform: 'none',
                    boxShadow: '0px 8px 20px #fc8e5e40',
                    ':hover': {
                      background: '#f07a4b'
                    }
                  }}
                >
                  View Booking
                </Button>
                <Typography color='#62AFE8' marginTop={2}>
                  <Link href={'/'}>Back to Home</Link>
                </Typography>
              </Grid>
            )}
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    )
  } else {
    return <div> Please Choose An Artist First </div>
  }
}

export const NavMobileStepper = ({ activeStep, setActiveStep, handleNext, handleBack, disableNext, allowCancel }) => {
  const theme = useTheme()
  const buttonStyle = {
    background: '#D5DFEC',
    color: '#4B627F',
    borderRadius: '9px',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 14px',
    width: '110px',
    textTransform: 'none',
    ':hover': { background: '#f07a4b' }
  }

  return (
    <div className={styles.mobileStepperWrapper}>
      <MobileStepper
        variant='dots'
        sx={{
          marginTop: 'auto',
          color: '#FC8A5E',
          fontSize: '20px',
          '& .MuiMobileStepper-dot': {
            backgroundColor: '#f07a4b6e'
          },
          '.MuiMobileStepper-dots': {
            gap: '20px'
          },
          '.MuiMobileStepper-dotActive': {
            background: '#f07a4b'
          }
        }}
        steps={3}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            sx={{
              ...buttonStyle,
              background: '#FC8A5E',
              color: 'white',
              display: 'flex',
              gap: '5px'
            }}
            onClick={handleNext}
            disabled={disableNext}
          >
            Next
            {theme.direction === 'rtl' ? <ArrowLeft color='white' /> : <ArrowRight color='white' />}
          </Button>
        }
        backButton={
          <Button
            size='small'
            onClick={handleBack}
            sx={{
              ...buttonStyle,
              ':hover': { background: '#D5DFEC' },
              display: 'flex',
              gap: '5px'
            }}
          >
            {theme.direction === 'rtl' ? <ArrowRight /> : <ArrowLeft />}
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
        }
      />
    </div>
  )
}

const VerticalDivider = () => {
  return <div className={styles.verticalDivider}></div>
}

export default BookingCard

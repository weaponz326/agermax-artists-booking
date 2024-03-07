import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { LocalizationProvider, TimePicker, DateCalendar } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Tag } from 'src/pages/artists/[id]'
import { Calendar, Clock } from 'iconsax-react'
import styles from './BookingCard.module.css'
import CheckCircle from '@material-ui/icons/CheckCircle'
// import { createBooking } from 'src/services/bookings'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import dayjs from 'dayjs'
import useBookingFormData from 'src/hooks/useBookingFormData'
import { useRouter } from 'next/router'
import { useBookings } from 'src/providers/BookingsProvider'

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

      // MuiButton: {
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
            fontFamily: 'inherit'
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
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              padding: '20px',
              fontFamily: 'var(--main-font-family)'
            }}
            className='bookingCardWrapper'
          >
            <div style={{ height: '100%' }}>
              {activeStep === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#183D4C' }}>
                  <Typography sx={{ fontSize: '24px', fontWeight: '700' }} gutterBottom>
                    {artist && artist.firstName} {artist && artist.lastName}
                  </Typography>
                  <div style={{ gap: '8px', marginBottom: '32px', display: 'flex' }}>
                    {artist ? (
                      artist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)
                    ) : (
                      <Tag>No genre provided yet.</Tag>
                    )}
                  </div>
                  <Typography sx={{ fontSize: '19px', fontWeight: '400' }} gutterBottom>
                    Choose When 👇
                  </Typography>
                  <Grid marginBottom={2} padding='16px' borderRadius='20px' boxShadow='0 7px 36px #00000014 '>
                    <DateCalendar
                      sx={{
                        width: '100%',
                        '& .MuiDayCalendar-header': {
                          justifyContent: 'space-between',
                          fontSize: '1rem'
                        },
                        '& .MuiDayCalendar-weekContainer': {
                          justifyContent: 'space-between'
                        },
                        '& .MuiPickersCalendarHeader-label': {
                          color: '#4B627F'
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          color: '#4B627F',
                          fontSize: '16px'
                        }
                      }}
                      // onChange={date => handleChange('dateTimeRequested', dayjs(date))}
                      onChange={date => handleChangeFormData('dateTimeRequested', dayjs(date), artist)}
                      // className={styles.modalCardContentInputField}
                      label='Select Event Date'
                      value={formData.dateTimeRequested ? dayjs(formData.dateTimeRequested) : null}
                      disablePast
                      name='dateTimeRequested'
                    />
                  </Grid>
                  <Typography gutterBottom fontSize='17px' color='#183D4C' fontWeight='450'>
                    What time?
                  </Typography>
                  <Grid container border='1px solid #CBD4DC' borderRadius='12px'>
                    <Grid item xs={4} padding={1.5}>
                      <Typography color='#4B627F' fontSize='13px'>
                        Get In Time
                      </Typography>
                      <TimePicker
                        name='getInTime'
                        value={dayjs(formData.getInTime)}
                        minutesStep={15}
                        // onChange={time => handleChange('getInTime', dayjs(time))}
                        onChange={time => handleChangeFormData('getInTime', dayjs(time))}
                        sx={{
                          '& .MuiTextField-root': {
                            paddingRight: '12px'
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            fontSize: '19px',
                            color: '#183D4C',
                            fontWeight: '600'
                          },
                          '& .MuiIconButton-root': {
                            padding: '0'
                          },
                          '& .MuiOutlinedInput-root': {
                            padding: '0 10px 0 0'
                          },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '& MuiMultiSectionDigitalClockSection-item.Mui-selected ': { backgroundColor: '#FC8A5E' }
                        }}
                        format='HH:mm'
                        disabled={!formData.dateTimeRequested}
                        skipDisabled
                        ampm={false}
                      />
                    </Grid>
                    <Grid item xs={4} padding={1.5}>
                      <Typography color='#4B627F' fontSize='13px'>
                        Start Time
                      </Typography>
                      <TimePicker
                        minutesStep={15}
                        minTime={formData.getInTime ? dayjs(formData.getInTime).add(1, 'hour') : undefined}
                        // onChange={time => handleChange('startTime', dayjs(time))}
                        onChange={time => handleChangeFormData('startTime', dayjs(time))}
                        value={dayjs(formData.startTime)}
                        sx={{
                          '& .MuiTextField-root': {
                            paddingRight: '12px'
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            fontSize: '19px',
                            color: '#183D4C',
                            fontWeight: '600'
                          },
                          '& .MuiIconButton-root': {
                            padding: '0'
                          },
                          '& .MuiOutlinedInput-root': {
                            padding: '0 10px 0 0'
                          },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '& MuiMultiSectionDigitalClockSection-item.Mui-selected ': { backgroundColor: '#FC8A5E' }
                        }}
                        name='startTIme'
                        format='HH:mm'
                        disabled={!formData.getInTime}
                        ampm={false}
                        skipDisabled
                      />
                    </Grid>
                    <Grid item xs={4} padding={1.5}>
                      <Typography color='#4B627F' fontSize='13px'>
                        End Time
                      </Typography>
                      <TimePicker
                        minutesStep={15}
                        minTime={formData.startTime ? dayjs(formData.startTime).add(1, 'hour') : undefined}
                        value={formData.endTime}
                        sx={{
                          '& .MuiTextField-root': {
                            paddingRight: '12px'
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '0',
                            fontSize: '19px',
                            color: '#183D4C',
                            fontWeight: '600'
                          },
                          '& .MuiIconButton-root': {
                            padding: '0'
                          },
                          '& .MuiOutlinedInput-root': {
                            padding: '0 10px 0 0'
                          },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                          '& MuiMultiSectionDigitalClockSection-item.Mui-selected ': { backgroundColor: '#FC8A5E' }
                        }}
                        // onChange={time => handleChange('endTime', dayjs(time))}
                        onChange={time => handleChangeFormData('endTime', dayjs(time))}
                        format='HH:mm'
                        disabled={!formData.startTime}
                        skipDisabled
                        ampm={false}
                        name='endTime'
                      />
                    </Grid>
                  </Grid>
                  <Grid marginTop='auto'>
                    <NavMobileStepper
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      disableNext={disableNext}
                      // allowCancel={allowCancel}
                    />
                  </Grid>
                </div>
              )}

              {activeStep === 1 && (
                <Grid container direction='column' overflow={'auto'} height='100%'>
                  <Typography sx={{ fontSize: '24px', fontWeight: '700' }} gutterBottom>
                    {artist && artist.firstName} {artist && artist.lastName}
                  </Typography>
                  <Grid container gap={1} marginBottom={4}>
                    {artist.genre.length ? (
                      artist.genre.map((g, index) => <Tag key={`${g}-${index}`}>{g}</Tag>)
                    ) : (
                      <Tag>No genre provided yet.</Tag>
                    )}
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
                    <Typography>
                      Name: {user.firstName} {user.lastName}
                    </Typography>
                    <Typography>User Type: {user.role}</Typography>
                    <Typography>Contact: {user.contactPhone}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Address: {user.address}</Typography>
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
              )}
              {activeStep === 2 && (
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
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    )
  } else {
    return <div> Please Choose An Artist First </div>
  }
}

const NavMobileStepper = ({ activeStep, setActiveStep, handleNext, handleBack, disableNext, allowCancel }) => {
  const theme = useTheme()

  return (
    <MobileStepper
      variant='dots'
      sx={{
        marginTop: 'auto',
        color: '#FC8A5E',
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: '#f07a4b'
        },
        '.MuiMobileStepper-dots': {
          gap: '15px'
        }
      }}
      steps={3}
      position='static'
      activeStep={activeStep}
      nextButton={
        <Button
          size='small'
          sx={{
            background: '#FC8A5E',
            color: 'white',
            borderRadius: '9px',
            padding: '8px 10px',
            ':hover': { background: '#f07a4b' }
          }}
          onClick={handleNext}
          disabled={disableNext}
        >
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button
          size='small'
          onClick={handleBack}
          sx={{
            background: '#D5DFEC',
            // display: !allowCancel && 'none',
            color: '#4B627F',
            borderRadius: '9px',
            padding: '8px 10px',
            ':hover': { background: '#f07a4b' }
          }}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
      }
    />
  )
}

export default BookingCard

import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import TextField from '@mui/material/TextField'

import dayjs from 'dayjs'
// import moment from 'moment'

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
// import { Tag } from 'src/pages/artist-profile'
import { Tag } from 'src/pages/artists/[id]'
import { Calendar, Clock } from 'iconsax-react'
import styles from './BookingCard.module.css'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { createBooking } from 'src/services/bookings'
import { useAuth } from 'src/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavBarBookingCard({
  onDone,
  open,
  setOpen,
  artist,
  allowCancel,
  formData,
  setFormData,
  handleSetFormData,
  selectedArtist,
  setSelectedArtist,
  setActiveInputTab,
  activeInputTab
}) {
  const router = useRouter()

  /****************Fetch Artist ********************/
  useEffect(() => {
    if (artist) setSelectedArtist(artist)
  }, [artist])

  const { user } = useAuth()
  const [activeStep, setActiveStep] = useState(0)
  const [disableNext, setDisableNext] = useState(true)
  const [cleared, setCleared] = useState(false)

  const customTheme = createTheme({
    components: {
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: '#4B627F',
            // padding: '0',
            justifyContent: 'space-between',
            fontFamily: 'inherit'
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          today: {
            color: '#bbdefb',
            borderRadius: 19,
            borderWidth: 4,
            borderColor: '#2196f3',
            border: '4px solid',
            backgroundColor: '#0d47a1'
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

      MuiIconButton: {
        styleOverrides: {
          root: {
            margin: '0'
          }
        }
      },
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
            fontFamily: 'inherit',
            overflow: 'auto'
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
            fontSize: '16px',
            overflow: 'auto',

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

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData)
  }

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
    if (formData.getInTime && formData.startTime && formData.endTime && formData.dateTimeRequested) {
      setDisableNext(false)
    } else {
      setDisableNext(true)
    }
  }, [formData])

  //Handlers for Next and Back Buttons Click and Submission of Date
  const handleNext = () => {
    if (activeStep === 1) {
      setActiveInputTab(2)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep(prevActiveStep => prevActiveStep - 1)
    if (activeStep === 0) setOpen(false)
    return
  }

  if (selectedArtist != null) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              {activeStep != 2 && (
                <div>
                  <Typography fontSize='24px' fontWeight='500' gutterBottom>
                    {selectedArtist.firstName} {selectedArtist.lastName}
                  </Typography>
                  <Grid container gap={1} marginBottom={4}>
                    {selectedArtist.genre.length ? (
                      selectedArtist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)
                    ) : (
                      <Tag>No genre provided yet.</Tag>
                    )}
                  </Grid>
                </div>
              )}
              {activeStep === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#183D4C' }}>
                  {/* <div style={{ gap: '8px', marginBottom: '32px', display: 'flex' }}>
                    {selectedArtist.genre ? (
                      selectedArtist.genre.map((g, index) => <Tag key={`${g} index`}>{g}</Tag>)
                    ) : (
                      <Tag>No genre provided yet.</Tag>
                    )}
                  </div> */}
                  <Typography sx={{ fontSize: '19px', fontWeight: '400' }} gutterBottom>
                    Choose When 👇
                  </Typography>
                  <Grid marginBottom={2} padding='16px' borderRadius='20px' boxShadow='0 7px 36px #00000014 '>
                    <DatePicker
                      onChange={date => handleChange('dateTimeRequested', dayjs(date))}
                      className={styles.modalCardContentInputField}
                      label='Select Event Date'
                      value={formData.dateTimeRequested ? dayjs(formData.dateTimeRequested) : null}
                      disablePast
                      name='dateTimeRequested'
                      autoFocus
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
                    />
                  </Grid>
                  <Typography gutterBottom fontSize='17px' color='#183D4C' fontWeight='450'>
                    What time?
                  </Typography>
                  <Grid container border='1px solid #CBD4DC' borderRadius='12px'>
                    <Grid item xs={4} padding={1.5}>
                      <Typography color='#4B627F' fontSize='13px'>
                        Get In Time{' '}
                      </Typography>
                      <TimePicker
                        name='getInTime'
                        value={dayjs(formData.getInTime)}
                        minutesStep={15}
                        onChange={time => handleChange('getInTime', dayjs(time))}
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
                        onChange={time => handleChange('startTime', dayjs(time))}
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
                        onChange={time => handleChange('endTime', dayjs(time))}
                        format='HH:mm'
                        disabled={!formData.startTime}
                        skipDisabled
                        ampm={false}
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
                <Grid height='100%' container flexDirection='column'>
                  <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography fontSize='19px' fontWeight='450'>
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
                      <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
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
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.getInTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid item textAlign='center'>
                        <Typography fontSize='15px' color='#4B627F'>
                          Start
                        </Typography>
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.startTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid item textAlign='center'>
                        <Typography fontSize='15px' color='#4B627F'>
                          End
                        </Typography>
                        <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>
                          {dayjs(formData.endTime).format('HH:mm')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid container gap={4} marginTop={3}>
                    <Typography sx={{ fontSize: '19px', fontWeight: '450' }}>Your Details</Typography>
                  </Grid> */}
                  {/* <Grid container direction='column' marginTop={3} color='#4B627F' gap={1}>
                    <TextField
                      placeholder='First Name'
                      className={styles.modalCardContentInputField}
                      type='text'
                      name='firstName'
                      id='firstName'
                      value={user.firstName}
                      // onChange={handleChange}
                      required
                      variant='outlined'
                      label='First Name'
                      size='small'
                    />
                    <TextField
                      placeholder='Last Name'
                      className={styles.modalCardContentInputField}
                      type='text'
                      name='lastName'
                      id='lastName'
                      value={user.lastName}
                      // onChange={handleChange}
                      required
                      variant='outlined'
                      label='Last Name'
                      size='small'
                    />
                    <TextField
                      placeholder='Email'
                      className={styles.modalCardContentInputField}
                      type='email'
                      name='email'
                      id='email'
                      value={user.email}
                      // onChange={handleChange}
                      required
                      variant='outlined'
                      label='Email ID'
                      size='small'
                    />
                    <TextField
                      placeholder='Phone'
                      className={styles.modalCardContentInputField}
                      type='tel'
                      name='phoneContact'
                      id='phoneContact'
                      value={user.contactPhone}
                      // onChange={handleChange}
                      required
                      variant='outlined'
                      label='Phone'
                      size='small'
                    />
                  </Grid> */}
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
              {/* {activeStep === 2 && (
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
                </Grid>
              )} */}
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    )
  } else {
    return <p onClick={() => setActiveInputTab(0)}>Please Select Performer First</p>
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
            display: !allowCancel && 'none',
            color: '#4B627F',
            borderRadius: '9px',
            padding: '8px 10px',
            ':hover': { background: '#f07a4b' }
          }}
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </Button>
      }
    />
  )
}

export default NavBarBookingCard

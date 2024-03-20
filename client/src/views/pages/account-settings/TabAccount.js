import React, { useState } from 'react'
import axios from 'axios'
import {
  Grid,
  Chip,
  Divider,
  Box,
  Button,
  Typography,
  InputAdornment,
  TextField,
  Snackbar,
  Alert,
  Autocomplete
} from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field' // Adjust based on your project structure
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import IconButton from '@mui/material/IconButton'
import { useAuth } from 'src/hooks/useAuth'
import ImageUpload from 'src/components/ImageUpload/ImageUpload'
import FileUploaderMultiple from 'src/components/FileUploader/FileUploader'
import Icon from 'src/@core/components/icon'
import ArrayFieldComponent from 'src/pages/admin/account/ArrayFieldComponent'

const TabAccount = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info') // Can be 'error', 'warning', 'info', 'success'

  const { user, token } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    contactPhone: user?.contactPhone || '',
    address: user?.address || ''
  })

  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '')
  const [additionalFormData, setAdditionalFormData] = useState({
    bio: user?.bio || '',
    genre: user?.genre || [''],
    nickName: user?.nickName || '',
    socialMediaLinks: user?.socialMediaLinks || [''],
    availableDates: user?.availableDates || [''],
    eventsHosted: user?.eventsHosted || [''],
    companyName: user?.companyName || '',
    organizationNumber: user?.organizationNumber || '',
    gallery: user?.gallery || ['']
  })

  // Handler functions
  const handleProfilePhotoChange = newPhoto => {
    // Assuming this method updates the state with the new photo
    setProfilePhoto(newPhoto)
  }

  const handleFormChange = field => event => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleAdditionalFormChange = field => event => {
    setAdditionalFormData({ ...additionalFormData, [field]: event.target.value })
  }
  const handleGenresChange = newGenres => {
    setAdditionalFormData(prev => ({ ...prev, genre: newGenres }))
  }

  const handleEventsHostedChange = newEventsHosted => {
    setAdditionalFormData(prev => ({ ...prev, eventsHosted: newEventsHosted }))
  }
  const formattedAvailableDates = additionalFormData.availableDates.map(date =>
    date instanceof Date ? date.toISOString().split('T')[0] : date
  )
  const handleArrayChange = (field, index) => event => {
    const newValues = [...additionalFormData[field]]
    newValues[index] = event.target.value
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }

  const addArrayField = field => () => {
    const newValues = [...additionalFormData[field], '']
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }

  const removeArrayField = (field, index) => () => {
    const newValues = additionalFormData[field].filter((_, idx) => idx !== index)
    setAdditionalFormData({ ...additionalFormData, [field]: newValues })
  }
  const genreOptions = [
    '🎶 Troubadour',
    '🎸 Cover Band',
    '🎹 Musician',
    '🎤 Singer',
    '🎙 Confrensier',
    '🎧 DJ',
    '🎭 Stand up Comedian',
    '🎪 Show Group',
    '🎹🍸 Bar Piano',
    '🎩✨ Magician'
  ]

  const handleSubmit = async e => {
    e.preventDefault()

    const combinedData = {
      ...formData,
      ...additionalFormData,
      availableDates: formattedAvailableDates,
      // Filter out empty strings to avoid appending unnecessary data
      genre: additionalFormData.genre.filter(item => item),
      socialMediaLinks: additionalFormData.socialMediaLinks.filter(item => item),
      eventsHosted: additionalFormData.eventsHosted.filter(item => item),
      gallery: additionalFormData.gallery.filter(item => item)
    }

    const formDataToSend = new FormData()
    if (profilePhoto && profilePhoto.file) {
      formDataToSend.append('profilePhoto', profilePhoto.file)
    }

    Object.keys(combinedData).forEach(key => {
      if (Array.isArray(combinedData[key])) {
        combinedData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item)
        })
      } else {
        formDataToSend.append(key, combinedData[key])
      }
    })

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile`, formDataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data)
      setSnackbarMessage('Profile updated successfully.')
      setSnackbarSeverity('success')
    } catch (error) {
      console.error('Error object:', error)
      setSnackbarMessage(`Error updating profile: ${error.response?.data?.message || 'Server error'}`)
      setSnackbarSeverity('error')
    }
    setSnackbarOpen(true)
  }

  // Function to close the Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Profile Photo Upload */}
          <Grid item container spacing={2} alignItems='flex-end' sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <Typography sx={{ mb: 12 }}>Profile Photo</Typography>
            </Grid>
            <Grid item xs={6}>
              <ImageUpload
                profilePhoto={profilePhoto}
                setProfilePhoto={setProfilePhoto}
                formData={formData}
                setFormData={setFormData}
              />
            </Grid>
            <Divider sx={{ width: '100%', m: 4 }} />
          </Grid>

          {/* Basic Information Fields */}
          {Object.entries(formData).map(([field, value]) => (
            <Grid item container spacing={2} key={field} alignItems='flex-end' sx={{ mb: 4 }}>
              <Grid item xs={4}>
                <Typography sx={{ mb: 2 }}>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  value={value}
                  onChange={handleFormChange(field)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon
                          icon={
                            field === 'email'
                              ? 'tabler:mail'
                              : field === 'firstName'
                              ? 'tabler:user'
                              : field === 'lastName'
                              ? 'tabler:user'
                              : field === 'contactPhone'
                              ? 'tabler:phone'
                              : field === 'address'
                              ? 'tabler:map-pin'
                              : 'tabler:circle'
                          }
                        />{' '}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>{' '}
              <Divider sx={{ width: '100%', m: 4 }} />
            </Grid>
          ))}

          {/* Artist-specific Fields: Bio and Genre */}
          {user.role === 'artist' && (
            <>
              <Grid item container spacing={2} alignItems='flex-end' sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Typography>Bio</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={additionalFormData.bio}
                    onChange={handleAdditionalFormChange('bio')}
                  />
                </Grid>
                <Divider sx={{ width: '100%', m: 4 }} />
              </Grid>

              <Grid item xs={4}>
                <Typography>Genres</Typography>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  id='genre-select'
                  options={genreOptions}
                  value={additionalFormData.genre}
                  onChange={(event, newValue) => {
                    handleGenresChange(newValue)
                  }}
                  renderInput={params => <TextField {...params} variant='outlined' label='Select genres' />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
                  }
                />
              </Grid>

              <Grid item container alignItems='flex-end' spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Typography>Available Dates</Typography>
                </Grid>
                <Grid item xs={6}>
                  <ArrayFieldComponent
                    initialValues={additionalFormData.availableDates}
                    type='date'
                    onChange={newDates => {
                      setAdditionalFormData(prev => ({ ...prev, availableDates: newDates }))
                    }}
                  />
                </Grid>
                <Divider sx={{ width: '100%', m: 4 }} />
              </Grid>
            </>
          )}
          {user.role === 'organizer' && (
            <>
              <Grid item container alignItems='flex-end' spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Typography>Events Hosted</Typography>
                </Grid>
                <Grid item xs={6}>
                  <ArrayFieldComponent
                    initialValues={additionalFormData.eventsHosted}
                    type='text'
                    onChange={handleEventsHostedChange}
                  />
                </Grid>
                <Divider sx={{ width: '100%', m: 4 }} />
              </Grid>
            </>
          )}

          {/* Additional fields for both roles and submission button below... */}

          <Box sx={{ mt: 2, ml: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position Snackbar to the bottom-right
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </>
  )
}

export default TabAccount

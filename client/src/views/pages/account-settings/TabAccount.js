import React, { useState } from 'react'
import { Grid, Box, Button, Typography, InputAdornment, TextField } from '@mui/material'
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
  const handleSubmit = async e => {
    e.preventDefault()

    const combinedData = {
      ...formData,
      ...additionalFormData,
      genre: additionalFormData.genre.filter(item => item),
      socialMediaLinks: additionalFormData.socialMediaLinks.filter(item => item),
      availableDates: additionalFormData.availableDates.filter(item => item),
      eventsHosted: additionalFormData.eventsHosted.filter(item => item),
      gallery: additionalFormData.gallery.filter(item => item) // Assuming you handle file uploads separately and have their references here
    }

    console.log('Combined Form Data:', combinedData)

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile`, combinedData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Profile updated successfully.')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile.')
    }
  }
  const renderArrayFields = (field, label) => {
    return additionalFormData[field].map((value, index) => (
      <Grid container alignItems='center' key={index} spacing={2}>
        <Grid item xs={4}>
          <Typography>
            {label} {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <TextField fullWidth variant='outlined' value={value} onChange={handleArrayChange(field, index)} />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={addArrayField(field)}>
            <AddCircleOutlineIcon />
          </IconButton>
          {index > 0 && (
            <IconButton onClick={removeArrayField(field, index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    ))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Profile Photo Upload */}
          <Grid item container spacing={2} alignItems='flex-end' sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <Typography>Profile Photo</Typography>
            </Grid>
            <Grid item xs={8} sx={{ mb: 4 }}>
              <ImageUpload image={profilePhoto} onImageUpload={handleProfilePhotoChange} />
            </Grid>
          </Grid>

          {/* Basic Information Fields */}
          {Object.entries(formData).map(([field, value]) => (
            <Grid item container spacing={2} key={field} alignItems='flex-end'>
              <Grid item xs={4}>
                <Typography>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
              </Grid>
              <Grid item xs={8} x sx={{ mb: 4 }}>
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
              </Grid>
            </Grid>
          ))}

          {/* Artist-specific Fields: Bio and Genre */}
          {user.role === 'artist' && (
            <>
              <Grid item container spacing={2} alignItems='flex-end' sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Typography>Bio</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={additionalFormData.bio}
                    onChange={handleAdditionalFormChange('bio')}
                  />
                </Grid>
              </Grid>

              {/* Genre Fields */}
              {additionalFormData.genre.map((genre, index) => (
                <Grid container alignItems='center' spacing={2} key={`genre-${index}`}>
                  <Grid item xs={4} sx={{ mb: 4 }}>
                    <Typography>Genre {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <ArrayFieldComponent initialValues={additionalFormData.genre} type='text' />{' '}
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button onClick={addArrayField('genre')}>Add Genre</Button>
              </Grid>
            </>
          )}

          {/* Additional fields for both roles and submission button below... */}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
    </>
  )
}

export default TabAccount

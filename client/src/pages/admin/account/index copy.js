import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import ImageUpload from 'src/components/ImageUpload/ImageUpload' // Ensure this path is correct

// ** Custom Hooks
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

const TabAccount = () => {
  const { user } = useAuth() // Access user context
  const [formData, setFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    contactPhone: '',
    address: '',
    nickName: '',
    genre: '',
    bio: '',
    companyName: '',
    organizationNumber: '',
    socialMediaLinks: [],
    availableDates: [],
    gallery: [],
    eventsHosted: []
  })
  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWZhNTI3MmI1ZDJhZDQzMzBlMDI2NSIsImlhdCI6MTcwNjAwOTg5NSwiZXhwIjoxNzA4NjAxODk1fQ.JQE4OzgIT0DxK-2_ddlkzsB4WasvD99GgNK0DMSrLGc"
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (user) {
      const config = {
        headers: { Authorization: `Bearer ${user.accessToken}` }
      }

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, config)
        .then(response => {
          setFormData(response.data.userData)
        })
        .catch(error => console.error('Error fetching user data:', error))
    }
  }, [user])

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleGalleryChange = files => {
    setFormData({ ...formData, gallery: files[0] })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
      })
      .then(response => {
        setSuccessMessage('Profile updated successfully.')
      })
      .catch(error => {
        console.error('Error updating profile:', error)
        setErrorMessage('Error updating profile.')
      })
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'artist':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nickname'
                value={formData.nickName}
                onChange={e => handleFormChange('nickName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Genre'
                value={formData.genre}
                onChange={e => handleFormChange('genre', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Bio'
                value={formData.bio}
                onChange={e => handleFormChange('bio', e.target.value)}
              />
            </Grid>
            {/* Add additional fields for artist */}
          </>
        )
      case 'organizer':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Company Name'
                value={formData.companyName}
                onChange={e => handleFormChange('companyName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Organization Number'
                value={formData.organizationNumber}
                onChange={e => handleFormChange('organizationNumber', e.target.value)}
              />
            </Grid>
            {/* Add additional fields for organizer */}
          </>
        )
      case 'admin':
        // Add any admin-specific fields here
        return null
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ImageUpload image={formData.gallery} handleImageChange={handleGalleryChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='First Name'
            value={formData.firstName}
            onChange={e => handleFormChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Last Name'
            value={formData.lastName}
            onChange={e => handleFormChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type='email'
            label='Email'
            value={formData.email}
            onChange={e => handleFormChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Phone'
            value={formData.contactPhone}
            onChange={e => handleFormChange('contactPhone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Address'
            value={formData.address}
            onChange={e => handleFormChange('address', e.target.value)}
          />
        </Grid>
        {/* Render role-specific fields */}
        {renderRoleSpecificFields()}
        <Grid item xs={12}>
          {successMessage && <Alert severity='success'>{successMessage}</Alert>}
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <Button type='submit' variant='contained'>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default TabAccount

import { useState } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ChangePasswordCard = () => {
  const { token } = useAuth()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success') // Can be 'error', 'warning', 'info', 'success'
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  // Function to handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  // Function to submit form data
  const onPasswordFormSubmit = async data => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        setSnackbarMessage('Password Changed Successfully')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        reset()
      }
    } catch (error) {
      console.error('Error changing password:', error)
      // Assuming the API returns an error response you can display to the user
      setSnackbarMessage(error.response?.data?.message || 'An error occurred, please try again.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='currentPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Current Password'
                    placeholder='············'
                    type='password'
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => {}} onMouseDown={e => e.preventDefault()}>
                            <Icon fontSize='small' icon='visibility' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='New Password'
                    type='password'
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => {}} onMouseDown={e => e.preventDefault()}>
                            <Icon fontSize='small' icon='visibility' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirmNewPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Confirm New Password'
                    type='password'
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => {}} onMouseDown={e => e.preventDefault()}>
                            <Icon fontSize='small' icon='visibility' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type='submit' variant='contained' sx={{ mr: 1 }}>
              Save Changes
            </Button>
            <Button variant='outlined' onClick={() => reset()}>
              Reset
            </Button>
          </Box>
        </form>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard

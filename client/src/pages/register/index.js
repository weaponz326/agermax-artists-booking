// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { Box, Divider } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Avatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const Register = () => {
  // ** State for form values
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: ''
  })

  // ** State for form submission status
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const auth = useAuth()

  // ** Router for redirection after successful registration
  const router = useRouter()

  // ** Handle form field changes
  const handleFieldChange = prop => event => {
    setFormValues({ ...formValues, [prop]: event.target.value })
  }

  // ** Handle form submission
  const handleSubmit = async event => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    // Construct the form data
    const formData = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role
    }

    // Use auth.register to submit the form data
    auth.register(formData, err => {
      setSubmitting(false)
      if (err) {
        setError(err.response.data.message || 'An error occurred. Please try again.')
      } else {
        router.push('/admin/account/account') // Or redirect to a 'success' page
      }
    })
  }

  // ** Theme hook
  const theme = useTheme()

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: theme.spacing(12, 9, 7) }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href={'/'}>
              <Avatar src='/images/logo.png' alt='Logo' />
            </Link>
            <Link href={'/'}>
              <Typography variant='h6' sx={{ ml: 3, fontWeight: 600 }}>
                {themeConfig.templateName}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, fontWeight: 600 }}>
              Adventure starts here 🚀
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='First Name'
              value={formValues.firstName}
              onChange={handleFieldChange('firstName')}
              sx={{ mb: 4 }}
            />
            <TextField
              fullWidth
              label='Last Name'
              value={formValues.lastName}
              onChange={handleFieldChange('lastName')}
              sx={{ mb: 4 }}
            />
            <TextField
              fullWidth
              type='email'
              label='Email'
              value={formValues.email}
              onChange={handleFieldChange('email')}
              sx={{ mb: 4 }}
            />
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id='form-role-label'>Member Type</InputLabel>
              <Select
                labelId='form-role-label'
                id='form-role'
                value={formValues.role}
                label='Member Type'
                onChange={handleFieldChange('role')}
              >
                <MenuItem value='artist'>Artist</MenuItem>
                <MenuItem value='organizer'>Organizer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type='password'
              label='Password'
              value={formValues.password}
              onChange={handleFieldChange('password')}
              sx={{ mb: 4 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setFormValues({ ...formValues, showPassword: !formValues.showPassword })}
                      aria-label='toggle password visibility'
                    >
                      <Icon icon={formValues.showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && (
              <Typography color='error' sx={{ mb: 4 }}>
                {error}
              </Typography>
            )}
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <Link href={'/login'}>
            <Typography variant='h6' sx={{ fontWeight: 600, ':hover': { textDecoration: 'underline' } }}>
              Have an account? Login instead.
            </Typography>
          </Link>
          {/* <Divider sx={{ my: 5 }}>or</Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton sx={{ mx: 1, color: 'text.primary' }}>
              <Icon icon='mdi:facebook' />
            </IconButton>
            <IconButton sx={{ mx: 1, color: 'text.primary' }}>
              <Icon icon='mdi:google' />
            </IconButton>
            <IconButton sx={{ mx: 1, color: 'text.primary' }}>
              <Icon icon='mdi:twitter' />
            </IconButton>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  )
}

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register

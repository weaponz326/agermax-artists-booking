// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  token: null,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  initiateOAuth: provider => {}
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [token, setToken] = useState(defaultProvider.token) // State for the token
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    // Function to handle authentication and token storage after OAuth redirection
    const handleOAuthRedirection = () => {
      // Check for the presence of accessToken and potentially other user data in the URL
      const { accessToken } = router.query
      if (accessToken) {
        // Store the accessToken in localStorage
        window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
        setLoading(true)
        // Optionally fetch user data here if not already provided in the URL
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => {
            setUser(response.data.userData)
            // Remove the accessToken from the URL to clean up the address bar
            const cleanUrl = window.location.pathname
            window.history.replaceState({}, document.title, cleanUrl)
          })
          .catch(error => {
            console.error('Error fetching user data:', error)
            // Handle error, e.g., by logging out the user
          })
          .finally(() => setLoading(false))
      }
    }

    handleOAuthRedirection()
  }, [router.query])

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            console.log('Log in Successful')
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (storedToken) {
      setToken(storedToken) // Set the token from localStorage
    }
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        const redirectURL = returnUrl ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleRegistration = async (params, errorCallback) => {
    try {
      const response = await axios.post(authConfig.registerEndpoint, params)
      const { accessToken, userData } = response.data
      window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
      window.localStorage.setItem('userData', JSON.stringify(userData))
      setUser(userData)

      const returnUrl = router.query.returnUrl || '/admin/account' // Default to '/admin/account' if `returnUrl` isn't specified
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/admin/home'
      router.replace(redirectURL)
    } catch (err) {
      if (errorCallback) errorCallback(err)
    }
  }

  const initiateOAuth = provider => {
    window.location.href = `${authConfig.oauthEndpoint}/${provider}`
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    token,
    setToken: newToken => {
      window.localStorage.setItem(authConfig.storageTokenKeyName, newToken)
      setToken(newToken)
    },
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegistration,
    initiateOAuth
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

// AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const isBrowser = typeof window !== 'undefined' // Check if running in a browser environment
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check local storage for initial login state only if in a browser environment
    if (isBrowser) {
      const storedLoggedIn = localStorage.getItem('isLoggedIn')
      return storedLoggedIn ? JSON.parse(storedLoggedIn) : false
    }
    return false
  })

  useEffect(() => {
    // Update local storage when login state changes, only if in a browser environment
    if (isBrowser) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    }
  }, [isLoggedIn])

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

// AuthContext.js
export const useAuth = () => {
  return useContext(AuthContext) // Assumes AuthContext was defined earlier
}

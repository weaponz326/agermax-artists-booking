import React, { useContext, createContext, useEffect, useState } from 'react'
import * as services from 'src/services/users'

const UserContext = createContext()

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersList = await services.getAllUsers()
        setUsers(usersList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateUser = async (userID, userData) => {
    try {
      const { data } = await services.updateUserById(userID, userData)
      const updatedUser = data

      setUsers(
        users.map(user => {
          console.log(user._id, updatedUser._id)
          if (user._id === updatedUser._id) return updatedUser
          else return user
        })
      )
    } catch (error) {
      // Handle error
      console.error('Error updating user:', error)
    }
  }

  return <UserContext.Provider value={{ users, setUsers, loading, error, updateUser }}>{children}</UserContext.Provider>
}

export default UsersProvider

// Consumer custom hook
export const useUsers = () => {
  const context = useContext(UserContext)
  if (!context.users) {
    console.log('No users fetched')
  }
  return context
}

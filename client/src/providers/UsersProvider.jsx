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
  }, [users])

  const updateUser = async (userID, userData) => {
    const updatedUser = await services.updateUserById(userID, userData)
    console.log(`updatedUser:`, updatedUser)

    setUsers(
      users.map(user => {
        if (user._id === updatedUser._id) return updatedUser
        else return user
      })
    )
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

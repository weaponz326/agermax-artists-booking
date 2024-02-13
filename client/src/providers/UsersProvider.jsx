import React, { useContext, createContext, useEffect, useState } from 'react'
import { getAllUsers } from 'src/services/users'

const UserContext = createContext()

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UsersList = await getAllUsers()
        setUsers(UsersList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return <UserContext.Provider value={{ users, setUsers, loading, error }}>{children}</UserContext.Provider>
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

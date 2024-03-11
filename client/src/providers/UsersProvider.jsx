import React, { useContext, createContext, useEffect, useState } from 'react'
import * as services from 'src/services/users'

const UserContext = createContext()

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUsersListUpdated, setIsUsersListUpdated] = useState(null)

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
  }, [isUsersListUpdated])

  const updateUser = async (userID, userData) => {
    try {
      const { data } = await services.updateUserById(userID, userData)
      const updatedUser = data

      setUsers(
        users.map(user => {
          if (user._id === updatedUser._id) return updatedUser
          else return user
        })
      )
    } catch (error) {
      // Handle error
      console.error('Error updating user:', error)
    }
  }

  const uploadUserPhotoUpdate = async userData => {
    const { data } = await services.uploadUserProfilePhoto(userData)
  }

  const addUser = async userData => {
    const newUser = await services.addUser(userData)
    return newUser

    // setUsers(users.filter(u => u._id !== userID))
  }

  const deleteUser = async userID => {
    const deletedUser = await services.deleteUserById(userID)
    // Update local state to remove deleted booking
    setUsers(users.filter(u => u._id !== userID))
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loading,
        error,
        updateUser,
        deleteUser,
        addUser,
        setIsUsersListUpdated,
        uploadUserPhotoUpdate
      }}
    >
      {children}
    </UserContext.Provider>
  )
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

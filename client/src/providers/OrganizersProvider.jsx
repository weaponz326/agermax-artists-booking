import React, { useContext, createContext, useEffect, useState } from 'react'
import { getAllOrganizersFromUsers } from 'src/services/organizers'

const OrganizerContext = createContext()

const OrganizersProvider = ({ children }) => {
  const [organizers, setOrganizers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizersList = await getAllOrganizersFromUsers()
        setOrganizers(organizersList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <OrganizerContext.Provider value={{ organizers, setOrganizers, loading, error }}>
      {children}
    </OrganizerContext.Provider>
  )
}

export default OrganizersProvider

// Consumer custom hook
export const useOrganizers = () => {
  const context = useContext(OrganizerContext)
  if (!context.organizers) {
    console.log('No Organizers fetched')
  }
  return context
}

import React, { useContext, createContext, useEffect, useState } from 'react'
import { getOnlyArtistsList } from 'src/services/FetchData'

const ArtistContext = createContext()

const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsList = await getOnlyArtistsList()
        setArtists(artistsList)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return <ArtistContext.Provider value={{ artists, setArtists, loading, error }}>{children}</ArtistContext.Provider>
}

export default ArtistsProvider

// Consumer custom hook
export const useArtists = () => {
  const context = useContext(ArtistContext)
  if (!context) {
    throw new Error('useArtists must be used within an ArtistsProvider')
  }
  return context
}

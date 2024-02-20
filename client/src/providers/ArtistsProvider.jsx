import React, { useContext, createContext, useEffect, useState } from 'react'
import { getAllArtists } from 'src/services/artists'
import { getAllArtistsFromUsers } from 'src/services/artists'

const ArtistContext = createContext()

const ArtistsProvider = ({ children }) => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsList = await getAllArtistsFromUsers()
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
  if (!context.artists) {
    console.log('No Artists fetched')
  }
  return context
}

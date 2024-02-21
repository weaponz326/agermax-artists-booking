import Unsplash from 'src/components/mock-data-apis/Unsplash'

export const getRandomArtistPhotos = async () => {
  try {
    const response = await Unsplash.get('/search/photos', {
      params: {
        per_page: 10,
        query: 'food'
      }
    })
    return response.data // Return the data from the response
  } catch (error) {
    console.log('Error fetching random artist photos:', error)
    throw error // Re-throw the error to propagate it
  }
}

// export const getOnePhoto = async () => {
//   const photos = await getRandomArtistPhotos()
//   return photos
// }

export const getOnePhoto = async () => {
  try {
    const photos = await getRandomArtistPhotos() // Need to await the result
    return photos // This returns a Promise, should await it when calling this function
  } catch (error) {
    console.log('Error fetching one photo:', error)
    throw error // Re-throw the error to propagate it
  }
}

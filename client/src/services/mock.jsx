import Unsplash from 'src/components/mock-data-apis/Unsplash'

export const getRandomArtistPhotos = async () => {
  try {
    const response = await Unsplash.get('/musicartist', {
      params: {
        per_page: 10
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getOnePhoto = async () => {
  const photos = await getRandomArtistPhotos()
  return photos
}

// import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import usersData from 'src/@fake-db/usersData.json'
import axios from 'axios'

const baseUrl = 'https://api.mockaroo.com/api/7e49e110?count=100&key=15462290'
export async function getAllUsers() {
  try {
    const { data } = await axios.get(baseUrl)
    //Add Downloaded Dummy Data Conditionally
    if (!data) return usersData
    return data
  } catch (error) {
    console.log('Error: ', error)
    // throw new Error(`An error occurred while fetching the user list`)
    return usersData
  }
}

export async function getArtistById(id) {
  // return axios.get(`${baseUrl}/${id}`)
}

export const getEventsPhotos = async () => {
  try {
    const { data } = await Unsplash.get('/search/photos', {
      params: {
        query: 'Music Events',
        per_page: 50,
        page: 1
      }
    })
    const eventsPhotos = data.results
    return eventsPhotos
  } catch (error) {
    console.log(error)
  }
}
export async function getOnlyArtistsList() {
  try {
    const usersData = await getAllUsers()
    const artistsList = usersData.filter(user => user.type === 'Artist')
    // console.log(artistsList)
    return artistsList
  } catch (error) {
    console.log(error)
  }
}

export default async function getArtistsData() {
  try {
    const artistsPhotos = await getRandomArtistsPhotos()
    const artistsList = await getOnlyArtistsList()
    return { artistsList, artistsPhotos }
  } catch (error) {
    console.log(error)
  }

  // Merge one phone to into every artist object
}

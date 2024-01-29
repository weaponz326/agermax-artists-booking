import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import usersData from './Music Artists Data.json'

const baseUrl = 'https://api.mockaroo.com/api/7e49e110?count=100&key=15462290'
export async function getAllArtists() {
  // const { data } = await axios.get(baseUrl)
  // return data

  //Set Up hardcoded Users Data
  return usersData
  // Hardcoded users ends here!
}

export async function getArtistById(id) {
  // return axios.get(`${baseUrl}/${id}`)
}

export const getRandomArtistsPhotos = async () => {
  try {
    const { data } = await Unsplash.get('/search/photos', {
      params: {
        query: 'Music Artists',
        per_page: 50,
        page: Math.floor(Math.random() * 20) + 1
      }
    })
    return data.results
  } catch (error) {
    console.log(error)
  }
}

export default async function getArtistsData() {
  try {
    const artistsPhotos = await getRandomArtistsPhotos()
    const artistsData = await getAllArtists()
    // const randomImage = () => artistsPhotos[Math.floor(Math.random() * 20)].urls.regular
    // const artistsData = []
    // for (let i = 0; i < artistsList.length; i++) {
    //   artistsData.push({ ...artistsList[i], artistImg: randomImage() })
    // }
    return { artistsData, artistsPhotos }
  } catch (error) {
    console.log(error)
  }

  // Merge one phone to into every artist object
}

import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import JSONData from './MOCK_DATA.json'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'
export async function getAllArtists() {
  // const { data: artists } = await axios.get(baseUrl)
  return JSONData
}

export async function getArtistById(id) {
  // return axios.get(`${baseUrl}/${id}`)
}

export const getRandomArtistsPhotos = async () => {
  const { data } = await Unsplash.get('/search/photos', {
    params: {
      query: 'Music Artists',
      per_page: 50,
      page: Math.floor(Math.random() * 20) + 1
    }
  })
  return data.results
}

export default async function getArtistsData() {
  const artistsPhotos = await getRandomArtistsPhotos()
  // const artistsList = await getAllArtists()
  const artistsList = await getAllArtists()
  const randomImage = () => artistsPhotos[Math.floor(Math.random() * 20)].urls.regular

  // Merge one phone to into every artist object
  const artistsData = []
  for (let i = 0; i < artistsList.length; i++) {
    artistsData.push({ ...artistsList[i], artistImg: randomImage() })
  }
  return { artistsPhotos, artistsData }
}

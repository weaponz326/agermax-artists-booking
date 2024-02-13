// import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import usersData from 'src/@fake-db/usersData.json'
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllArtists() {
  try {
    const { data } = await axios.get(`${baseUrl}/artists`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getArtistById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/artists/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

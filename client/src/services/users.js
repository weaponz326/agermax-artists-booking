// import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import usersData from 'src/@fake-db/usersData.json'
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${baseUrl}/users`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getUserById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/users/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function deleteUserById(id) {
  try {
    const { data } = await axios.delete(`${baseUrl}/users/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

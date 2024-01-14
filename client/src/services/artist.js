import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'
export async function getAllArtist() {
  return axios.get(baseUrl)
}

export async function getArtistById(id) {
  return axios.get(`${baseUrl}/${id}`)
}

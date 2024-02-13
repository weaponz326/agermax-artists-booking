import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllOrganizers() {
  try {
    const { data } = await axios.get(`${baseUrl}/organizers`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function getOrganizerById(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/organizers/${id}`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

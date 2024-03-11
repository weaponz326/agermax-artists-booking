// import axios from 'axios'
import Unsplash from 'src/components/mock-data-apis/Unsplash'
import usersData from 'src/@fake-db/usersData.json'
import axios from 'axios'
import { Data2 } from 'iconsax-react'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${baseUrl}/users`)
    return data
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function addUser(userData) {
  try {
    const { data } = await axios.post(`${baseUrl}/add-user`, userData)
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

export async function updateUserById(userID, userData) {
  try {
    const response = await axios.put(`${baseUrl}/users/${userID}`, userData)
    return response // Return the whole response data
  } catch (error) {
    console.log('Error: ', error.response || error.message)
    throw error
  }
}

export async function uploadUserProfilePhoto(user) {
  try {
    const response = await axios.put(`${baseUrl}/users/${user._id}`, user.profilePhoto)
    return response // Return the whole response data
  } catch (error) {
    console.log('Error: ', error.response || error.message)
    throw error
  }
}

// Getting the total number of users by user role
export async function getTotalArtists() {
  try {
    const { data } = await axios.get(`${baseUrl}/total-artists`)
    return data // Return the whole response data
  } catch (error) {
    console.log('Error: ', error.response || error.message)
    throw error
  }
}

export async function getTotalOrganizers() {
  try {
    const { data } = await axios.get(`${baseUrl}/total-organizers`)
    return data // Return the whole response data
  } catch (error) {
    console.log('Error: ', error.response || error.message)
    throw error
  }
}

//Recent Users
export async function getRecentUsers() {
  try {
    const { data } = await axios.get(`${baseUrl}/recent-users`)
    return data // Return the whole response data
  } catch (error) {
    console.log('Error: ', error.response || error.message)
    throw error
  }
}

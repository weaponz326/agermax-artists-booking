import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID 5ODVBltY2BXyawaJ_6b-dM8JdZw9LHR2hy9k8ZRjkK4'
  }
})

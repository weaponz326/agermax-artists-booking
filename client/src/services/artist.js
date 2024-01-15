import axios from 'axios'
import Unsplash from 'src/components/mock-apis/Unsplash'
import { useState, useEffect } from 'react'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'
export async function getAllArtists() {
  const { data: artists } = await axios.get(baseUrl)
  // console.log(artists)
  return artists
}

export async function getArtistById(id) {
  return axios.get(`${baseUrl}/${id}`)
}

export const getRandomArtistsPhotos = async () => {
  const { data } = await Unsplash.get('/search/photos', {
    params: {
      query: 'Music Artists',
      per_page: 12,
      page: Math.floor(Math.random() * 20) + 1
    }
  })
  // console.log(data.results)
  return data.results
}

export async function getArtistsData() {
  const artistsPhotos = await getRandomArtistsPhotos()
  const artistsList = await getAllArtists()

  // Merge one phone to into every artist object
  const artistsData = []
  {
    for (let i = 0; i < artistsList.length; i++) {
      artistsData.push({ ...artistsList[i], artistImg: artistsPhotos[i].urls.regular })
    }
  }
  return { artistsPhotos, artistsData }
}

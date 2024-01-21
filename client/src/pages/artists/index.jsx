import React, { useEffect, useState } from 'react'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './artists.module.css'
import getArtistsData from 'src/services/artist'
import HeaderCarouselContainer from 'src/components/HeaderCarouselContainer/HeaderCarouselContainer'
import Button from 'src/components/Button/Button'
const ArtistsPage = () => {
  const [artistsPerPage, setArtistsPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentArtistsData, setCurrentArtistsData] = useState([])

  const [artistsDataList, setArtistDataList] = useState([])
  useEffect(() => {
    const lastIndexOfList = currentPage * artistsPerPage
    const firstIndexOfList = lastIndexOfList - artistsPerPage

    const fetchArtistsLists = async () => {
      const { artistsData } = await getArtistsData()
      setArtistDataList(artistsData)
      setCurrentArtistsData(artistsData.slice(firstIndexOfList, lastIndexOfList))
      // console.log(artistsData)
    }
    fetchArtistsLists()
  }, [currentPage])

  return (
    <CustomPagesLayout>
      <main className={styles['main']}>
        <HeaderCarouselContainer
          className={styles['artists-page']}
          layout={styles['artists-page-layout']}
          currentArtistsData={currentArtistsData}
        />
        <Pagination
          artistsPerPage={artistsPerPage}
          artistsDataList={artistsDataList}
          currentArtistsData={currentArtistsData}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </CustomPagesLayout>
  )
}

//Pagination
export const Pagination = ({ artistsPerPage, artistsDataList, currentArtistsData, setCurrentPage }) => {
  const totalNumPages = Math.ceil(artistsDataList.length / artistsPerPage)
  let pages = []
  for (let i = 1; i <= totalNumPages; i++) {
    pages.push(i)
  }
  console.log(pages)
  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      {pages.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          style={{ padding: '0.25rem 0.5rem', margin: '0.5rem' }}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default ArtistsPage

ArtistsPage.authGuard = false
ArtistsPage.guestGuard = false
ArtistsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

ArtistsPage.getLayout = page => <div>{page}</div>

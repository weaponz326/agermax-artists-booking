import Carousel from 'src/components/Carousel/Carousel'
import styles from './artists.module.css'
import CustomPagination from 'src/components/CustomPagination/CustomPagination'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import React, { Fragment, useEffect, useState } from 'react'
import { useArtists } from 'src/providers/ArtistsProvider'

const ArtistsPage = () => {
  const [artistsPerPage, setArtistsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentArtistsData, setCurrentArtistsData] = useState([])
  const { artists, setArtists } = useArtists()

  useEffect(() => {
    const lastIndexOfList = currentPage * artistsPerPage
    const firstIndexOfList = lastIndexOfList - artistsPerPage
    if (artists) setCurrentArtistsData(artists.slice(firstIndexOfList, lastIndexOfList))
  }, [currentPage, artists])

  return (
    <CustomPagesLayout>
      <main className={styles['main']}>
        <div className={styles['artists-page-layout']}>
          {!artists
            ? Array.from({ length: artistsPerPage }).map((artist, index) => (
                <Fragment key={index}>
                  <Carousel />
                </Fragment>
              ))
            : currentArtistsData.map((artist, index) => (
                <Fragment key={index}>
                  <Carousel artist={artist} />
                </Fragment>
              ))}
        </div>
        <CustomPagination
          artistsPerPage={artistsPerPage}
          currentArtistsData={currentArtistsData}
          setCurrentArtistsData={setCurrentArtistsData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          artists={artists}
        />
      </main>
    </CustomPagesLayout>
  )
}

//Pagination
export const Pagination = ({ artistsPerPage, artistsDataList, currentPage, setCurrentPage }) => {
  const totalNumPages = Math.ceil(artistsDataList.length / artistsPerPage)
  let pages = []
  for (let i = 1; i <= totalNumPages; i++) {
    pages.push(i)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      {pages.map((page, index) => (
        <button
          className={page === currentPage ? `${styles['active-page']}` : `${styles['inactive-page']}`}
          onClick={() => setCurrentPage(page)}
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

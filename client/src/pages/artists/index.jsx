import React, { useEffect, useState } from 'react'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './artists.module.css'
import getArtistsData from 'src/services/artist'
import HeaderCarouselContainer from 'src/components/HeaderCarouselContainer/HeaderCarouselContainer'

const ArtistsPage = () => {
  const [artistsDataList, setArtistDataList] = useState([])
  useEffect(() => {
    const fetchArtistsLists = async () => {
      const { artistsData } = await getArtistsData()
      setArtistDataList(artistsData)
      console.log(artistsData)
    }
    fetchArtistsLists()
  }, [])
  return (
    <CustomPagesLayout>
      <main className={styles['main']}>
        <HeaderCarouselContainer
          className={styles['artists-page']}
          layout={styles['artists-page-layout']}
          artistsList={artistsDataList}
        />
      </main>
    </CustomPagesLayout>
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

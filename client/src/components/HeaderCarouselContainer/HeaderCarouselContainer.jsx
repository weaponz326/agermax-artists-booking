import { getAllUsers, getArtistById } from '../../services/FetchData'
import Carousel from '../Carousel/Carousel'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './header-carousel-container.module.css'
import { Avatar, Card, Skeleton, Switch } from 'antd'
const { Meta } = Card

const HeaderCarouselContainer = ({ artistsList, currentArtistsData, className, layout }) => {
  //Conditional Rendering depending on availability of APi call
  const renderedList = artistsList ? artistsList : currentArtistsData
  if (!renderedList || renderedList.length <= 0) {
    return (
      <div className={className}>
        <div className={styles['hot-artists-nav']}>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className={styles['see-all-artists']}>
            <p>See all</p>
          </Link>
        </div>
        <div className={layout}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Fragment key={index}>
              <Card
                style={{ backgroundColor: 'grey', minHeight: '290px' }}
                className={styles['carousel-container']}
                loading={true}
              >
                <Meta
                  avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />}
                  title='Card title'
                  description='This is the description'
                />
              </Card>
            </Fragment>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className={className}>
        <div className={styles['hot-artists-nav']}>
          <p>Hot Artists 🔥</p>
          <Link href={'/artists'} className={styles['see-all-artists']}>
            <p>See all</p>
          </Link>
        </div>
        <div className={layout}>
          {renderedList.map(artist => (
            <Fragment key={artist.id}>
              <Carousel artist={artist} />
            </Fragment>
          ))}
        </div>
      </div>
    )
  }
}

export default HeaderCarouselContainer

import { useState } from 'react'
import { Clock, ExportSquare, Location, PlayCircle } from 'iconsax-react'
import CustomPagesLayout from 'src/layouts/CustomPagesLayout'
import styles from './artist-profile.module.css'

function ArtistProfile() {
  return (
    <CustomPagesLayout>
      <main>
        <div className={styles['page-layout']}>
          <ArtisteProfileSection />
          <EventsSection />
        </div>
      </main>
    </CustomPagesLayout>
  )
}

export default ArtistProfile

const EventsSection = () => {
  const tabConfig = {
    'Upcoming Events': <EventsTable />,
    'Past Events': <EventsTable />
  }

  return (
    <section className={styles['events-section']}>
      <Card className={styles['events-card']}>
        <TabView config={tabConfig} />
      </Card>
      <div className={styles['divider']}></div>
      <div className={styles['videos-block']}>
        <div className={styles['video-item']}>
          <PlayCircle size={80} className={styles['play-icon']} color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
        <div className={styles['video-item']}>
          <PlayCircle size={80} className={styles['play-icon']} color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
        <div className={styles['video-item']}>
          <PlayCircle size={80} className={styles['play-icon']} color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
      </div>
    </section>
  )
}

const TabView = ({ config }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className={styles['tab-container']}>
      <div className={styles['tab-menu']}>
        <div className={styles['tab-menu-wrapper']}>
          {Object.keys(config).map((item, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={`tab-item-${index}`}
              data-active={currentIndex === index}
              className={styles['tab-item']}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['tab-content-wrapper']}>{Object.values(config)[currentIndex]}</div>
    </div>
  )
}

const ArtisteProfileSection = () => {
  return (
    <section>
      <Card className={styles['profile-card']}>
        <div className={styles['avatar-container']}>
          <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='profile-image' />
        </div>
        <h5 id={styles['username']}>John Doe</h5>
        <div className={styles['tags-container']}>
          <Tag>Rock</Tag>
          <Tag>Trubadur</Tag>
        </div>
        <div className={styles['button-container']}>
          <Button>Book now</Button>
        </div>
        <div className={styles['bio-container']}>
          <p className={styles['title']}>Biography</p>
          <p className={styles['body']}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque obcaecati, minima nisi consectetur ipsa
            voluptate amet cumque nihil ab ipsum modi illum.
          </p>
        </div>
      </Card>
    </section>
  )
}

const EventsTable = ({}) => {
  return (
    <div className={styles['events-table']}>
      {[1, 2, 3].map((num, index) => (
        <div key={`event-tile-${index}`} className={styles['event-tile']}>
          <div className={styles['date']}>
            <p>Dec</p>
            <h5>18</h5>
          </div>
          <div className={styles['event-name']}>
            <div className={styles['name']}>
              <h5>John Doe</h5>
              <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='' />
            </div>
            <p className={styles['location-name']}>Stockholm Music Stadium</p>
          </div>
          <div className={styles['event-location']}>
            <a href='#'>
              Open Map <ExportSquare size={13} />
            </a>
            <p>
              Street address 18 <Location size={12} />
            </p>
            <p>
              20:00 - 01:00 <Clock size={12} />
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>
}

const Button = ({ children }) => <button className={styles['button']}>{children}</button>

const Tag = ({ children }) => {
  return (
    <div className={styles['tag']}>
      <span>{children}</span>
    </div>
  )
}

ArtistProfile.authGuard = false
ArtistProfile.guestGuard = false
ArtistProfile.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}
ArtistProfile.getLayout = page => <div>{page}</div>

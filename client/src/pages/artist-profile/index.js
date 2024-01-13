import { useState } from 'react'
// import 'styles/artist-profile.css'
import { Clock, ExportSquare, Location, PlayCircle } from 'iconsax-react'
// import 'styles/index.css'
function App() {
  return (
    <main>
      <div className='page-layout'>
        <ArtisteProfileSection />
        <EventsSection />
      </div>
    </main>
  )
}

export default App

const EventsSection = () => {
  const tabConfig = {
    'Upcoming Events': <EventsTable />,
    'Past Events': <EventsTable />
  }

  return (
    <section className='events-section'>
      <Card className='events-card'>
        <TabView config={tabConfig} />
      </Card>
      <div className='divider'></div>
      <div className='videos-block'>
        <div className='video-item'>
          <PlayCircle size={80} className='play-icon' color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
        <div className='video-item'>
          <PlayCircle size={80} className='play-icon' color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
        <div className='video-item'>
          <PlayCircle size={80} className='play-icon' color='white' />
          <img src='https://source.unsplash.com/3tYZjGSBwbk' height={350} width={'100%'} alt='profile-image' />
        </div>
      </div>
    </section>
  )
}

const TabView = ({ config }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className='tab-container'>
      <div className='tab-menu'>
        <div className='tab-menu-wrapper'>
          {Object.keys(config).map((item, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={`tab-item-${index}`}
              data-active={currentIndex === index}
              className='tab-item'
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className='tab-content-wrapper'>{Object.values(config)[currentIndex]}</div>
    </div>
  )
}

const ArtisteProfileSection = () => {
  return (
    <section>
      <Card className='profile-card'>
        <div className='avatar-container'>
          <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='profile-image' />
        </div>
        <h5 id='username'>John Doe</h5>
        <div className='tags-container'>
          <Tag>Rock</Tag>
          <Tag>Trubadur</Tag>
        </div>
        <div className='button-container'>
          <Button>Book now</Button>
        </div>
        <div className='bio-container'>
          <p className='title'>Biography</p>
          <p className='body'>
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
    <div className='events-table'>
      {[1, 2, 3].map((num, index) => (
        <div key={`event-tile-${index}`} className='event-tile'>
          <div className='date'>
            <p>Dec</p>
            <h5>18</h5>
          </div>
          <div className='event-name'>
            <div className='name'>
              <h5>John Doe</h5>
              <img src='https://source.unsplash.com/3tYZjGSBwbk' alt='' />
            </div>
            <p className='location-name'>Stockholm Music Stadium</p>
          </div>
          <div className='event-location'>
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

const Button = ({ children }) => <button className='button'>{children}</button>

const Tag = ({ children }) => {
  return (
    <div className='tag'>
      <span>{children}</span>
    </div>
  )
}

// function Iframe(props) {
//   return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />
// }

import Footer from 'src/components/Footer/Footer'
import Navbar from 'src/components/Navbar/Navbar'
import AirbnbCloneNavBar from 'src/components/AirbnbCloneNavBar/AirbnbCloneNavBar'

const CustomPagesLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100%', maxWidth: '1600px', marginInline: 'auto' }}>
      <AirbnbCloneNavBar />
      <main style={{ minHeight: '100' }} className='page-layout-layout'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default CustomPagesLayout

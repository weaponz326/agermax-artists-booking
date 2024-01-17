import Footer from 'src/components/Footer/Footer'
import Navbar from 'src/components/Navbar/Navbar'
const CustomPagesLayout = ({ children }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      <main style={{ minHeight: '100%' }} className='page-layout-layout'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default CustomPagesLayout

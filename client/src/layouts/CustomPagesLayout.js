import Footer from 'src/components/Footer'
import Navbar from 'src/components/Navbar'
const CustomPagesLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='page-layout-layout'>{children}</main>
      <Footer />
    </div>
  )
}

export default CustomPagesLayout
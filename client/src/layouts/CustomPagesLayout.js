import Footer from 'src/components/Footer/Footer'
import Navbar from 'src/components/Navbar/Navbar'
import { AuthProvider } from 'src/providers/AuthProvider'

const CustomPagesLayout = ({ children }) => {
  return (
    <AuthProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          // maxWidth: '1440px',
          marginInline: 'auto'
        }}
      >
        <Navbar />
        <main style={{ flex: '1', paddingTop: '5rem', background: '#EDF1F4' }} className='page-layout-layout'>
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default CustomPagesLayout

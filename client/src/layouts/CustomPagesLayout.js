import Footer from 'src/components/Footer/Footer'
import Navbar from 'src/components/Navbar/Navbar'
import AirbnbCloneNavBar from 'src/components/AirbnbCloneNavBar/AirbnbCloneNavBar'
import HeaderContextProvider from 'src/providers/headerProvider'
import DropdownContextProvider from 'src/providers/dropdownProvider'
import { DropdownBubble } from 'src/components/Dropdown/DropDown'
import { AuthProvider } from 'src/providers/AuthProvider'

const CustomPagesLayout = ({ children }) => {
  return (
    <AuthProvider>
      <DropdownContextProvider>
        <div style={{ minHeight: '100%', maxWidth: '1600px', marginInline: 'auto', paddingTop: '4rem' }}>
          <HeaderContextProvider>
            {/* <AirbnbCloneNavBar /> */}
            <Navbar />
          </HeaderContextProvider>
          <main style={{ minHeight: '100' }} className='page-layout-layout'>
            {children}
          </main>
          <Footer />
        </div>
        <DropdownBubble />
      </DropdownContextProvider>
    </AuthProvider>
  )
}

export default CustomPagesLayout

import Footer from 'src/components/Footer/Footer'
import Navbar from 'src/components/Navbar/Navbar'
import AirbnbCloneNavBar from 'src/components/AirbnbCloneNavBar/AirbnbCloneNavBar'
import HeaderContextProvider from 'src/providers/headerProvider'
import DropdownContextProvider from 'src/providers/dropdownProvider'
import { DropdownBubble } from 'src/components/Dropdown/DropDown'

const CustomPagesLayout = ({ children }) => {
  return (
    <DropdownContextProvider>
      <div style={{ minHeight: '100%', maxWidth: '1600px', marginInline: 'auto', paddingTop: '4rem' }}>
        <HeaderContextProvider>
          <AirbnbCloneNavBar />
        </HeaderContextProvider>
        <main style={{ minHeight: '100' }} className='page-layout-layout'>
          {children}
        </main>
        <Footer />
      </div>
      <DropdownBubble />
    </DropdownContextProvider>
  )
}

export default CustomPagesLayout

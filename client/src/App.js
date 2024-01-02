import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Auth from './pages/auth/Auth';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Main from './pages/main/Main';
import Home from './pages/main/Home';
import About from './pages/main/About';
import ArtistAll from './pages/main/ArtistAll';
import ArtistDetail from './pages/main/ArtistDetail';
import EventsAll from './pages/main/EventsAll';
import Navbar from './layouts/Navbar';
import Header from './layouts/Header';
import Cards from './layouts/Cards';
import AdminDashboard from './pages/admin/admin/AdminDashboard'
import AdminUsers from './pages/admin/admin/AdminUsers'
import AdminCalendar from './pages/admin/admin/AdminCalendar'
import AdminBookingsAll from './pages/admin/admin/AdminBookingsAll'
import AdminFinanceInvoice from './pages/admin/admin/AdminFinanceInvoice'
import AdminFinancePayments from './pages/admin/admin/AdminFinancePayments'
import AdminChatInbox from './pages/admin/admin/AdminChatInbox'
import AdminNotifications from './pages/admin/admin/AdminNotifications'
import AdminAccountProfile from './pages/admin/admin/AdminAccountProfile'
import AdminAccountSettings from './pages/admin/admin/AdminAccountSettings'
import ArtistDashboard from './pages/admin/artist/ArtistDashboard'
import ArtistCalendar from './pages/admin/artist/ArtistCalendar'
import ArtistBookingsAll from './pages/admin/artist/ArtistBookingsAll'
import ArtistFinanceInvoice from './pages/admin/artist/ArtistFinanceInvoice'
import ArtistFinancePayments from './pages/admin/artist/ArtistFinancePayments'
import ArtistChatInbox from './pages/admin/artist/ArtistChatInbox'
import ArtistNotifications from './pages/admin/artist/ArtistNotifications'
import ArtistAccountProfile from './pages/admin/artist/ArtistAccountProfile'
import ArtistAccountSettings from './pages/admin/artist/ArtistAccountSettings'
import OrganizerDashboard from './pages/admin/organizer/OrganizerDashboard'
import OrganizerCalendar from './pages/admin/organizer/OrganizerCalendar'
import OrganizerBookingsAll from './pages/admin/organizer/OrganizerBookingsAll'
import OrganizerFinanceInvoice from './pages/admin/organizer/OrganizerFinanceInvoice'
import OrganizerFinancePayments from './pages/admin/organizer/OrganizerFinancePayments'
import OrganizerChatInbox from './pages/admin/organizer/OrganizerChatInbox'
import OrganizerNotifications from './pages/admin/organizer/OrganizerNotifications'
import OrganizerAccountProfile from './pages/admin/organizer/OrganizerAccountProfile'
import OrganizerAccountSettings from './pages/admin/organizer/OrganizerAccountSettings'


function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Cards />
      <Router>
        <Routes>
          <Route path='auth' element={<Auth />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='main' element={<Main />}>
            <Route path='home' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='all-artists' element={<ArtistAll />} />
            <Route path='artist-detail' element={<ArtistDetail />} />
            <Route path='all-events' element={<EventsAll />} />
          </Route>
          <Route path='admin' >
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='calendar' element={<AdminCalendar />} />
            <Route path='all-bookings' element={<AdminBookingsAll />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='finance-invoice' element={<AdminFinanceInvoice />} />
            <Route path='finance-payments' element={<AdminFinancePayments />} />            
            <Route path='chat-inbox' element={<AdminChatInbox />} />            
            <Route path='notifications' element={<AdminNotifications />} />            
            <Route path='account-profile' element={<AdminAccountProfile />} />            
            <Route path='account-settings' element={<AdminAccountSettings />} />            
          </Route>
          <Route path='artist' >
            <Route path='dashboard' element={<ArtistDashboard />} />
            <Route path='calendar' element={<ArtistCalendar />} />
            <Route path='all-bookings' element={<ArtistBookingsAll />} />
            <Route path='finance-invoice' element={<ArtistFinanceInvoice />} />
            <Route path='finance-payments' element={<ArtistFinancePayments />} />            
            <Route path='chat-inbox' element={<ArtistChatInbox />} />            
            <Route path='notifications' element={<ArtistNotifications />} />            
            <Route path='account-profile' element={<ArtistAccountProfile />} />            
            <Route path='account-settings' element={<ArtistAccountSettings />} />
          </Route>
          <Route path='organizer' >
            <Route path='dashboard' element={<OrganizerDashboard />} />
            <Route path='calendar' element={<OrganizerCalendar />} />
            <Route path='all-bookings' element={<OrganizerBookingsAll />} />
            <Route path='finance-invoice' element={<OrganizerFinanceInvoice />} />
            <Route path='finance-payments' element={<OrganizerFinancePayments />} />            
            <Route path='chat-inbox' element={<OrganizerChatInbox />} />            
            <Route path='notifications' element={<OrganizerNotifications />} />            
            <Route path='account-profile' element={<OrganizerAccountProfile />} />            
            <Route path='account-settings' element={<OrganizerAccountSettings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

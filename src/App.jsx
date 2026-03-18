import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VisitPage from './pages/VisitPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ArtistsPage from './pages/ArtistsPage'
import CollectionsPage from './pages/CollectionsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProfilePage from './pages/ProfilePage'
import TicketBookingPage from './pages/TicketBookingPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/visit" element={
            <>
              <Navbar />
              <VisitPage />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <AboutPage />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <ContactPage />
              <Footer />
            </>
          } />
          <Route path="/blogs" element={
            <>
              <Navbar />
              <BlogsPage />
              <Footer />
            </>
          } />
          <Route path="/blogs/:id" element={
            <>
              <Navbar />
              <BlogDetailPage />
              <Footer />
            </>
          } />
          <Route path="/artists" element={
            <>
              <Navbar />
              <ArtistsPage />
              <Footer />
            </>
          } />
          <Route path="/collections" element={
            <>
              <Navbar />
              <CollectionsPage />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Navbar />
              <CartPage />
              <Footer />
            </>
          } />
          <Route path="/checkout" element={
            <>
              <Navbar />
              <CheckoutPage />
              <Footer />
            </>
          } />
          <Route path="/order-success" element={
            <>
              <Navbar />
              <OrderSuccessPage />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Navbar />
              <ProfilePage />
              <Footer />
            </>
          } />
          <Route path="/book-ticket" element={
            <>
              <Navbar />
              <TicketBookingPage />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

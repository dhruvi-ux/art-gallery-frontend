import { Clock, MapPin, Phone, Mail, Calendar, Ticket, Car, Train, Bus, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const VisitPage = () => {
  const navigate = useNavigate()
  const openingHours = [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday - Friday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 5:00 PM' }
  ]

  const ticketPrices = [
    { type: 'General Admission', price: '200', description: 'Access to all exhibitions' },
    { type: 'Students & Seniors', price: '100', description: 'Valid ID required' },
    { type: 'Children (Under 12)', price: 'Free', description: 'Must be accompanied by adult' },
    { type: 'Family Pass', price: '600', description: 'Up to 2 adults + 3 children' }
  ]

  const transportation = [
    {
      icon: Train,
      title: 'Subway',
      description: 'Take Line 1 to Gallery Station, 5 min walk'
    },
    {
      icon: Bus,
      title: 'Bus',
      description: 'Routes 12, 45, 67 stop directly outside'
    },
    {
      icon: Car,
      title: 'Parking',
      description: 'Underground parking available, $8/day'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1600&q=80"
            alt="Gallery Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/10"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Plan Your Visit</h1>
          <p className="text-xl md:text-2xl text-neutral-200">We can't wait to welcome you</p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Opening Hours</h3>
            <p className="text-neutral-600">Tue-Fri: 10AM-6PM</p>
            <p className="text-neutral-600">Sat: 10AM-8PM</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Location</h3>
            <p className="text-neutral-600">123 Art Street</p>
            <p className="text-neutral-600">Gallery District, NY 10001</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Ticket className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Admission</h3>
            <p className="text-neutral-600">From $10</p>
            <p className="text-neutral-600">Free for children under 12</p>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Opening Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900">Opening Hours</h2>
            </div>
            
            <div className="space-y-4">
              {openingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-neutral-200 last:border-0">
                  <span className="font-medium text-neutral-900">{schedule.day}</span>
                  <span className={`${schedule.hours === 'Closed' ? 'text-red-600' : 'text-neutral-600'}`}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-900 flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Last entry is 30 minutes before closing. Special hours during holidays.</span>
              </p>
            </div>
          </div>

          {/* Ticket Prices */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900">Admission</h2>
            </div>
            
            <div className="space-y-4">
              {ticketPrices.map((ticket, index) => (
                <div key={index} className="p-4 border border-neutral-200 rounded-xl hover:border-amber-600 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-neutral-900">{ticket.type}</h3>
                    <span className="text-2xl font-bold text-amber-600">{ticket.price}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{ticket.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/book-ticket')}
              className="w-full mt-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Buy Tickets Online
            </button>
          </div>
        </div>
      </section>

      {/* Map & Transportation */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Getting Here</h2>
            <p className="text-neutral-600 text-lg">Easy access by public transport or car</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGrand%20Central%20Terminal!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Transportation Options */}
            <div className="space-y-6">
              {transportation.map((option, index) => {
                const Icon = option.icon
                return (
                  <div key={index} className="flex gap-4 p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{option.title}</h3>
                      <p className="text-neutral-600">{option.description}</p>
                    </div>
                  </div>
                )
              })}

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-amber-50 rounded-xl">
                <h3 className="font-bold text-neutral-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-700">
                    <Phone className="w-5 h-5 text-amber-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-700">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <span>visit@artgallery.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Guidelines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Visitor Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-3">Please Do:</h3>
              <ul className="space-y-2 text-amber-50">
                <li>✓ Take photos (without flash)</li>
                <li>✓ Ask our staff questions</li>
                <li>✓ Use the coat check service</li>
                <li>✓ Enjoy our café and gift shop</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-3">Please Don't:</h3>
              <ul className="space-y-2 text-amber-50">
                <li>✗ Touch the artworks</li>
                <li>✗ Bring food or drinks into galleries</li>
                <li>✗ Use flash photography</li>
                <li>✗ Bring large bags (lockers available)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VisitPage

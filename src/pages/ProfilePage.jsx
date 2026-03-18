import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Calendar, Package, MapPin, CreditCard, LogOut, Edit, Eye, ShoppingBag, MessageSquare, CheckCircle, Clock, Ticket } from 'lucide-react'
import axios from 'axios'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [contacts, setContacts] = useState([])
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserData()
    fetchUserOrders()
    fetchUserContacts()
    fetchUserTickets()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      // Fetch user profile using the new endpoint
      const response = await axios.get('http://localhost:8000/api/users/me/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user data:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserContacts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/api/contacts/my-contacts', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setContacts(response.data.contacts)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const fetchUserTickets = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/api/tickets/my-tickets', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setTickets(response.data.tickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('cartUpdated'))
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-purple-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <User className="w-14 h-14 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-purple-900 mb-4 animate-fade-in-up animation-delay-200">
            {user.name}
          </h1>
          
          <p className="text-xl text-purple-700 animate-fade-in-up animation-delay-400">
            Welcome to your profile
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            <User className="w-5 h-5 inline mr-2" />
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Package className="w-5 h-5 inline mr-2" />
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Ticket className="w-5 h-5 inline mr-2" />
            My Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline mr-2" />
            My Contacts ({contacts.length})
          </button>
        </div>

        {/* Profile Info Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-purple-900">Personal Information</h2>
                  <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-purple-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-600 mb-1">Full Name</p>
                      <p className="text-lg font-semibold text-purple-900">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-600 mb-1">Email Address</p>
                      <p className="text-lg font-semibold text-blue-900">{user.email}</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-green-600 mb-1">Phone Number</p>
                        <p className="text-lg font-semibold text-green-900">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-amber-600 mb-1">Member Since</p>
                      <p className="text-lg font-semibold text-amber-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-200">
                <h3 className="text-xl font-bold text-purple-900 mb-6">Quick Stats</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="text-sm text-purple-600">Total Orders</p>
                          <p className="text-2xl font-bold text-purple-900">{orders.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-sm text-green-600">Total Spent</p>
                          <p className="text-2xl font-bold text-green-900">
                            ₹{orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Ticket className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-600">Tickets Booked</p>
                          <p className="text-2xl font-bold text-blue-900">{tickets.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-400">
                <h3 className="text-xl font-bold text-purple-900 mb-6">Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/collections')}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Browse Collections
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                  >
                    View Orders
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in-up">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">No Orders Yet</h3>
                <p className="text-purple-600 mb-8">Start shopping to see your orders here</p>
                <button
                  onClick={() => navigate('/collections')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  Browse Collections
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Order Number</p>
                          <p className="text-xl font-bold text-purple-900">{order.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Order Date</p>
                          <p className="font-semibold text-purple-900">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Total Amount</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{order.total?.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-purple-900">
                          {order.items?.length || 0} Item(s)
                        </h4>
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold"
                        >
                          <Eye className="w-5 h-5" />
                          {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>

                      {/* Order Items Preview */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {order.items?.slice(0, 4).map((item, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-purple-100">
                            <img
                              src={item.artworkDetails?.image}
                              alt={item.artworkDetails?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Expanded Details */}
                      {selectedOrder?._id === order._id && (
                        <div className="mt-6 pt-6 border-t-2 border-purple-100 space-y-4 animate-fade-in-up">
                          {/* Items Details */}
                          <div>
                            <h5 className="font-bold text-purple-900 mb-3">Order Items</h5>
                            <div className="space-y-3">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-purple-50 rounded-2xl">
                                  <img
                                    src={item.artworkDetails?.image}
                                    alt={item.artworkDetails?.name}
                                    className="w-20 h-20 object-cover rounded-xl"
                                  />
                                  <div className="flex-1">
                                    <p className="font-bold text-purple-900">{item.artworkDetails?.name}</p>
                                    <p className="text-sm text-purple-600">by {item.artworkDetails?.artistName}</p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-sm text-purple-700">Qty: {item.quantity}</span>
                                      <span className="font-bold text-purple-900">
                                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Address */}
                          {order.shippingAddress && (
                            <div className="p-4 bg-blue-50 rounded-2xl">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <h5 className="font-bold text-blue-900">Shipping Address</h5>
                              </div>
                              <p className="text-blue-800">
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                              </p>
                              <p className="text-blue-800">
                                {order.shippingAddress.state} - {order.shippingAddress.pincode}
                              </p>
                            </div>
                          )}

                          {/* Payment Info */}
                          <div className="p-4 bg-green-50 rounded-2xl">
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="w-5 h-5 text-green-600" />
                              <h5 className="font-bold text-green-900">Payment Information</h5>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-green-800 capitalize">Method: {order.paymentMethod}</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.paymentStatus === 'paid' ? 'bg-green-200 text-green-900' :
                                'bg-yellow-200 text-yellow-900'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="animate-fade-in-up">
            {tickets.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ticket className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">No Tickets Booked</h3>
                <p className="text-purple-600 mb-8">Book your gallery visit tickets to see them here</p>
                <button
                  onClick={() => navigate('/book-ticket')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  Book Tickets
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {tickets.map((ticket, index) => (
                  <div
                    key={ticket._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Booking ID</p>
                          <p className="text-xl font-bold text-blue-900">{ticket.bookingId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Visit Date</p>
                          <p className="font-semibold text-blue-900">
                            {new Date(ticket.visitDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600 mb-1">Total Amount</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            ₹{ticket.totalAmount?.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            ticket.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                            ticket.bookingStatus === 'used' ? 'bg-gray-100 text-gray-800' :
                            ticket.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ticket.bookingStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 bg-purple-50 rounded-2xl">
                          <p className="text-sm text-purple-600 mb-1">Ticket Type</p>
                          <p className="font-bold text-purple-900 capitalize">{ticket.ticketType}</p>
                        </div>
                        <div className="p-4 bg-pink-50 rounded-2xl">
                          <p className="text-sm text-pink-600 mb-1">Quantity</p>
                          <p className="font-bold text-pink-900">{ticket.quantity} Ticket(s)</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-2xl">
                          <p className="text-sm text-blue-600 mb-1">Price Per Ticket</p>
                          <p className="font-bold text-blue-900">₹{ticket.pricePerTicket?.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedTicket(selectedTicket?._id === ticket._id ? null : ticket)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        <Eye className="w-5 h-5" />
                        {selectedTicket?._id === ticket._id ? 'Hide Details' : 'View Details'}
                      </button>

                      {/* Expanded Details */}
                      {selectedTicket?._id === ticket._id && (
                        <div className="mt-6 pt-6 border-t-2 border-blue-100 space-y-4 animate-fade-in-up">
                          {/* Visitor Information */}
                          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                            <div className="flex items-center gap-2 mb-3">
                              <User className="w-5 h-5 text-purple-600" />
                              <h5 className="font-bold text-purple-900">Visitor Information</h5>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-sm text-purple-600">Name</p>
                                <p className="font-semibold text-purple-900">{ticket.visitorName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-600">Email</p>
                                <p className="font-semibold text-purple-900">{ticket.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-600">Phone</p>
                                <p className="font-semibold text-purple-900">{ticket.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-purple-600">Booked On</p>
                                <p className="font-semibold text-purple-900">
                                  {new Date(ticket.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Payment Information */}
                          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                            <div className="flex items-center gap-2 mb-3">
                              <CreditCard className="w-5 h-5 text-green-600" />
                              <h5 className="font-bold text-green-900">Payment Information</h5>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-sm text-green-600">Payment Method</p>
                                <p className="font-semibold text-green-900 capitalize">{ticket.paymentMethod}</p>
                              </div>
                              <div>
                                <p className="text-sm text-green-600">Total Amount</p>
                                <p className="font-semibold text-green-900">₹{ticket.totalAmount?.toLocaleString('en-IN')}</p>
                              </div>
                              {ticket.upiTransactionId && (
                                <div className="md:col-span-2">
                                  <p className="text-sm text-green-600">UPI Transaction ID</p>
                                  <p className="font-semibold text-green-900 font-mono">{ticket.upiTransactionId}</p>
                                </div>
                              )}
                              {ticket.cardDetails && (
                                <div className="md:col-span-2">
                                  <p className="text-sm text-green-600">Card Details</p>
                                  <p className="font-semibold text-green-900">
                                    {ticket.cardDetails.cardType} - {ticket.cardDetails.cardNumber}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Important Note */}
                          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                              <div>
                                <h5 className="font-bold text-amber-900 mb-2">Important Information</h5>
                                <ul className="text-sm text-amber-800 space-y-1">
                                  <li>• Please arrive 15 minutes before your visit time</li>
                                  <li>• Carry a valid ID proof for verification</li>
                                  <li>• Show this booking ID at the entrance</li>
                                  <li>• Tickets are non-refundable</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="animate-fade-in-up">
            {contacts.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">No Contact Messages</h3>
                <p className="text-purple-600 mb-8">You haven't sent any contact messages yet</p>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  Contact Us
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {contacts.map((contact, index) => (
                  <div
                    key={contact._id}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-purple-600 mb-1">Subject</p>
                          <p className="text-xl font-bold text-purple-900">{contact.subject}</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 mb-1">Submitted</p>
                          <p className="font-semibold text-purple-900">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                            contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                            contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                            contact.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {contact.status === 'replied' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            {contact.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="font-bold text-purple-900 mb-2">Your Message:</h4>
                        <p className="text-purple-700 bg-purple-50 p-4 rounded-2xl whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>

                      {contact.reply && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h4 className="font-bold text-green-900">Admin Reply:</h4>
                          </div>
                          <p className="text-green-800 whitespace-pre-wrap mb-3">
                            {contact.reply}
                          </p>
                          {contact.repliedAt && (
                            <p className="text-sm text-green-600">
                              Replied on: {new Date(contact.repliedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}

                      {!contact.reply && contact.status !== 'replied' && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <p className="text-yellow-800 font-medium">
                              {contact.status === 'read' 
                                ? 'Your message has been read. We will respond soon.' 
                                : 'Your message is pending review.'}
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedContact(selectedContact?._id === contact._id ? null : contact)}
                        className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold"
                      >
                        <Eye className="w-5 h-5" />
                        {selectedContact?._id === contact._id ? 'Hide Details' : 'View Full Details'}
                      </button>

                      {/* Expanded Details */}
                      {selectedContact?._id === contact._id && (
                        <div className="mt-6 pt-6 border-t-2 border-purple-100 space-y-4 animate-fade-in-up">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 rounded-2xl">
                              <p className="text-sm text-purple-600 mb-1">Your Name</p>
                              <p className="font-semibold text-purple-900">{contact.name}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl">
                              <p className="text-sm text-blue-600 mb-1">Your Email</p>
                              <p className="font-semibold text-blue-900">{contact.email}</p>
                            </div>
                            {contact.phone && (
                              <div className="p-4 bg-green-50 rounded-2xl">
                                <p className="text-sm text-green-600 mb-1">Phone Number</p>
                                <p className="font-semibold text-green-900">{contact.phone}</p>
                              </div>
                            )}
                            <div className="p-4 bg-amber-50 rounded-2xl">
                              <p className="text-sm text-amber-600 mb-1">Status</p>
                              <p className="font-semibold text-amber-900 capitalize">{contact.status}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage

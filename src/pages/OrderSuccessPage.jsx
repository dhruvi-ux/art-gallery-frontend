import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, Package, MapPin, CreditCard, Mail, Phone, User, ArrowRight, Download, Home } from 'lucide-react'

const OrderSuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Get order data from navigation state
    if (location.state?.order) {
      setOrderData(location.state)
    } else {
      // If no order data, redirect to collections
      navigate('/collections')
    }
  }, [location, navigate])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-purple-600">Loading...</p>
        </div>
      </div>
    )
  }

  const order = orderData.order
  const customerInfo = orderData.customerInfo
  const items = orderData.items

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section - Success/Celebration Theme with Background */}
      <section className="relative py-36 overflow-hidden min-h-[550px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-emerald-900/80 to-teal-900/85"></div>
          </div>
          
          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-3 h-3 bg-green-400 rounded-full animate-float"></div>
            <div className="absolute top-40 right-20 w-2 h-2 bg-emerald-400 rounded-full animate-float animation-delay-200"></div>
            <div className="absolute top-60 left-1/3 w-3 h-3 bg-teal-400 rounded-full animate-float animation-delay-400"></div>
            <div className="absolute top-32 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-float animation-delay-600"></div>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="inline-block mb-6 animate-fade-in-up">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-scale-in">
                <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in-up animation-delay-200">
            Order Confirmed!
          </h1>
          
          <p className="text-2xl text-green-100 mb-8 animate-fade-in-up animation-delay-400">
            Thank you for your purchase
          </p>
          
          {/* Order Number Card */}
          <div className="inline-block animate-fade-in-up animation-delay-600">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-2 border-green-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Package className="w-6 h-6 text-green-600" />
                <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Order Number</p>
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-mono">
                {order.orderNumber}
              </p>
              <p className="text-sm text-green-600 mt-3">
                Confirmation email sent to {customerInfo.email}
              </p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-in-up animation-delay-800">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-md border-2 border-green-200"
            >
              View My Orders
            </button>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900">Your Artworks</h2>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-md">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-48 h-48 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-bold text-purple-900 mb-2">{item.name}</h3>
                        <p className="text-purple-600 font-medium mb-3">by {item.artistName}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-purple-600">Type</p>
                            <p className="font-semibold text-purple-900">{item.type}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600">Medium</p>
                            <p className="font-semibold text-purple-900">{item.medium}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600">Year</p>
                            <p className="font-semibold text-purple-900">{item.year}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600">Quantity</p>
                            <p className="font-semibold text-purple-900">{item.quantity}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-purple-200">
                          <div className="flex items-center justify-between">
                            <span className="text-purple-700">Price</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900">Customer Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm text-purple-600">Full Name</p>
                    <p className="font-semibold text-purple-900">{customerInfo.fullName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm text-purple-600">Email</p>
                    <p className="font-semibold text-purple-900">{customerInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm text-purple-600">Phone</p>
                    <p className="font-semibold text-purple-900">{customerInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm text-purple-600">Shipping Address</p>
                    <p className="font-semibold text-purple-900">
                      {customerInfo.address}, {customerInfo.city}
                    </p>
                    <p className="font-semibold text-purple-900">
                      {customerInfo.state} - {customerInfo.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-purple-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-purple-700">
                  <span>Tax (18% GST)</span>
                  <span className="font-semibold">₹{order.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="border-t-2 border-purple-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-900">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-semibold text-purple-900">Payment Method</p>
                </div>
                <p className="text-purple-700 capitalize ml-8">{order.paymentMethod}</p>
              </div>

              {/* Order Status */}
              <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">Order Status</p>
                </div>
                <p className="text-green-700 capitalize ml-8">{order.orderStatus}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>

                <button
                  onClick={() => navigate('/collections')}
                  className="w-full py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 bg-white border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </button>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-600">
              <h3 className="text-xl font-bold text-blue-900 mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Order Confirmation</p>
                    <p className="text-sm text-blue-700">You'll receive an email confirmation shortly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Processing</p>
                    <p className="text-sm text-blue-700">We'll carefully prepare your artwork</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Shipping</p>
                    <p className="text-sm text-blue-700">Track your order via email updates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Delivery</p>
                    <p className="text-sm text-blue-700">Enjoy your beautiful artwork!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderSuccessPage

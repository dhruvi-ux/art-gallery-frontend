import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket, User, Mail, Phone, Calendar, CreditCard, Building, ShoppingBag, CheckCircle, Lock, ArrowLeft } from 'lucide-react'
import axios from 'axios'

const TicketBookingPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showUpiQr, setShowUpiQr] = useState(false)
  const [upiTransactionId, setUpiTransactionId] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const ticketTypes = [
    { type: 'general', label: 'General Admission', price: 200 },
    { type: 'student', label: 'Student (with ID)', price: 100 },
    { type: 'senior', label: 'Senior Citizen (60+)', price: 150 },
    { type: 'family', label: 'Family Pack (4 people)', price: 600 },
    { type: 'group', label: 'Group (10+ people)', price: 1500 }
  ]

  const [formData, setFormData] = useState({
    ticketType: 'general',
    quantity: 1,
    visitDate: '',
    visitorName: '',
    email: '',
    phone: '',
    paymentMethod: 'card',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const getSelectedTicketPrice = () => {
    const selected = ticketTypes.find(t => t.type === formData.ticketType)
    return selected ? selected.price : 0
  }

  const calculateTotal = () => {
    return getSelectedTicketPrice() * formData.quantity
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    let formattedValue = value

    
    // Phone validation
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 10) {
        formattedValue = digitsOnly
      } else {
        return
      }
    }
    
    // Card number formatting
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    
    // Expiry date formatting
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4)
      }
    }
    
    // CVV formatting
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.visitDate) {
      newErrors.visitDate = 'Visit date is required'
    }

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = 'Visitor name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    // Card validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardHolderName.trim()) {
        newErrors.cardHolderName = 'Card holder name is required'
      }
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits'
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required'
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '')
    if (/^4/.test(number)) return 'Visa'
    if (/^5[1-5]/.test(number)) return 'Mastercard'
    if (/^3[47]/.test(number)) return 'American Express'
    return 'Unknown'
  }

  const generateUpiLink = () => {
    const merchantName = 'ARTSPHERE'
    const merchantUpiId = 'artsphere@upi'
    const amount = calculateTotal().toFixed(2)
    const transactionNote = `Ticket Booking - ${formData.quantity} tickets`
    
    return `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`
  }

  const handleUpiPayment = () => {
    setShowUpiQr(true)
    setPaymentConfirmed(false)
  }

  const confirmUpiPayment = () => {
    if (!upiTransactionId.trim()) {
      alert('Please enter UPI Transaction ID')
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setPaymentConfirmed(true)
    setTimeout(() => {
      handleSubmit(new Event('submit'))
    }, 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to book tickets')
      navigate('/login')
      return
    }

    setLoading(true)

    try {
      const ticketData = {
        ticketType: formData.ticketType,
        pricePerTicket: getSelectedTicketPrice(),
        quantity: formData.quantity,
        visitDate: formData.visitDate,
        visitorName: formData.visitorName,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        totalAmount: calculateTotal()
      }

      // Add card details if card payment
      if (formData.paymentMethod === 'card') {
        const cardNumber = formData.cardNumber.replace(/\s/g, '')
        ticketData.cardDetails = {
          cardHolderName: formData.cardHolderName,
          cardNumber: '**** **** **** ' + cardNumber.slice(-4),
          expiryDate: formData.expiryDate,
          cardType: getCardType(cardNumber)
        }
      }

      // Add UPI transaction ID if UPI payment
      if (formData.paymentMethod === 'upi' && upiTransactionId) {
        ticketData.upiTransactionId = upiTransactionId
      }

      const response = await axios.post(
        'http://localhost:8000/api/tickets',
        ticketData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data) {
        alert('Ticket booked successfully! Check your profile to view your tickets.')
        navigate('/profile')
      }
    } catch (error) {
      console.error('Error booking ticket:', error)
      if (error.response?.status === 401) {
        alert('Please login to book tickets')
        navigate('/login')
      } else {
        alert(error.response?.data?.message || 'Failed to book ticket. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 pt-20">

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              🎫 Book Your Visit
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-4">
            Gallery Tickets
          </h1>
          
          <p className="text-xl text-amber-700 mb-4">
            Reserve your spot and explore amazing artworks
          </p>
          
          <button
            onClick={() => navigate('/visit')}
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Visit Page
          </button>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticket Selection */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-amber-900">Select Tickets</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Ticket Type *
                </label>
                <select
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white"
                >
                  {ticketTypes.map(ticket => (
                    <option key={ticket.type} value={ticket.type}>
                      {ticket.label} - ₹{ticket.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white"
                />
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Visit Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-11 pr-4 py-3 border-2 ${
                      errors.visitDate ? 'border-red-400' : 'border-amber-200'
                    } rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white`}
                  />
                </div>
                {errors.visitDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.visitDate}</p>
                )}
              </div>

              {/* Total Amount Display */}
              <div className="md:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-amber-700">Total Amount</p>
                    <p className="text-xs text-amber-600 mt-1">
                      {formData.quantity} × ₹{getSelectedTicketPrice()}
                    </p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Information - Similar to CheckoutPage personal info */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-amber-900">Visitor Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Visitor Name *
                </label>
                <input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.visitorName ? 'border-red-400' : 'border-amber-200'
                  } rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white`}
                  placeholder="Enter your full name"
                />
                {errors.visitorName && (
                  <p className="mt-1 text-sm text-red-600">{errors.visitorName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 ${
                      errors.email ? 'border-red-400' : 'border-amber-200'
                    } rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength="10"
                    className={`w-full pl-11 pr-4 py-3 border-2 ${
                      errors.phone ? 'border-red-400' : 'border-amber-200'
                    } rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all bg-white`}
                    placeholder="10-digit mobile number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method - Reuse from CheckoutPage */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-amber-900">Payment Method</h2>
            </div>

            <div className="space-y-4">
              {/* Card Payment */}
              <label className="flex items-center p-4 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600"
                />
                <div className="ml-4 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900">Credit / Debit Card</p>
                    <p className="text-sm text-amber-600">Pay securely with your card</p>
                  </div>
                </div>
              </label>

              {/* Card Details Form */}
              {formData.paymentMethod === 'card' && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-purple-700 font-medium">Your card details are secure</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">Card Holder Name *</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border-2 ${
                        errors.cardHolderName ? 'border-red-400' : 'border-purple-200'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="Name as on card"
                    />
                    {errors.cardHolderName && <p className="mt-1 text-sm text-red-600">{errors.cardHolderName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border-2 ${
                        errors.cardNumber ? 'border-red-400' : 'border-purple-200'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-purple-900 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white border-2 ${
                          errors.expiryDate ? 'border-red-400' : 'border-purple-200'
                        } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-purple-900 mb-2">CVV *</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white border-2 ${
                          errors.cvv ? 'border-red-400' : 'border-purple-200'
                        } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              <label className="flex items-center p-4 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600"
                />
                <div className="ml-4 flex items-center gap-3">
                  <Building className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900">UPI Payment</p>
                    <p className="text-sm text-amber-600">Pay using UPI apps</p>
                  </div>
                </div>
              </label>

              {/* UPI QR Code */}
              {formData.paymentMethod === 'upi' && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 space-y-4">
                  {!showUpiQr ? (
                    <button
                      type="button"
                      onClick={handleUpiPayment}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
                    >
                      Generate QR Code
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-xl text-center">
                        <div className="inline-block p-4 bg-white border-4 border-blue-500 rounded-2xl shadow-lg">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateUpiLink())}`}
                            alt="UPI QR Code"
                            className="w-48 h-48"
                          />
                        </div>
                        <p className="text-sm text-blue-700 mt-4 font-medium">Scan with any UPI app</p>
                        <p className="text-xs text-blue-600 mt-2">Amount: ₹{calculateTotal().toLocaleString('en-IN')}</p>
                      </div>

                      {!paymentConfirmed ? (
                        <div className="space-y-3">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <p className="text-sm text-yellow-800 font-medium mb-3">Enter UPI Transaction ID</p>
                            <input
                              type="text"
                              value={upiTransactionId}
                              onChange={(e) => setUpiTransactionId(e.target.value)}
                              placeholder="Enter UPI Transaction ID"
                              className="w-full px-4 py-2.5 border-2 border-yellow-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 outline-none transition-all bg-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={confirmUpiPayment}
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Confirm Payment
                          </button>
                        </div>
                      ) : (
                        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                          <p className="text-green-800 font-bold">Payment Confirmed!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Cash on Delivery */}
              <label className="flex items-center p-4 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600"
                />
                <div className="ml-4 flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900">Pay at Gallery</p>
                    <p className="text-sm text-amber-600">Pay when you visit</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Book Tickets
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  )
}

export default TicketBookingPage

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Mail, Phone, MapPin, CreditCard, Building, CheckCircle, ArrowLeft, Lock, X, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    // Card details
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})
  const [isAutoFilled, setIsAutoFilled] = useState(false)
  const [showUpiQr, setShowUpiQr] = useState(false)
  const [upiTransactionId, setUpiTransactionId] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [showRazorpayModal, setShowRazorpayModal] = useState(false)
  const [razorpayProcessing, setRazorpayProcessing] = useState(false)
  const [showCvv, setShowCvv] = useState(false)

  useEffect(() => {
    loadCartItems()
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await axios.get('http://localhost:8000/api/users/me/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.user) {
        const user = response.data.user
        setFormData(prev => ({
          ...prev,
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          // Auto-fill address if available
          address: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || ''
        }))
        setIsAutoFilled(true)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Don't show error to user, just continue with empty form
    }
  }

  const clearAutoFilledData = () => {
    setFormData(prev => ({
      ...prev,
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    }))
    setIsAutoFilled(false)
  }

  const generateUpiLink = () => {
    const merchantName = 'ARTSPHERE'
    const merchantUpiId = 'artsphere@upi' // Replace with actual UPI ID
    const amount = calculateTotal().toFixed(2)
    const transactionNote = `Order Payment - ${cartItems.length} items`
    
    // UPI payment URL format
    return `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`
  }

  const handleUpiPayment = () => {
    // Don't validate form yet, just show QR code
    console.log('Generate QR Code clicked, setting showUpiQr to true')
    setShowUpiQr(true)
    setPaymentConfirmed(false)
  }

  const handleRazorpayPayment = () => {
    if (!validateForm()) {
      return
    }
    setShowRazorpayModal(true)
  }

  const processRazorpayPayment = async () => {
    setRazorpayProcessing(true)
    
    // Simulate payment processing
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate fake transaction ID
      const transactionId = 'pay_' + Math.random().toString(36).substr(2, 14).toUpperCase()
      
      // Close modal and proceed with order
      setShowRazorpayModal(false)
      setRazorpayProcessing(false)
      
      // Add transaction ID to form data and submit
      const updatedFormData = {
        ...formData,
        razorpayTransactionId: transactionId
      }
      
      // Submit order with transaction ID
      await submitOrder(updatedFormData)
    } catch (error) {
      console.error('Payment processing error:', error)
      setRazorpayProcessing(false)
      alert('Payment failed. Please try again.')
    }
  }

  const submitOrder = async (orderFormData) => {
    setLoading(true)

    try {
      // Get token
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to place order')
        navigate('/login')
        return
      }

      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          artwork: item._id,
          artworkDetails: {
            name: item.name,
            artistName: item.artistName,
            image: item.image,
            artworkType: item.type,
            medium: item.medium,
            year: item.year,
            dimensions: item.dimensions || {}
          },
          quantity: item.quantity,
          price: item.price
        })),
        customerInfo: {
          fullName: orderFormData.fullName,
          email: orderFormData.email,
          phone: orderFormData.phone
        },
        shippingAddress: {
          address: orderFormData.address,
          city: orderFormData.city,
          state: orderFormData.state,
          pincode: orderFormData.pincode
        },
        paymentMethod: orderFormData.paymentMethod,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal()
      }

      // Add card details if payment method is card
      if (orderFormData.paymentMethod === 'card') {
        const cardNumber = orderFormData.cardNumber.replace(/\s/g, '')
        orderData.cardDetails = {
          cardHolderName: orderFormData.cardHolderName,
          cardNumber: '**** **** **** ' + cardNumber.slice(-4),
          expiryDate: orderFormData.expiryDate,
          cardType: getCardType(cardNumber)
        }
      }

      // Add Razorpay transaction ID if available
      if (orderFormData.razorpayTransactionId) {
        orderData.razorpayTransactionId = orderFormData.razorpayTransactionId
      }

      // Add UPI transaction ID if payment method is UPI
      if (orderFormData.paymentMethod === 'upi' && upiTransactionId) {
        orderData.upiTransactionId = upiTransactionId
      }

      console.log('Sending order data:', orderData)

      // Send order to backend
      const response = await axios.post(
        'http://localhost:8000/api/orders',
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data) {
        // Clear cart
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cartUpdated'))
        
        // Prepare data for success page
        const successData = {
          order: response.data.order,
          customerInfo: {
            fullName: orderFormData.fullName,
            email: orderFormData.email,
            phone: orderFormData.phone,
            address: orderFormData.address,
            city: orderFormData.city,
            state: orderFormData.state,
            pincode: orderFormData.pincode
          },
          items: cartItems
        }
        
        // Navigate to success page with order data
        navigate('/order-success', { state: successData })
      }
    } catch (error) {
      console.error('Error placing order:', error)
      console.error('Error response:', error.response?.data)
      
      let errorMessage = 'Failed to place order. Please try again.'
      
      if (error.response?.data?.details) {
        errorMessage = 'Validation errors:\n' + error.response.data.details.map(d => `- ${d.field}: ${d.message}`).join('\n')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
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
    // Small delay to show confirmation before submitting
    setTimeout(() => {
      handleSubmit(new Event('submit'))
    }, 500)
  }

  const loadCartItems = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const items = JSON.parse(savedCart)
      if (items.length === 0) {
        navigate('/cart')
      }
      setCartItems(items)
    } else {
      navigate('/cart')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    let formattedValue = value
    
    // Handle phone number validation - only allow 10 digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 10) {
        formattedValue = digitsOnly
      } else {
        return // Don't update if more than 10 digits
      }
    }
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4)
      }
    }
    
    // Format CVV (only numbers)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '')
    if (/^4/.test(number)) return 'Visa'
    if (/^5[1-5]/.test(number)) return 'Mastercard'
    if (/^3[47]/.test(number)) return 'American Express'
    if (/^6(?:011|5)/.test(number)) return 'Discover'
    return 'Unknown'
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits'
    }

    // Validate card details if card payment is selected
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
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Expiry date must be in MM/YY format'
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required'
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.18
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // If card payment, show Razorpay modal instead of direct submission
    if (formData.paymentMethod === 'card') {
      handleRazorpayPayment()
      return
    }

    // For other payment methods, submit directly
    await submitOrder(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 via-indigo-5 to-purple-10">
      {/* Hero Section - Secure Checkout Theme with Background */}
      <section className="relative py-32 overflow-hidden min-h-[850px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://thegood.com/wp-content/uploads/Checkout-Page-Design.png)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 via-indigo-400/85 to-purple-500/90"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg mb-6 animate-fade-in-up">
              <Lock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">
                256-bit SSL Encrypted Checkout
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in-up animation-delay-200">
              Secure Checkout
            </h1>
            
            <p className="text-lg text-blue-100 mb-6 animate-fade-in-up animation-delay-400">
              Complete your purchase safely and securely
            </p>
            
            <div className="flex items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
              <button
                onClick={() => navigate('/cart')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-full text-blue-700 hover:text-blue-900 font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {cartItems.length} items ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-purple-900">Personal Information</h2>
                  </div>
                  {isAutoFilled && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Auto-filled</span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAutoFilledData}
                        className="px-3 py-1.5 text-sm text-purple-600 hover:text-purple-800 font-medium hover:bg-purple-50 rounded-full transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        errors.fullName ? 'border-red-400 bg-red-50/50' : 
                        isAutoFilled && formData.fullName ? 'border-green-300 bg-green-50/30' : 
                        'border-purple-200 bg-purple-50/50'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-3 border-2 ${
                          errors.email ? 'border-red-400 bg-red-50/50' : 
                          isAutoFilled && formData.email ? 'border-green-300 bg-green-50/30' : 
                          'border-purple-200 bg-purple-50/50'
                        } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength="10"
                        pattern="[0-9]{10}"
                        className={`w-full pl-11 pr-4 py-3 border-2 ${
                          errors.phone ? 'border-red-400 bg-red-50/50' : 
                          isAutoFilled && formData.phone ? 'border-green-300 bg-green-50/30' : 
                          'border-purple-200 bg-purple-50/50'
                        } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                    {!errors.phone && formData.phone && formData.phone.length < 10 && formData.phone.length > 0 && (
                      <p className="mt-1 text-xs text-amber-600">Phone number must be 10 digits ({formData.phone.length}/10)</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-900">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Street Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 border-2 ${
                        errors.address ? 'border-red-400 bg-red-50/50' : 
                        isAutoFilled && formData.address ? 'border-green-300 bg-green-50/30' : 
                        'border-purple-200 bg-purple-50/50'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all resize-none`}
                      placeholder="House no., Building name, Street"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        errors.city ? 'border-red-400 bg-red-50/50' : 
                        isAutoFilled && formData.city ? 'border-green-300 bg-green-50/30' : 
                        'border-purple-200 bg-purple-50/50'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        errors.state ? 'border-red-400 bg-red-50/50' : 
                        isAutoFilled && formData.state ? 'border-green-300 bg-green-50/30' : 
                        'border-purple-200 bg-purple-50/50'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="Enter state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 ${
                        errors.pincode ? 'border-red-400 bg-red-50/50' : 
                        isAutoFilled && formData.pincode ? 'border-green-300 bg-green-50/30' : 
                        'border-purple-200 bg-purple-50/50'
                      } rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all`}
                      placeholder="6-digit pincode"
                      maxLength="6"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-purple-900">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center p-4 bg-purple-50 border-2 border-purple-200 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-purple-900">Credit / Debit Card</p>
                        <p className="text-sm text-purple-600">Pay securely with your card</p>
                      </div>
                    </div>
                  </label>

                  {/* Card Details Form - Show only when card is selected */}
                  {formData.paymentMethod === 'card' && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 space-y-4 animate-fade-in">
                      <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-4 h-4 text-purple-600" />
                        <p className="text-sm text-purple-700 font-medium">Your card details are secure and encrypted</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-900 mb-2">
                          Card Holder Name *
                        </label>
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
                        {errors.cardHolderName && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardHolderName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-900 mb-2">
                          Card Number *
                        </label>
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
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                        )}
                        {formData.cardNumber.replace(/\s/g, '').length >= 4 && (
                          <p className="mt-1 text-sm text-purple-600 font-medium">
                            {getCardType(formData.cardNumber)}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-purple-900 mb-2">
                            Expiry Date *
                          </label>
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
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-purple-900 mb-2">
                            CVV / CVC *
                          </label>
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
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <label className="flex items-center p-4 bg-purple-50 border-2 border-purple-200 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <Building className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-purple-900">UPI Payment</p>
                        <p className="text-sm text-purple-600">Pay using UPI apps</p>
                      </div>
                    </div>
                  </label>

                  {/* UPI QR Code Section - Show when UPI is selected */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 space-y-4 animate-fade-in">
                      <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-blue-700 font-medium">Scan QR code to pay via UPI</p>
                      </div>

                      {/* Debug info */}
                      <div className="text-xs text-gray-500 mb-2">
                        Debug: showUpiQr = {showUpiQr ? 'true' : 'false'}
                      </div>

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
                          {/* QR Code Display */}
                          <div className="bg-white p-6 rounded-xl text-center">
                            <p className="text-sm text-blue-700 mb-4 font-medium">
                              Scan this QR code with any UPI app
                            </p>
                            <div className="inline-block p-4 bg-white border-4 border-blue-500 rounded-2xl shadow-lg">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateUpiLink())}`}
                                alt="UPI QR Code"
                                className="w-48 h-48"
                                onError={(e) => {
                                  console.error('QR Code failed to load')
                                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="14"%3EQR Code%3C/text%3E%3C/svg%3E'
                                }}
                              />
                            </div>
                            <p className="text-xs text-blue-600 mt-4">
                              Amount: ₹{calculateTotal().toLocaleString('en-IN')}
                            </p>
                            
                            {/* Manual UPI ID for backup */}
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-xs text-blue-700 mb-1">Or pay manually to:</p>
                              <p className="text-sm font-mono font-bold text-blue-900">artsphere@upi</p>
                            </div>
                          </div>

                          {/* UPI Apps */}
                          <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="text-xs text-blue-700 font-medium">Supported apps:</span>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-900 border border-blue-200">GPay</span>
                              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-900 border border-blue-200">PhonePe</span>
                              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-900 border border-blue-200">Paytm</span>
                            </div>
                          </div>

                          {/* Payment Confirmation */}
                          {!paymentConfirmed ? (
                            <div className="space-y-3">
                              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <p className="text-sm text-yellow-800 font-medium mb-3">
                                  After completing payment, enter your UPI Transaction ID
                                </p>
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
                              <p className="text-sm text-green-700 mt-1">Transaction ID: {upiTransactionId}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <label className="flex items-center p-4 bg-purple-50 border-2 border-purple-200 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <ShoppingBag className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-purple-900">Cash on Delivery</p>
                        <p className="text-sm text-purple-600">Pay when you receive</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 animate-fade-in-up animation-delay-600">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Order Summary</h2>

              {/* Cart Items - Detailed View */}
              <div className="space-y-4 mb-6 max-h-[600px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-purple-900 text-lg mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-purple-600 font-medium mb-3">
                        by {item.artistName}
                      </p>
                      
                      {/* Artwork Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-purple-700">Type:</span>
                          <span className="font-semibold text-purple-900">{item.artworkDetails?.artworkType || item.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-purple-700">Medium:</span>
                          <span className="font-semibold text-purple-900">{item.medium}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-purple-700">Year:</span>
                          <span className="font-semibold text-purple-900">{item.year}</span>
                        </div>
                        {item.dimensions && (item.dimensions.height || item.dimensions.width) && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-purple-700">Size:</span>
                            <span className="font-semibold text-purple-900">
                              {item.dimensions.height} × {item.dimensions.width}
                              {item.dimensions.depth && ` × ${item.dimensions.depth}`} {item.dimensions.unit}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price and Quantity */}
                      <div className="pt-3 border-t border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-purple-700">Quantity:</span>
                          <span className="font-bold text-purple-900">{item.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-700">Price:</span>
                          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                        {item.quantity > 1 && (
                          <p className="text-xs text-purple-600 text-right mt-1">
                            ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-purple-200">
                <div className="flex justify-between text-purple-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-purple-700">
                  <span>Tax (18% GST)</span>
                  <span className="font-semibold">₹{calculateTax().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-purple-900">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{calculateTotal().toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-purple-600">
                <CheckCircle className="w-4 h-4" />
                <span>Secure & encrypted payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Razorpay Payment Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Razorpay</p>
                  <p className="text-blue-100 text-xs">Secure Payment Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-600 mb-2">Order Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹{calculateTotal().toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {cartItems.length} item(s) • Tax included
                </p>
              </div>

              {/* Card Display */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  <p className="text-xs text-gray-400 mb-8">CARD NUMBER</p>
                  <p className="text-2xl font-mono tracking-widest mb-8">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">CARD HOLDER</p>
                      <p className="font-semibold text-sm">{formData.cardHolderName || 'YOUR NAME'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">EXPIRES</p>
                      <p className="font-semibold text-sm">{formData.expiryDate || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing Status */}
              {razorpayProcessing ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-900 font-semibold mb-2">Processing Payment</p>
                    <p className="text-sm text-gray-600">Please wait while we process your payment...</p>
                  </div>

                  {/* Fake Processing Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">Verifying card details</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">Processing transaction</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl opacity-50">
                      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Confirming payment</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Security Info */}
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                    <Lock className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">256-bit SSL Encrypted</span> • PCI DSS Compliant
                    </p>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={processRazorpayPayment}
                    disabled={razorpayProcessing}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pay ₹{calculateTotal().toLocaleString('en-IN')}
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setShowRazorpayModal(false)}
                    className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Footer Info */}
              <p className="text-xs text-center text-gray-500">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage

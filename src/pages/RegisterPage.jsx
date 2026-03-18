import { useState } from 'react'
import { User, Mail, Lock, Phone, Eye, EyeOff, UserPlus } from 'lucide-react'
import axios from 'axios'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle phone number validation - only allow 10 digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 10) {
        if (name.startsWith('address.')) {
          const addressField = name.split('.')[1]
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              [addressField]: value
            }
          })
        } else {
          setFormData({
            ...formData,
            [name]: digitsOnly
          })
        }
      }
      setError('')
      return
    }
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { confirmPassword, ...dataToSend } = formData
      const response = await axios.post('http://localhost:8000/api/auth/register', dataToSend)
      
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      alert('Registration successful!')
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/90 via-purple-900/80 to-pink-900/90"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <h1 className="text-5xl font-serif font-bold mb-6">Join ARTSPHERE</h1>
          <p className="text-xl text-pink-100 max-w-md leading-relaxed mb-12">
            Become part of our vibrant community and explore the world of art
          </p>
          <div className="space-y-6 text-left max-w-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Discover Art</h3>
                <p className="text-pink-100 text-sm">Explore thousands of unique artworks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🖼️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Collect & Own</h3>
                <p className="text-pink-100 text-sm">Build your personal art collection</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Connect</h3>
                <p className="text-pink-100 text-sm">Join a community of art lovers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-y-auto">
        <div className="max-w-4xl w-full py-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-purple-900 mb-2">Create Account</h2>
            <p className="text-purple-600 text-lg">Start your art journey today</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Email in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Password in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Phone Number <span className="text-purple-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {formData.phone && formData.phone.length < 10 && formData.phone.length > 0 && (
                    <p className="mt-1 text-xs text-amber-600">Phone number must be 10 digits</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password - Full Width */}
              <div>
                <label className="block text-sm font-semibold text-purple-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-3 border-t-2 border-purple-100">
                <h3 className="text-base font-bold text-purple-900 mb-3">Address <span className="text-purple-400 font-normal text-sm">(Optional)</span></h3>
                
                {/* Street Address */}
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Street Address
                  </label>
                  <textarea
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white resize-none"
                    placeholder="House no., Building name, Street"
                  />
                </div>

                {/* City, State, and Pincode in one row */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all bg-white"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                />
                <label className="ml-3 text-sm text-purple-700">
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-purple-700">
                Already have an account?{' '}
                <a href="/login" className="text-purple-600 hover:text-purple-800 font-bold underline decoration-2 underline-offset-2">
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a href="/" className="text-purple-600 hover:text-purple-900 font-semibold inline-flex items-center gap-2 group">
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

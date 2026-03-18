import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, Shield, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Dispatch event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Dispatch event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.18 // 18% GST
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ShoppingCart className="w-16 h-16 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold text-purple-900 mb-4">Your Cart is Empty</h2>
          <p className="text-xl text-purple-600 mb-8">Discover amazing artworks and add them to your cart</p>
          <button
            onClick={() => navigate('/collections')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Browse Collections
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section - Shopping Cart Theme with Background */}
      <section className="relative py-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(data:image/jpeg;base64,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)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/85 via-purple-300/80 to-pink-500/85"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md mb-6 animate-fade-in-up">
              <span className="text-2xl">🛒</span>
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Cart
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
              Shopping Cart
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 animate-fade-in-up animation-delay-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your collection
            </p>
            
            <div className="flex items-center justify-center gap-3 animate-fade-in-up animation-delay-500">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Package className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-48 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-purple-900 mb-2">{item.name}</h3>
                        <p className="text-purple-600 font-medium mb-1">{item.artistName}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            {item.type}
                          </span>
                          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                            {item.medium}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-purple-700" />
                        </button>
                        <span className="text-lg font-bold text-purple-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-purple-700" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-purple-600">
                            ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
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
                <div className="border-t-2 border-purple-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-900">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{calculateTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/collections')}
                className="w-full py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-all"
              >
                Continue Shopping
              </button>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-purple-700">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Secure Payment</p>
                    <p className="text-xs text-purple-600">100% secure transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-purple-700">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Free Shipping</p>
                    <p className="text-xs text-purple-600">On all orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-purple-700">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Safe Packaging</p>
                    <p className="text-xs text-purple-600">Artwork protection guaranteed</p>
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

export default CartPage

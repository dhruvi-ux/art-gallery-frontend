import { useState, useEffect } from 'react'
import { Menu, X, Search, User, ShoppingCart, LogIn, UserPlus, UserCircle, LogOut, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    
    // Load cart count
    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount)
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
    
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  const updateCartCount = () => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const cartItems = JSON.parse(cart)
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } else {
      setCartCount(0)
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('cartUpdated'))
    setIsLoggedIn(false)
    setShowUserMenu(false)
    navigate('/')
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Artists', href: '/artists' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Visit', href: '/visit' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-neutral-900/98 backdrop-blur-md shadow-lg' 
          : 'bg-white/98 backdrop-blur-md shadow-lg'
        : darkMode
          ? 'bg-neutral-900/80 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold tracking-tight">
              <span className={darkMode ? 'text-white' : 'text-neutral-900'}>ART</span>
              <span className="text-amber-600">SPHERE</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 font-medium text-base ${
                  darkMode 
                    ? 'text-neutral-300 hover:text-amber-500' 
                    : 'text-neutral-700 hover:text-amber-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors ${
              darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
            }`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`} />
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700" />
              )}
            </button>
            
            {/* Cart Icon with Badge - Only show if logged in */}
            {isLoggedIn && (
              <button 
                onClick={handleCartClick}
                className={`relative p-2 rounded-full transition-colors group ${
                  darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-purple-50'
                }`}
              >
                <ShoppingCart className={`w-5 h-5 transition-colors ${
                  darkMode 
                    ? 'text-neutral-300 group-hover:text-purple-400' 
                    : 'text-neutral-700 group-hover:text-purple-600'
                }`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            )}
            
            {/* User Profile Icon - Direct Navigation */}
            {isLoggedIn ? (
              <button 
                onClick={() => navigate('/profile')}
                className={`p-2 rounded-full transition-colors group ${
                  darkMode ? 'hover:bg-purple-900/50' : 'hover:bg-purple-50'
                }`}
                title="My Profile"
              >
                <User className={`w-5 h-5 transition-colors ${
                  darkMode 
                    ? 'text-neutral-300 group-hover:text-purple-400' 
                    : 'text-neutral-700 group-hover:text-purple-600'
                }`} />
              </button>
            ) : (
              <div className="relative user-menu-container">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                  }`}
                  title="Login / Register"
                >
                  <User className={`w-5 h-5 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`} />
                </button>
                
                {/* Dropdown Menu for Non-logged in users */}
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in ${
                    darkMode 
                      ? 'bg-neutral-800 border border-neutral-700' 
                      : 'bg-white border border-purple-100'
                  }`}>
                    <button
                      onClick={() => {
                        navigate('/login')
                        setShowUserMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                        darkMode
                          ? 'text-neutral-300 hover:bg-neutral-700 hover:text-purple-400'
                          : 'text-neutral-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="font-medium">Login</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register')
                        setShowUserMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                        darkMode
                          ? 'text-neutral-300 hover:bg-neutral-700 hover:text-purple-400'
                          : 'text-neutral-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <UserPlus className="w-5 h-5" />
                      <span className="font-medium">Register</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700" />
              )}
            </button>
            
            {/* Mobile Cart Icon */}
            {isLoggedIn && (
              <button 
                onClick={handleCartClick}
                className={`relative p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-neutral-800' : 'hover:bg-purple-50'
                }`}
              >
                <ShoppingCart className={`w-5 h-5 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                darkMode 
                  ? 'text-neutral-300 hover:bg-neutral-800' 
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden border-t ${
          darkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : 'bg-white border-neutral-200'
        }`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md ${
                  darkMode
                    ? 'text-neutral-300 hover:bg-neutral-800'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate('/profile')
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                    darkMode
                      ? 'text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    handleCartClick()
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                    darkMode
                      ? 'text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login')
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                    darkMode
                      ? 'text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register')
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                    darkMode
                      ? 'text-neutral-300 hover:bg-neutral-800'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

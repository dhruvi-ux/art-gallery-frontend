import { useEffect, useState } from 'react'
import { Search, Grid, List, Heart, ShoppingCart, Eye, X, User, Calendar, Palette, Tag, Ruler } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CollectionsPage = () => {
  const [artworks, setArtworks] = useState([])
  const [filteredArtworks, setFilteredArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchArtworks()
  }, [])

  useEffect(() => {
    filterArtworks()
  }, [searchTerm, selectedType, priceRange, artworks])

  const fetchArtworks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/artworks')
      setArtworks(response.data.artworks)
      setFilteredArtworks(response.data.artworks)
    } catch (error) {
      console.error('Error fetching artworks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterArtworks = () => {
    let filtered = artworks

    if (searchTerm) {
      filtered = filtered.filter(artwork =>
        artwork.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.medium.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(artwork => artwork.type === selectedType)
    }

    if (priceRange !== 'all') {
      filtered = filtered.filter(artwork => {
        if (priceRange === 'under1000') return artwork.price < 1000
        if (priceRange === '1000-5000') return artwork.price >= 1000 && artwork.price < 5000
        if (priceRange === '5000-10000') return artwork.price >= 5000 && artwork.price < 10000
        if (priceRange === 'over10000') return artwork.price >= 10000
        return true
      })
    }

    setFilteredArtworks(filtered)
  }

  const allTypes = ['Painting', 'Sculpture', 'Photography', 'Digital Art', 'Mixed Media', 'Installation', 'Print', 'Drawing', 'Other']

  const addToCart = (artwork) => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add items to cart')
      navigate('/login')
      return
    }

    // Get existing cart
    const existingCart = localStorage.getItem('cart')
    let cart = existingCart ? JSON.parse(existingCart) : []

    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => item._id === artwork._id)
    
    if (existingItemIndex > -1) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item with quantity 1
      cart.push({ ...artwork, quantity: 1 })
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch event to update navbar
    window.dispatchEvent(new Event('cartUpdated'))
    
    // Show success message
    alert(`${artwork.name} added to cart!`)
  }

  const buyNow = (artwork) => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to purchase')
      navigate('/login')
      return
    }

    // Add to cart
    addToCart(artwork)
    
    // Navigate to cart
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-purple-600 font-medium">Loading collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg animate-fade-in-up">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ✨ Curated Art Collection
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-fade-in-up animation-delay-200">
            Where Art Meets Soul
          </h1>
          
          <p className="text-2xl md:text-3xl text-purple-800 font-light max-w-4xl mx-auto mb-4 leading-relaxed animate-fade-in-up animation-delay-400">
            Explore a world of creativity, passion, and timeless beauty
          </p>
          
          <p className="text-lg text-purple-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            Each piece tells a story, each stroke captures emotion. Discover artworks that resonate with your spirit and transform your space into a gallery of inspiration.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-800">
            <div className="px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {artworks.length}+
              </p>
              <p className="text-sm text-purple-700 font-medium">Masterpieces</p>
            </div>
            <div className="px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {allTypes.length}+
              </p>
              <p className="text-sm text-purple-700 font-medium">Art Forms</p>
            </div>
            <div className="px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                10+
              </p>
              <p className="text-sm text-purple-700 font-medium">Artists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Single-Line Filter Bar */}
      <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-purple-100">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search - Takes more space */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="Search artworks, artists, medium..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-purple-50/50 border border-purple-200
                           rounded-xl focus:ring-2 focus:ring-purple-300
                           focus:border-purple-400 outline-none transition-all text-sm"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 bg-blue-50/50 border border-blue-200
                         rounded-xl focus:ring-2 focus:ring-blue-300
                         outline-none text-sm min-w-[140px]"
            >
              <option value="all">All Types</option>
              {allTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2.5 bg-pink-50/50 border border-pink-200
                         rounded-xl focus:ring-2 focus:ring-pink-300
                         outline-none text-sm min-w-[140px]"
            >
              <option value="all">All Prices</option>
              <option value="under1000">Under ₹1k</option>
              <option value="1000-5000">₹1k - ₹5k</option>
              <option value="5000-10000">₹5k - ₹10k</option>
              <option value="over10000">Over ₹10k</option>
            </select>

            {/* Results Count */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <span className="font-bold text-purple-600 text-sm">
                {filteredArtworks.length}
              </span>
              <span className="text-neutral-600 text-sm ml-1">results</span>
            </div>

            {/* View Mode Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-purple-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-purple-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artworks Grid/List */}
      <section className="max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-purple-400" />
            </div>
            <p className="text-2xl text-neutral-600 font-medium">No artworks found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork._id}
                className="group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Square Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full py-2 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors font-semibold text-sm">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                    
                    {/* Status Badges */}
                    {artwork.status === 'sold' && (
                      <div className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white font-bold rounded-full text-xs shadow-lg">
                        SOLD
                      </div>
                    )}
                    {artwork.featured && artwork.status !== 'sold' && (
                      <div className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full text-xs shadow-lg">
                        ⭐
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600 shadow-lg">
                      {artwork.type}
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-neutral-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {artwork.name}
                    </h3>
                    
                    <p className="text-xs text-purple-600 font-medium mb-2 line-clamp-1">
                      {artwork.artistName}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                      <span>{artwork.year}</span>
                      <span className="line-clamp-1">{artwork.medium}</span>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₹{(artwork.price / 1000).toFixed(0)}k
                        </span>
                        <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors group">
                          <Heart className="w-4 h-4 text-purple-400 group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(artwork)
                          }}
                          className="flex-1 py-2.5 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            buyNow(artwork)
                          }}
                          className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 h-80">
                    <img src={artwork.image} alt={artwork.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-neutral-900 mb-3">{artwork.name}</h3>
                        <p className="text-purple-600 font-semibold text-lg flex items-center gap-2 mb-4">
                          <User className="w-5 h-5" />
                          {artwork.artistName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-500 mb-1">Price</p>
                        <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₹{artwork.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {artwork.type}
                      </span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {artwork.year}
                      </span>
                      <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Palette className="w-4 h-4" />
                        {artwork.medium}
                      </span>
                    </div>

                    <p className="text-neutral-700 mb-6 line-clamp-2 text-lg leading-relaxed">{artwork.description}</p>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => addToCart(artwork)}
                        className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <button className="px-6 py-4 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg group"
                >
                  <X className="w-6 h-6 text-neutral-700 group-hover:text-purple-600 transition-colors" />
                </button>
              </div>

              {/* Details */}
              <div className="p-8 lg:p-10">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">{selectedArtwork.name}</h2>
                
                <div className="flex items-center gap-2 text-purple-600 font-semibold text-xl mb-6">
                  <User className="w-6 h-6" />
                  {selectedArtwork.artistName}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                    <p className="text-sm text-neutral-600 mb-1 flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Type
                    </p>
                    <p className="font-bold text-neutral-900 text-lg">{selectedArtwork.type}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <p className="text-sm text-neutral-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Year
                    </p>
                    <p className="font-bold text-neutral-900 text-lg">{selectedArtwork.year}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
                    <p className="text-sm text-neutral-600 mb-1 flex items-center gap-1">
                      <Palette className="w-4 h-4" />
                      Medium
                    </p>
                    <p className="font-bold text-neutral-900 text-lg">{selectedArtwork.medium}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <p className="text-sm text-neutral-600 mb-1">Status</p>
                    <p className="font-bold text-neutral-900 text-lg capitalize">{selectedArtwork.status}</p>
                  </div>
                </div>

                <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">Description</h3>
                  <p className="text-neutral-700 leading-relaxed">{selectedArtwork.description}</p>
                </div>

                {selectedArtwork.dimensions && (selectedArtwork.dimensions.height || selectedArtwork.dimensions.width) && (
                  <div className="mb-6 p-4 bg-neutral-50 rounded-2xl">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-purple-500" />
                      Dimensions
                    </h3>
                    <p className="text-neutral-700 font-medium">
                      {selectedArtwork.dimensions.height} × {selectedArtwork.dimensions.width}
                      {selectedArtwork.dimensions.depth && ` × ${selectedArtwork.dimensions.depth}`} {selectedArtwork.dimensions.unit}
                    </p>
                  </div>
                )}

                <div className="mb-6 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                  <p className="text-sm text-purple-700 mb-2 font-medium">Price</p>
                  <span className="text-5xl font-bold text-purple-600">₹{selectedArtwork.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => buyNow(selectedArtwork)}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Purchase Now
                  </button>
                  <button className="px-6 py-4 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionsPage

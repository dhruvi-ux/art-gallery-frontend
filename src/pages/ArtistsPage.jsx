import { useEffect, useState } from 'react'
import { Search, MapPin, Award, Globe, Mail, Phone, X } from 'lucide-react'
import axios from 'axios'

const ArtistsPage = () => {
  const [artists, setArtists] = useState([])
  const [filteredArtists, setFilteredArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    filterArtists()
  }, [searchTerm, selectedStyle, artists])

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/artists')
      setArtists(response.data.artists)
      setFilteredArtists(response.data.artists)
    } catch (error) {
      console.error('Error fetching artists:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterArtists = () => {
    let filtered = artists

    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.style.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedStyle !== 'all') {
      filtered = filtered.filter(artist =>
        artist.style.toLowerCase() === selectedStyle.toLowerCase()
      )
    }

    setFilteredArtists(filtered)
  }

  const allStyles = [...new Set(artists.map(artist => artist.style))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600">Loading artists...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-20 via-purple-10 to-blue-10">
      {/* Hero Section with Background Image */}
      <section className="relative h-[1300px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.stockcake.com/public/a/3/3/a339bd4c-af60-4a54-b74f-2a19f0117eb6_large/artist-contemplating-work-stockcake.jpg)',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in-up drop-shadow-lg">
              Featured Artists
            </h1>
            <p className="text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-200 drop-shadow-md">
              Discover the talented artists behind our exceptional collection
            </p>
            <div className="flex justify-center gap-6 animate-fade-in-up animation-delay-400">
              <div className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold shadow-xl border border-white/30">
                <span className="text-3xl font-bold">{artists.length}+</span>
                <span className="block text-sm text-purple-100">Artists</span>
              </div>
              <div className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold shadow-xl border border-white/30">
                <span className="text-3xl font-bold">{allStyles.length}+</span>
                <span className="block text-sm text-purple-100">Styles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white/60 backdrop-blur-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by name, nationality, or style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Style Filter */}
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all shadow-sm hover:shadow-md min-w-[200px]"
            >
              <option value="all">All Styles</option>
              {allStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="text-purple-700 text-sm whitespace-nowrap font-medium">
              <span className="font-bold text-purple-900">{filteredArtists.length}</span> of <span className="font-bold">{artists.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredArtists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-purple-600">No artists found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtists.map((artist, index) => (
              <div
                key={artist._id}
                onClick={() => setSelectedArtist(artist)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Square Portrait */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {artist.featured && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                      ⭐ FEATURED
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Info */}
                <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
                  <h3 className="text-xl font-serif font-bold text-purple-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {artist.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-purple-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{artist.nationality} • {artist.birthYear}</span>
                  </div>

                  <p className="text-sm font-semibold text-purple-800 mb-3 uppercase tracking-wide">
                    {artist.style}
                  </p>

                  {artist.specialities && artist.specialities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {artist.specialities.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-purple-700 text-xs rounded-full shadow-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-purple-700 line-clamp-3 mb-4">
                    {artist.bio}
                  </p>

                  <button className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Artist Detail Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Header */}
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px] bg-gradient-to-br from-pink-100 to-purple-100">
                  <img
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-pink-50 to-purple-50">
                  <button
                    onClick={() => setSelectedArtist(null)}
                    className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:rotate-90"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h2 className="text-4xl font-serif font-bold text-purple-900 mb-4">
                    {selectedArtist.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-purple-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{selectedArtist.nationality} • Born {selectedArtist.birthYear}</span>
                  </div>

                  <p className="text-lg font-semibold text-purple-800 mb-6 uppercase tracking-wide">
                    {selectedArtist.style}
                  </p>

                  {/* Specialities */}
                  {selectedArtist.specialities && selectedArtist.specialities.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-purple-900 mb-3 uppercase tracking-wide">Specialities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtist.specialities.map((spec, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-white text-purple-700 font-medium rounded-full shadow-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  <div className="mb-6 pb-6 border-b border-purple-200">
                    <h3 className="text-sm font-semibold text-purple-900 mb-3 uppercase tracking-wide">Biography</h3>
                    <p className="text-purple-700 leading-relaxed">{selectedArtist.bio}</p>
                  </div>

                  {/* Famous Artworks */}
                  {selectedArtist.famousArtworks && selectedArtist.famousArtworks.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-purple-200">
                      <h3 className="text-sm font-semibold text-purple-900 mb-3 uppercase tracking-wide">Notable Works</h3>
                      <ul className="space-y-2">
                        {selectedArtist.famousArtworks.map((artwork, index) => (
                          <li key={index} className="text-purple-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{artwork}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Awards */}
                  {selectedArtist.awards && selectedArtist.awards.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-purple-200">
                      <h3 className="text-sm font-semibold text-purple-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Awards & Recognition
                      </h3>
                      <ul className="space-y-2">
                        {selectedArtist.awards.map((award, index) => (
                          <li key={index} className="text-purple-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{award}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Contact */}
                  {selectedArtist.contact && (selectedArtist.contact.email || selectedArtist.contact.phone || selectedArtist.contact.website) && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
                      <h3 className="text-sm font-semibold text-purple-900 mb-4 uppercase tracking-wide">Contact Information</h3>
                      <div className="space-y-3">
                        {selectedArtist.contact.email && (
                          <a href={`mailto:${selectedArtist.contact.email}`} className="flex items-center gap-3 text-purple-700 hover:text-purple-900 transition-colors">
                            <Mail className="w-5 h-5" />
                            <span>{selectedArtist.contact.email}</span>
                          </a>
                        )}
                        {selectedArtist.contact.phone && (
                          <a href={`tel:${selectedArtist.contact.phone}`} className="flex items-center gap-3 text-purple-700 hover:text-purple-900 transition-colors">
                            <Phone className="w-5 h-5" />
                            <span>{selectedArtist.contact.phone}</span>
                          </a>
                        )}
                        {selectedArtist.contact.website && (
                          <a href={selectedArtist.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-purple-700 hover:text-purple-900 transition-colors">
                            <Globe className="w-5 h-5" />
                            <span>Visit Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtistsPage

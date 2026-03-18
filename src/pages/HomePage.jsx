import { ArrowRight, Calendar, Users, Palette, Sparkles, Award, Heart, TrendingUp, Quote } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const featuredArtworks = [
    {
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
      title: 'Blooming Elegance',
      artist: 'Sophie Laurent',
      category: 'Floral Art',
      description: 'A stunning collection of vibrant flowers captured in perfect harmony',
      price: '₹55,000'
    },
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      title: 'Mountain Serenity',
      artist: 'Marcus Chen',
      category: 'Landscape',
      description: 'Breathtaking mountain vistas that transport you to peaceful destinations',
      price: '₹72,000'
    },
    {
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
      title: 'Abstract Dreams',
      artist: 'Elena Vasquez',
      category: 'Abstract',
      description: 'Bold colors and dynamic forms create a mesmerizing visual experience',
      price: '₹64,000'
    }
  ]

  const allFeaturedArtworks = [
    {
      id: 1,
      title: 'Ocean Dreams',
      artist: 'Isabella Martinez',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
      category: 'Seascape',
      price: '₹62,000'
    },
    {
      id: 2,
      title: 'Urban Rhythm',
      artist: 'David Kim',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
      category: 'Contemporary',
      price: '₹58,000'
    },
    {
      id: 3,
      title: 'Desert Mirage',
      artist: 'Amara Singh',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
      category: 'Landscape',
      price: '₹47,000'
    },
    {
      id: 4,
      title: 'Crimson Petals',
      artist: 'Yuki Tanaka',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      category: 'Floral',
      price: '₹41,000'
    },
    {
      id: 5,
      title: 'Cosmic Harmony',
      artist: 'Lucas Anderson',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
      category: 'Abstract',
      price: '₹69,000'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Art Collector',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      quote: 'The quality and curation of artworks here is exceptional. I\'ve found pieces that truly speak to my soul.'
    },
    {
      name: 'Michael Chen',
      role: 'Interior Designer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      quote: 'A treasure trove for anyone seeking unique art. The staff is knowledgeable and the experience is always delightful.'
    },
    {
      name: 'Emma Williams',
      role: 'Art Enthusiast',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      quote: 'Every visit is an inspiration. The exhibitions are thoughtfully curated and the atmosphere is simply magical.'
    }
  ]

  const exhibitions = [
    {
      title: 'Modern Masters',
      date: 'Jan 15 - Mar 30, 2026',
      description: 'Explore groundbreaking works from contemporary artists',
      icon: Palette
    },
    {
      title: 'Artist Talks',
      date: 'Every Saturday',
      description: 'Meet the artists behind the masterpieces',
      icon: Users
    },
    {
      title: 'Special Events',
      date: 'Monthly',
      description: 'Exclusive gallery nights and workshops',
      icon: Calendar
    }
  ]

  return (
    <main className="pt-20">
      {/* Hero Section - Immersive Gallery Preview */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-500 via-purple-300 to-purple-100 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Header Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Curated Art Collection 2026</span>
            </div>
            
            <h1 className="relative text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight
               animate-headingFade overflow-hidden">

                {/* Text with visible shimmer */}
                <span
                  className="relative z-10 bg-clip-text text-transparent
                            bg-gradient-to-r from-blue-500 via-amber-200 to-white
                            animate-textShimmer">
                  One Step to Discover Exquisite Artworks
                </span>
                {/* Visible grid overlay */}
                <span
                  aria-hidden
                  className="absolute inset-0 z-0
                            bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),
                                linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]
                            bg-[size:36px_36px]
                            animate-gridMove
                            mix-blend-overlay">
                </span>
              </h1>

            <p className="text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              Explore our curated collection featuring diverse styles from talented artists worldwide
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => navigate('/register')}
                className="group px-10 py-4 bg-white text-neutral-900 rounded-full font-bold text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-105"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Gallery Wall Grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            
            {/* Artwork 1 - Large */}
            <div className="col-span-12 md:col-span-5 row-span-2 group cursor-pointer">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={featuredArtworks[0].image}
                  alt={featuredArtworks[0].title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block w-fit px-3 py-1 bg-purple-600 rounded-full text-xs font-bold mb-2">
                    {featuredArtworks[0].category}
                  </span>
                  <h3 className="text-2xl font-bold mb-1">{featuredArtworks[0].title}</h3>
                  <p className="text-sm text-white/90 mb-2">by {featuredArtworks[0].artist}</p>
                  <p className="text-xs text-white/80">{featuredArtworks[0].description}</p>
                </div>
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
              </div>
            </div>

            {/* Artwork 2 - Medium */}
            <div className="col-span-12 md:col-span-4 row-span-2 group cursor-pointer">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={featuredArtworks[1].image}
                  alt={featuredArtworks[1].title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block w-fit px-3 py-1 bg-pink-600 rounded-full text-xs font-bold mb-2">
                    {featuredArtworks[1].category}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{featuredArtworks[1].title}</h3>
                  <p className="text-sm text-white/90 mb-2">by {featuredArtworks[1].artist}</p>
                  <p className="text-xs text-white/80">{featuredArtworks[1].description}</p>
                </div>
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
              </div>
            </div>

            {/* Artwork 3 - Medium */}
            <div className="col-span-12 md:col-span-3 row-span-2 group cursor-pointer">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={featuredArtworks[2].image}
                  alt={featuredArtworks[2].title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block w-fit px-3 py-1 bg-amber-600 rounded-full text-xs font-bold mb-2">
                    {featuredArtworks[2].category}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{featuredArtworks[2].title}</h3>
                  <p className="text-sm text-white/90 mb-2">by {featuredArtworks[2].artist}</p>
                  <p className="text-xs text-white/80">{featuredArtworks[2].description}</p>
                </div>
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
              </div>
            </div>

            {/* Additional Artworks from allFeaturedArtworks */}
            {allFeaturedArtworks.slice(0, 3).map((artwork) => (
              <div key={artwork.id} className="col-span-6 md:col-span-4 row-span-1 group cursor-pointer">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block w-fit px-2 py-1 bg-purple-600 rounded-full text-xs font-bold mb-1">
                      {artwork.category}
                    </span>
                    <h3 className="text-sm font-bold mb-1">{artwork.title}</h3>
                    <p className="text-xs text-white/90">by {artwork.artist}</p>
                  </div>
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
                </div>
              </div>
            ))}

          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-white/70">Artworks in Collection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-sm text-white/70">Featured Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-sm text-white/70">Customer Rating</div>
            </div>
          </div>

        </div>
      </section>

      {/* Exhibitions & Events */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Exhibitions & Events</h2>
            <p className="text-neutral-600 text-lg">Don't miss our upcoming experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exhibitions.map((exhibition) => {
              const Icon = exhibition.icon
              return (
                <div key={exhibition.title} className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{exhibition.title}</h3>
                  <p className="text-amber-600 font-medium mb-3">{exhibition.date}</p>
                  <p className="text-neutral-600">{exhibition.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Featured Artworks</h2>
            <p className="text-neutral-600 text-lg">Curated masterpieces from our collection</p>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {allFeaturedArtworks.map((artwork) => (
                <div key={artwork.id} className="flex-shrink-0 w-72 group cursor-pointer snap-start">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-lg">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium bg-amber-600 px-3 py-1 rounded-full">{artwork.category}</span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-900 mb-1">{artwork.title}</h3>
                  <p className="text-neutral-600">{artwork.artist}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-6 py-3 border-2 border-neutral-900 text-neutral-900 rounded-full font-semibold hover:bg-neutral-900 hover:text-white transition-all">
              View All Artworks
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">What Our Clients Say</h2>
            <p className="text-neutral-600 text-lg">Hear from art lovers who trust us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-neutral-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2">
                <Quote className="w-10 h-10 text-amber-600 mb-4" />
                <p className="text-neutral-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Choose Us</h2>
            <p className="text-neutral-600 text-lg">Experience the difference with our gallery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Curated Excellence</h3>
                  <p className="text-neutral-600">Every piece is carefully selected by our expert curators to ensure the highest quality and artistic value.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Expert Guidance</h3>
                  <p className="text-neutral-600">Our knowledgeable staff provides personalized assistance to help you find the perfect artwork.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Investment Value</h3>
                  <p className="text-neutral-600">Acquire pieces from emerging and established artists with strong potential for appreciation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Passion for Art</h3>
                  <p className="text-neutral-600">We're driven by a genuine love for art and committed to sharing that passion with our community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Become a Member Today
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Enjoy exclusive benefits, free admission, and special access to events
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all hover:scale-105 shadow-lg"
          >
            Join Now
          </button>
        </div>
      </section>
    </main>
  )
}

export default HomePage

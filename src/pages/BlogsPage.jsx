import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, User, Eye, Clock, Tag, Search, TrendingUp, Sparkles } from 'lucide-react'
import axios from 'axios'

const BlogsPage = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/blogs')
      // Filter only published blogs
      const publishedBlogs = response.data.blogs.filter(blog => blog.published)
      setBlogs(publishedBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Exhibition', 'Artist Spotlight', 'Art History', 'News', 'Events']

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredBlog = filteredBlogs[0]
  const regularBlogs = filteredBlogs.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="pt-20 min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-white to-neutral-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Art Stories & Insights</span>
            </div>
            
            <h1 className="text-5xl md:text-5xl font-bold text-neutral-900 mb-6">
              Explore the World of <span className="text-amber-600">Art</span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Discover inspiring stories, artist spotlights, exhibition news, and insights from the art world
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-lg"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">No blogs found</h3>
              <p className="text-neutral-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {/* Featured Blog */}
              {featuredBlog && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-neutral-900">Featured Article</h2>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <img
                          src={featuredBlog.image}
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-semibold">
                            {featuredBlog.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-amber-600 transition-colors">
                          {featuredBlog.title}
                        </h3>
                        
                        <p className="text-neutral-600 text-lg mb-6 line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{featuredBlog.views} views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => navigate(`/blogs/${featuredBlog._id}`)}
                          className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all inline-flex items-center gap-2 w-fit"
                        >
                          Read Full Article
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Blogs Grid */}
              {regularBlogs.length > 0 && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900">Latest Articles</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularBlogs.map((blog) => (
                      <article
                        key={blog._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full text-xs font-semibold">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {blog.title}
                          </h3>
                          
                          <p className="text-neutral-600 mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>{blog.views}</span>
                            </div>
                          </div>
                          
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs flex items-center gap-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <button 
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                            className="w-full py-3 border-2 border-neutral-900 text-neutral-900 rounded-xl font-semibold hover:bg-neutral-900 hover:text-white transition-all"
                          >
                            Read More
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-100 via-neutral-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Stay Updated with Art News
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Subscribe to our newsletter and never miss the latest stories from the art world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button className="px-8 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BlogsPage

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, User, Eye, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import axios from 'axios'

const BlogDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogDetail()
  }, [id])

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/blogs/${id}`)
      setBlog(response.data.blog)
      
      // Fetch related blogs from same category
      const allBlogsResponse = await axios.get('http://localhost:8000/api/blogs')
      const related = allBlogsResponse.data.blogs
        .filter(b => b.category === response.data.blog.category && b._id !== id && b.published)
        .slice(0, 3)
      setRelatedBlogs(related)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const shareUrl = window.location.href

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Blog not found</h2>
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="pt-20 min-h-screen bg-neutral-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-neutral-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Blogs</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-semibold">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author?.name || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{blog.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-xl">
            <p className="text-lg text-neutral-700 italic leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm flex items-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mb-12 p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share2 className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold text-neutral-900">Share this article</h3>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog._id}
                  onClick={() => {
                    navigate(`/blogs/${relatedBlog._id}`)
                    window.scrollTo(0, 0)
                  }}
                  className="bg-neutral-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group cursor-pointer hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                      {relatedBlog.category}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 mt-4 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-neutral-600 text-sm line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default BlogDetailPage

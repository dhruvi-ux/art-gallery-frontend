import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-700 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold tracking-tight">
                <span className="text-white">ART</span>
                <span className="text-purple-400">SPHERE</span>
              </h3>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Discover extraordinary art from renowned and emerging artists. 
              Experience creativity and timeless beauty in our curated collections.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-600 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-neutral-400 group-hover:text-purple-400 transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-600 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-600 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors inline-block">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/artists" className="hover:text-white transition-colors inline-block">
                  Artistsype 
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors inline-block">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/visit" className="hover:text-white transition-colors inline-block">
                  Visit Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-400" />
                <span className="leading-relaxed">123 Art Street<br />Creative City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-purple-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-purple-400" />
                <a href="mailto:info@artgallery.com" className="hover:text-white transition-colors">
                  info@artgallery.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-400" />
                <span className="leading-relaxed">Tue-Sun: 10am-8pm<br />Closed Mondays</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm mb-4 leading-relaxed">
              Subscribe to receive updates on new exhibitions and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-neutral-500">
              &copy; {currentYear} ArtSphere. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/about" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

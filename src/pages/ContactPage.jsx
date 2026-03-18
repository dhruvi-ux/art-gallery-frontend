import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Award } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus(null)

    try {
      const response = await axios.post('http://localhost:8000/api/contacts', formData)
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! We will get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtext: 'Mon-Fri 9am-6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@artgallery.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: '123 Art Street, Creative City',
      subtext: 'Visit us anytime'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Tue-Sun: 10am-8pm',
      subtext: 'Closed on Mondays'
    }
  ]

  const features = [
    {
      icon: Users,
      title: 'Who We Are',
      description: 'We are a passionate team of art enthusiasts dedicated to bringing the finest contemporary and classical artworks to art lovers worldwide. Our gallery has been a cornerstone of the art community for over 20 years.'
    },
    {
      icon: Award,
      title: 'What We Do',
      description: 'We curate exceptional art collections, host inspiring exhibitions, and connect talented artists with collectors. From emerging talents to established masters, we showcase diverse artistic expressions that captivate and inspire.'
    },
    {
      icon: MessageSquare,
      title: 'Our Mission',
      description: 'To make art accessible and meaningful for everyone. We believe art has the power to transform spaces, spark conversations, and enrich lives. Our mission is to create a vibrant community where art thrives.'
    }
  ]

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-white to-neutral-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>We'd Love to Hear From You</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Get in <span className="text-amber-600">Touch</span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have questions about our artworks, exhibitions, or services? 
            Our team is here to help you discover the perfect piece for your collection.
          </p>
        </div>
      </section>

      {/* Who We Are & What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-amber-50 to-neutral-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 h-full border border-amber-100 hover:border-amber-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Contact Information</h2>
            <p className="text-neutral-600 text-lg">Multiple ways to reach us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-neutral-100 hover:border-amber-300">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{info.title}</h3>
                  <p className="text-neutral-900 font-medium mb-1">{info.details}</p>
                  <p className="text-neutral-500 text-sm">{info.subtext}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus && (
                  <div className={`p-4 rounded-xl ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Inquiry about artwork"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Visit Our Gallery</h2>
              <p className="text-neutral-600 mb-8">
                Experience art in person at our beautiful gallery space. We're located in the heart of the creative district.
              </p>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-80 bg-neutral-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gallery Location"
                ></iframe>
              </div>

              {/* Additional Info Box */}
              <div className="bg-gradient-to-br from-amber-50 to-neutral-50 p-8 rounded-2xl border border-amber-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Why Visit Us?</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Free admission to all exhibitions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Expert staff available for consultations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Private viewing rooms available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Complimentary refreshments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Art Journey?
          </h2>
          <p className="text-amber-50 text-lg mb-8">
            Join our community of art lovers and discover extraordinary pieces that speak to your soul.
          </p>
          <button className="px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-neutral-100 transition-all hover:scale-105 shadow-lg">
            Explore Collections
          </button>
        </div>
      </section>
    </main>
  )
}

export default ContactPage

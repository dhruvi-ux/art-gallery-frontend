import { Heart, Users, Award, Target, Sparkles, Globe, BookOpen, Palette } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { number: '20+', label: 'Artworks' },
    { number: '10+', label: 'Artists' },
    { number: '50+', label: 'Annual Visitors' },
    { number: '10+', label: 'Years of History' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'We believe art has the power to inspire, challenge, and transform lives.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Showcasing diverse voices and perspectives from around the world.'
    },
    {
      icon: BookOpen,
      title: 'Education First',
      description: 'Committed to making art accessible and educational for all ages.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Embracing new technologies and contemporary artistic expressions.'
    }
  ]

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Director & Chief Curator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: '20+ years experience in contemporary art curation'
    },
    {
      name: 'James Chen',
      role: 'Head of Collections',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Expert in art preservation and restoration'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Education Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Passionate about making art accessible to all'
    },
    {
      name: 'David Park',
      role: 'Exhibition Coordinator',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Specialist in international art exhibitions'
    }
  ]

  const milestones = [
    { year: '1950', event: 'Gallery founded by art enthusiasts' },
    { year: '1975', event: 'Expanded to include modern art wing' },
    { year: '1995', event: 'Became a leading contemporary art institution' },
    { year: '2010', event: 'Major renovation and digital transformation' },
    { year: '2020', event: 'Launched virtual exhibitions and online programs' },
    { year: '2025', event: 'Celebrating 75 years of artistic excellence' }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
            For over 75 years, we've been dedicated to celebrating creativity, 
            fostering artistic dialogue, and inspiring generations through the power of art.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">{stat.number}</div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Inspiring Through Art
            </h2>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              We are committed to collecting, preserving, and exhibiting exceptional works of art 
              that reflect the diversity of human creativity across cultures and time periods.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Our mission is to provide a welcoming space where art can be experienced, 
              understood, and appreciated by everyone, fostering creativity and cultural understanding 
              in our community and beyond.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80"
              alt="Gallery Interior"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Values</h2>
            <p className="text-neutral-600 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <Icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Our Journey</h2>
          <p className="text-neutral-600 text-lg">Milestones in our history</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                    <p className="text-neutral-700">{milestone.event}</p>
                  </div>
                </div>
                
                <div className="hidden md:block w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-neutral-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Meet Our Team</h2>
            <p className="text-neutral-600 text-lg">Passionate experts dedicated to art and culture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12 text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">
            Become a member and support our mission to make art accessible to everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
              Become a Member
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
              Support Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

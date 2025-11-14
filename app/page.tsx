'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Background Blobs - more prominent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-purple/20 rounded-full filter blur-[120px]"
          style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full filter blur-[120px]"
          style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-accent-blue/20 rounded-full filter blur-[120px]"
          style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '4s' }} />
        <div className="absolute bottom-1/2 left-1/3 w-[600px] h-[600px] bg-accent-purple/15 rounded-full filter blur-[150px]"
          style={{ animation: 'float 15s ease-in-out infinite', animationDelay: '6s' }} />
      </div>

      <Navbar />
      <Hero />
      <div className="relative z-10">
        <About />
        <Projects />
        <Team />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}

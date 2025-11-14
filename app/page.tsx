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
    <main className="relative min-h-screen bg-primary overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent-blue/20 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}

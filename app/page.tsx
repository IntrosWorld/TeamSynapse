'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden cursor-none">
      {/* Animated Background Blobs - more prominent */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-purple/20 rounded-full filter blur-[120px]"
          style={{
            animationName: 'float',
            animationDuration: '8s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full filter blur-[120px]"
          style={{
            animationName: 'float',
            animationDuration: '10s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: '2s'
          }} />
        <div className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-accent-blue/20 rounded-full filter blur-[120px]"
          style={{
            animationName: 'float',
            animationDuration: '12s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: '4s'
          }} />
        <div className="absolute bottom-1/2 left-1/3 w-[600px] h-[600px] bg-accent-purple/15 rounded-full filter blur-[150px]"
          style={{
            animationName: 'float',
            animationDuration: '15s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: '6s'
          }} />
      </div>

      <CustomCursor />
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

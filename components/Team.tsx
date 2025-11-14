'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const teams = [
    {
      name: 'Design & Development',
      description: 'Building the core AI infrastructure and user experience',
      members: [
        { name: 'Joy Bag', role: 'Lead Developer', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Debansh Biswal', role: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { name: 'Mohit Naik', role: 'Frontend Developer', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
        { name: 'Uday', role: 'Backend Developer', image: 'https://randomuser.me/api/portraits/men/68.jpg' },
        { name: 'Ayush Samal', role: 'UI/UX Designer', image: 'https://randomuser.me/api/portraits/men/71.jpg' },
      ],
    },
    {
      name: 'Data Collection & Management',
      description: 'Curating and managing agricultural datasets',
      members: [
        { name: 'Om Prakash', role: 'Data Lead', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
        { name: 'Viraj Ghodki', role: 'Data Engineer', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
        { name: 'Armaan', role: 'Data Analyst', image: 'https://randomuser.me/api/portraits/men/54.jpg' },
        { name: 'Ayush Mohanty', role: 'Quality Assurance', image: 'https://randomuser.me/api/portraits/men/63.jpg' },
      ],
    },
    {
      name: 'Documentation & Presentation',
      description: 'Creating comprehensive documentation and presentations',
      members: [
        { name: 'Meer', role: 'Technical Writer', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Aditya Singh', role: 'Content Strategist', image: 'https://randomuser.me/api/portraits/men/25.jpg' },
        { name: 'Aditya Nayak', role: 'Presentation Lead', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
      ],
    },
  ]

  return (
    <section id="team" className="relative pt-20 pb-32 bg-gradient-to-b from-primary via-primary to-primary-dark overflow-hidden">
      {/* Smooth transition overlay from previous section */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/100 z-0" />

      {/* Animated decorative background elements */}
      <div className="absolute inset-0 opacity-45">
        <motion.div
          className="absolute top-20 left-10 w-[450px] h-[450px] bg-accent-blue/35 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent-purple/35 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating circles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-accent-blue/50 to-accent-purple/50 shadow-lg shadow-accent-purple/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A passionate group of students working together to revolutionize agricultural AI
          </p>
        </motion.div>

        {/* Teams */}
        <div className="space-y-24">
          {teams.map((team, teamIndex) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: teamIndex * 0.2 }}
            >
              {/* Team Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  {team.name}
                </h3>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  {team.description}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan mx-auto mt-4 rounded-full" />
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {team.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: teamIndex * 0.2 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative glass rounded-2xl p-6 hover:shadow-2xl hover:shadow-accent-blue/20 transition-all duration-300"
                  >
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Profile Image */}
                      <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-white/10 group-hover:ring-accent-blue/50 transition-all duration-300">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                          unoptimized
                        />
                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Member Info */}
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                          {member.role}
                        </p>

                        {/* Social Links (Optional - placeholders) */}
                        <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a href="#" className="text-gray-400 hover:text-accent-blue transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-accent-purple transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent-cyan/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 text-lg mb-6">Interested in joining our mission?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/10 transition-all hover:scale-105"
          >
            <span className="text-white font-semibold">Get In Touch</span>
            <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

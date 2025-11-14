'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const teamMembers = [
  { id: 1, name: 'Member Name', role: 'LLM Engineer', color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Member Name', role: 'ML Engineer', color: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Member Name', role: 'Backend Engineer', color: 'from-green-500 to-emerald-500' },
  { id: 4, name: 'Member Name', role: 'UI Designer', color: 'from-orange-500 to-red-500' },
  { id: 5, name: 'Member Name', role: 'Full Stack Developer', color: 'from-indigo-500 to-purple-500' },
  { id: 6, name: 'Member Name', role: 'Data Scientist', color: 'from-teal-500 to-cyan-500' },
]

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="glass rounded-2xl p-8 text-center cursor-pointer overflow-hidden"
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
      >
        {/* Holographic overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)`,
          }}
        />

        {/* Avatar */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-6"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className={`w-full h-full rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl font-bold text-white`}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 212, 255, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.6)',
                '0 0 20px rgba(0, 212, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            M{member.id}
          </motion.div>
        </motion.div>

        {/* Name */}
        <h3 className="text-2xl font-bold mb-2 gradient-text">{member.name}</h3>

        {/* Role */}
        <p className="text-accent-cyan mb-4">{member.role}</p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          {['💼', '🔗'].map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              className="text-2xl opacity-70 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="team" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

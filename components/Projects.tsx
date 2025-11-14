'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    icon: '🤖',
    title: 'Offline Farmer LLM',
    description: 'A comprehensive offline language model designed to answer farmer queries in multiple regional languages without internet connectivity.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '📚',
    title: 'Agriculture Multimodal RAG',
    description: 'Advanced retrieval system combining text and image understanding for comprehensive agricultural knowledge delivery.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🌿',
    title: 'Plant Disease Detection',
    description: 'Mobile app using computer vision to identify plant diseases from photos and provide treatment recommendations.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: '🚁',
    title: 'Drone Crop Monitoring',
    description: 'Autonomous drone system for monitoring crop health, detecting anomalies, and optimizing irrigation patterns.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: '📡',
    title: 'IoT Soil Monitoring',
    description: 'ESP32-based sensor network for real-time soil moisture, pH, and nutrient level monitoring with edge computing.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: '💬',
    title: 'Village Information Kiosk',
    description: 'Local chatbot system deployed in village centers providing information on weather, market prices, and government schemes.',
    color: 'from-teal-500 to-cyan-500',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.05, y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Section */}
      <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
        <motion.div
          className="text-8xl"
          animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.icon}
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scale: 0, opacity: 0.2 }}
          animate={isHovered ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.2 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 gradient-text">{project.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
        <motion.button
          className="relative px-6 py-2 rounded-full overflow-hidden font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Learn More</span>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${project.color}`}
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: 0 } : { x: '-100%' }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-white/10" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="projects" className="relative py-32 bg-primary-dark/50">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Our Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: '🌾',
    title: 'Offline Multilingual LLM',
    description: 'Specially designed for farmers with support for multiple regional languages',
  },
  {
    icon: '📱',
    title: 'Fully On-Device',
    description: 'Runs completely offline without internet connectivity requirements',
  },
  {
    icon: '🧠',
    title: 'Multimodal RAG',
    description: 'Provides agriculture solutions using advanced retrieval-augmented generation',
  },
  {
    icon: '⚡',
    title: 'Native Embeddings',
    description: 'Built using optimized native embeddings and quantized models',
  },
  {
    icon: '💻',
    title: 'Low-Power Devices',
    description: 'Lightweight enough to run on resource-constrained hardware',
  },
  {
    icon: '🎯',
    title: 'Rural-First Design',
    description: 'Tailored specifically for the needs and constraints of rural communities',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass glass-hover rounded-2xl p-6 group cursor-pointer"
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <motion.div
        className="text-6xl mb-4"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-2xl font-bold mb-2 gradient-text">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  )
}

function TransformerDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const layers = [
    'Input Layer',
    'Embedding',
    'Self-Attention',
    'Feed Forward',
    'Output Layer',
  ]

  return (
    <div ref={ref} className="flex flex-col gap-4 items-center">
      {layers.map((layer, index) => (
        <motion.div
          key={layer}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            className={`glass rounded-xl px-8 py-4 ${
              layer === 'Self-Attention' ? 'border-2 border-accent-purple' : ''
            }`}
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: layer === 'Self-Attention'
                ? [
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                    '0 0 40px rgba(139, 92, 246, 0.6)',
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                  ]
                : undefined,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white font-semibold">{layer}</span>
          </motion.div>
          {index < layers.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="w-0.5 h-8 bg-gradient-to-b from-accent-blue to-accent-purple origin-top"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          About Our Mission
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>

          {/* Transformer Diagram */}
          <div className="flex items-center justify-center">
            <TransformerDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

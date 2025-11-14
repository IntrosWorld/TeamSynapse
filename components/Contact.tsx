'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
  ]

  return (
    <section id="contact" className="relative py-32 bg-primary-dark/50">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Get In Touch
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="relative w-full px-8 py-4 rounded-xl font-semibold overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {isSubmitted ? 'Message Sent! ✓' : 'Send Message'}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                  animate={
                    isSubmitted
                      ? { scale: [1, 1.5, 1] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Email */}
            <motion.div
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📧
              </motion.div>
              <h3 className="text-xl font-bold mb-2 gradient-text">Email</h3>
              <p className="text-gray-400">contact@teamsynapse.tech</p>
            </motion.div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-accent-blue transition-all"
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <span className="text-3xl">{link.icon}</span>
                  <span className="font-semibold">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            className="glass rounded-2xl p-8 text-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 212, 255, 0.5)',
                '0 0 60px rgba(139, 92, 246, 0.8)',
                '0 0 20px rgba(0, 212, 255, 0.5)',
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 360] }}
              transition={{ duration: 1 }}
            >
              ✨
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text">Message Sent!</h3>
            <p className="text-gray-400 mt-2">We'll get back to you soon.</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

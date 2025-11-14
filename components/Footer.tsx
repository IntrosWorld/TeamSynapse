'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-white/10 bg-primary-dark/80">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            className="text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            &copy; 2025{' '}
            <span className="gradient-text font-semibold">TeamSynapse</span>.
            Empowering rural communities through AI technology.
          </motion.p>
          <motion.p
            className="text-gray-500 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Built with ❤️ using Next.js, React Three Fiber, and Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

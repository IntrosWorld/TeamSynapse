'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Ultra-responsive spring animation for cursor - very snappy with minimal delay
  const springConfig = { damping: 20, stiffness: 700, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer glow */}
        <div className="relative">
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Inner glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(139, 92, 246, 0.6) 40%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-white"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[49] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </>
  )
}

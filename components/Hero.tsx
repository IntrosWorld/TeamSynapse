'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

// Animated 3D Neural Network
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(state.clock.getElapsedTime() + i) * 0.5
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Create particle system
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 20
    positions[i3 + 1] = (Math.random() - 0.5) * 20
    positions[i3 + 2] = (Math.random() - 0.5) * 20

    // Color gradient (blue to purple to cyan)
    const t = Math.random()
    if (t < 0.33) {
      colors[i3] = 0
      colors[i3 + 1] = 0.83
      colors[i3 + 2] = 1
    } else if (t < 0.66) {
      colors[i3] = 0.55
      colors[i3 + 1] = 0.36
      colors[i3 + 2] = 0.96
    } else {
      colors[i3] = 0.02
      colors[i3 + 1] = 0.71
      colors[i3 + 2] = 0.83
    }
  }

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central sphere */}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Orbiting spheres */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 5
        return (
          <Sphere
            key={i}
            args={[0.3, 32, 32]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 2,
              Math.sin(angle) * radius,
            ]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}
              emissive={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
            <NeuralNetwork />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
        >
          Offline AI for Rural Empowerment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto"
        >
          Meet the team behind India's first offline farmer-query LLM
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold glass rounded-full overflow-hidden"
          >
            <span className="relative z-10">Explore Projects</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-accent-blue rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-accent-blue rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

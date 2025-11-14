'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, Suspense, useMemo } from 'react'
import * as THREE from 'three'

// Enhanced Attention Matrix Heatmap
function AttentionHeatmap() {
  const meshRef = useRef<THREE.Group>(null)
  const cellRefs = useRef<THREE.Mesh[]>([])
  const gridSize = 12

  // Generate attention scores (simulating transformer attention)
  const attentionScores = useMemo(() => {
    const scores: number[][] = []
    for (let i = 0; i < gridSize; i++) {
      scores[i] = []
      for (let j = 0; j < gridSize; j++) {
        // Simulate attention pattern - diagonal gets more attention
        const distance = Math.abs(i - j)
        const baseScore = Math.exp(-distance / 2)
        scores[i][j] = baseScore + Math.random() * 0.3
      }
    }
    return scores
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    cellRefs.current.forEach((cell, index) => {
      if (!cell) return

      const i = Math.floor(index / gridSize)
      const j = index % gridSize

      // Animate attention scores
      const wave1 = Math.sin(time * 0.5 + i * 0.2)
      const wave2 = Math.cos(time * 0.3 + j * 0.2)
      const attention = (attentionScores[i][j] + wave1 * 0.2 + wave2 * 0.2) / 1.4

      // Update color based on attention score
      const material = cell.material as THREE.MeshStandardMaterial
      const color = new THREE.Color()

      if (attention < 0.33) {
        color.lerpColors(
          new THREE.Color('#000044'),
          new THREE.Color('#00d4ff'),
          attention * 3
        )
      } else if (attention < 0.66) {
        color.lerpColors(
          new THREE.Color('#00d4ff'),
          new THREE.Color('#8b5cf6'),
          (attention - 0.33) * 3
        )
      } else {
        color.lerpColors(
          new THREE.Color('#8b5cf6'),
          new THREE.Color('#06b6d4'),
          (attention - 0.66) * 3
        )
      }

      material.color = color
      material.emissive = color
      material.emissiveIntensity = attention * 0.8

      // Scale based on attention
      cell.scale.setScalar(0.8 + attention * 0.4)
    })

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, -5]}>
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const i = Math.floor(index / gridSize)
        const j = index % gridSize
        const x = (i - gridSize / 2) * 0.6
        const z = (j - gridSize / 2) * 0.6

        return (
          <mesh
            key={index}
            position={[x, 0, z]}
            ref={(el) => {
              if (el) cellRefs.current[index] = el
            }}
          >
            <boxGeometry args={[0.5, 0.1, 0.5]} />
            <meshStandardMaterial
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Enhanced Neural Network with connections
function EnhancedNeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.2
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.005

        // Pulse colors
        const pulse = (Math.sin(time * 2 + i) + 1) / 2
        colors[i] = pulse * 0.5
        colors[i + 1] = 0.8 + pulse * 0.2
        colors[i + 2] = 1
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.color.needsUpdate = true
    }

    // Animate connection lines
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(time) * 0.2
    }
  })

  // Create particles
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    const radius = 5 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    const colorChoice = Math.random()
    if (colorChoice < 0.33) {
      colors[i3] = 0; colors[i3 + 1] = 0.83; colors[i3 + 2] = 1
    } else if (colorChoice < 0.66) {
      colors[i3] = 0.55; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.96
    } else {
      colors[i3] = 0.02; colors[i3 + 1] = 0.71; colors[i3 + 2] = 0.83
    }
  }

  // Create connection lines
  const linePositions: number[] = []
  const nodeCount = 30
  const nodes: THREE.Vector3[] = []

  for (let i = 0; i < nodeCount; i++) {
    const radius = 6
    const theta = (i / nodeCount) * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    nodes.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    )
  }

  // Connect nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 5) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z)
        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }

  return (
    <group ref={groupRef}>
      {/* Particles */}
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
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={new Float32Array(linePositions)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Central pulsing sphere */}
      <Sphere args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Orbiting attention nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 6
        const height = Math.sin(angle * 3) * 2

        return (
          <Sphere key={i} args={[0.4, 32, 32]} position={[
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ]}>
            <meshStandardMaterial
              color={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}
              emissive={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </Sphere>
        )
      })}

      {/* Ultra-Realistic Wheat with Dense Heads */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2 + 0.5
        const radius = 8 + Math.sin(i * 0.7) * 0.4
        const height = Math.cos(angle * 2) * 3
        const scale = 0.9 + Math.random() * 0.2

        return (
          <group key={`wheat-${i}`} position={[
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ]} rotation={[0, angle, Math.sin(i * 1.5) * 0.12]} scale={scale}>
            {/* Segmented stalk */}
            {[0, 1, 2, 3].map((seg) => (
              <mesh key={`stalk-${seg}`} position={[0, -1.2 + seg * 0.8, 0]}>
                <cylinderGeometry args={[0.012 - seg * 0.002, 0.018 - seg * 0.002, 0.8, 16]} />
                <meshStandardMaterial
                  color="#C4B28A"
                  emissive="#9A8B5A"
                  emissiveIntensity={0.12}
                  roughness={0.8}
                  metalness={0.05}
                />
              </mesh>
            ))}

            {/* Dense grain head with 12 layers */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => {
              const yPos = 1.1 + j * 0.07
              const thickness = Math.max(0, 1 - j * 0.08)

              return (
                <group key={j} position={[0, yPos, 0]}>
                  {/* 4 grains per layer arranged in spiral */}
                  {[0, 1, 2, 3].map((side) => {
                    const sideAngle = (side / 4) * Math.PI * 2 + j * 0.5
                    return (
                      <mesh
                        key={side}
                        position={[
                          Math.cos(sideAngle) * 0.055 * thickness,
                          0,
                          Math.sin(sideAngle) * 0.055 * thickness
                        ]}
                        rotation={[0, sideAngle, j * 0.1]}
                      >
                        <capsuleGeometry args={[0.018, 0.1, 8, 12]} />
                        <meshStandardMaterial
                          color="#F5DEB3"
                          emissive="#FFD700"
                          emissiveIntensity={0.35}
                          roughness={0.9}
                          metalness={0.02}
                        />
                      </mesh>
                    )
                  })}
                  {/* 4 awns per layer */}
                  {[0, 1, 2, 3].map((k) => {
                    const awnAngle = (k / 4) * Math.PI * 2 + j * 0.5
                    return (
                      <mesh
                        key={`awn-${k}`}
                        position={[
                          Math.cos(awnAngle) * 0.055 * thickness,
                          0.05,
                          Math.sin(awnAngle) * 0.055 * thickness
                        ]}
                        rotation={[Math.PI / 9 + j * 0.03, awnAngle, 0]}
                      >
                        <cylinderGeometry args={[0.001, 0.002, 0.45, 4]} />
                        <meshStandardMaterial
                          color="#D4A574"
                          emissive="#E6BE8A"
                          emissiveIntensity={0.15}
                          transparent
                          opacity={0.8}
                        />
                      </mesh>
                    )
                  })}
                </group>
              )
            })}

            {/* Leaves */}
            {[0, 1].map((l) => (
              <mesh
                key={`leaf-${l}`}
                position={[0, -0.4 + l * 0.5, 0]}
                rotation={[Math.PI / 3.5, l * 2.2, 0]}
              >
                <planeGeometry args={[0.06, 0.5]} />
                <meshStandardMaterial
                  color="#8B9F6B"
                  emissive="#A3BE7A"
                  emissiveIntensity={0.08}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.88}
                  roughness={0.85}
                />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Ultra-Realistic Corn with Dense Kernels */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 + 1.5
        const radius = 9.5 + Math.cos(i * 0.9) * 0.3
        const height = Math.sin(angle * 2) * 2.5
        const scale = 0.95 + Math.random() * 0.1

        return (
          <group key={`corn-${i}`} position={[
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ]} rotation={[0, angle, Math.sin(i) * 0.08]} scale={scale}>
            {/* Main cob core with taper */}
            <mesh>
              <cylinderGeometry args={[0.14, 0.16, 2.0, 24]} />
              <meshStandardMaterial
                color="#F5E6B3"
                emissive="#FFD54F"
                emissiveIntensity={0.18}
                roughness={0.95}
              />
            </mesh>

            {/* Dense kernel pattern - 8 rows × 14 columns */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((col) => {
                const rowAngle = (row / 8) * Math.PI * 2
                const yPos = -0.9 + col * 0.135
                const radiusAtPos = 0.15 + Math.sin(col * 0.3) * 0.01

                return (
                  <mesh
                    key={`${row}-${col}`}
                    position={[
                      Math.cos(rowAngle) * radiusAtPos,
                      yPos,
                      Math.sin(rowAngle) * radiusAtPos
                    ]}
                    rotation={[0, rowAngle, 0]}
                  >
                    <boxGeometry args={[0.045, 0.12, 0.04]} />
                    <meshStandardMaterial
                      color="#FFE082"
                      emissive="#FFEB3B"
                      emissiveIntensity={0.25}
                      roughness={0.92}
                      metalness={0.01}
                    />
                  </mesh>
                )
              })
            )}

            {/* Multi-layer husks */}
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const huskAngle = (k / 6) * Math.PI * 2
              const huskOpen = k < 3 ? 0.12 : 0.08

              return (
                <mesh
                  key={`husk-${k}`}
                  position={[
                    Math.cos(huskAngle) * huskOpen,
                    0.2,
                    Math.sin(huskAngle) * huskOpen
                  ]}
                  rotation={[0, huskAngle, (k < 3 ? Math.PI / 10 : Math.PI / 14)]}
                >
                  <planeGeometry args={[0.38, 2.4]} />
                  <meshStandardMaterial
                    color={k < 3 ? "#A5D6A7" : "#9CCC65"}
                    emissive="#AED581"
                    emissiveIntensity={0.12}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={k < 3 ? 0.8 : 0.88}
                    roughness={0.9}
                  />
                </mesh>
              )
            })}

            {/* Silk strands - more realistic */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <mesh
                key={`silk-${s}`}
                position={[
                  Math.cos(s * 0.8) * 0.06,
                  1.05,
                  Math.sin(s * 0.8) * 0.06
                ]}
                rotation={[Math.PI / 12 + s * 0.15, s * 0.7, 0]}
              >
                <cylinderGeometry args={[0.002, 0.003, 0.35, 4]} />
                <meshStandardMaterial
                  color="#D4C5A9"
                  emissive="#E6D4BA"
                  emissiveIntensity={0.08}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            ))}

            {/* Stalk */}
            <mesh position={[0, -1.4, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.8, 12]} />
              <meshStandardMaterial
                color="#8BC34A"
                emissive="#9CCC65"
                emissiveIntensity={0.1}
                roughness={0.85}
              />
            </mesh>
          </group>
        )
      })}

      {/* Ultra-Realistic Rice with Full Panicles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + 2
        const radius = 10.5 + Math.sin(i * 1.1) * 0.3
        const height = Math.sin(angle * 4) * 3
        const scale = 0.9 + Math.random() * 0.15

        return (
          <group key={`rice-${i}`} position={[
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ]} rotation={[0, angle, 0]} scale={scale}>
            {/* Multi-segment stem */}
            {[0, 1, 2].map((seg) => (
              <mesh key={`stem-${seg}`} position={[0, -0.4 + seg * 0.8, 0]}>
                <cylinderGeometry args={[0.014 - seg * 0.002, 0.018 - seg * 0.002, 0.8, 12]} />
                <meshStandardMaterial
                  color="#7CB342"
                  emissive="#8BC34A"
                  emissiveIntensity={0.15}
                  roughness={0.85}
                />
              </mesh>
            ))}

            {/* Dense panicle with 12 grain clusters */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => {
              const panicleAngle = (j / 12) * Math.PI * 2
              const droop = j * 0.06 + 0.1
              const lengthFactor = 1 - j * 0.04

              return (
                <group key={j} position={[0, 1.1 - droop * 0.5, 0]}>
                  {/* Branch stem */}
                  <mesh
                    position={[
                      Math.cos(panicleAngle) * 0.08 * lengthFactor,
                      -droop * 0.8,
                      Math.sin(panicleAngle) * 0.08 * lengthFactor
                    ]}
                    rotation={[panicleAngle * 0.25 + Math.PI / 6, 0, panicleAngle]}
                  >
                    <cylinderGeometry args={[0.004, 0.006, 0.25 * lengthFactor, 4]} />
                    <meshStandardMaterial
                      color="#A5D6A7"
                      emissive="#AED581"
                      emissiveIntensity={0.12}
                      roughness={0.88}
                    />
                  </mesh>

                  {/* Multiple grains per branch */}
                  {[0, 1, 2].map((g) => (
                    <mesh
                      key={g}
                      position={[
                        Math.cos(panicleAngle + g * 0.3) * (0.12 + g * 0.02) * lengthFactor,
                        -droop - g * 0.04,
                        Math.sin(panicleAngle + g * 0.3) * (0.12 + g * 0.02) * lengthFactor
                      ]}
                      rotation={[Math.PI / 12, panicleAngle, 0]}
                    >
                      <capsuleGeometry args={[0.018, 0.07, 6, 10]} />
                      <meshStandardMaterial
                        color="#FFF9C4"
                        emissive="#FFEB3B"
                        emissiveIntensity={0.3}
                        roughness={0.92}
                        metalness={0.01}
                      />
                    </mesh>
                  ))}
                </group>
              )
            })}

            {/* Long leaves at different heights */}
            {[0, 1, 2, 3].map((l) => (
              <mesh
                key={`leaf-${l}`}
                position={[0, 0.3 + l * 0.45, 0]}
                rotation={[Math.PI / 3.2 + l * 0.1, l * 1.9, 0]}
              >
                <planeGeometry args={[0.12, 0.75]} />
                <meshStandardMaterial
                  color="#7CB342"
                  emissive="#8BC34A"
                  emissiveIntensity={0.15}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.92}
                  roughness={0.88}
                />
              </mesh>
            ))}

            {/* Additional blade leaves */}
            {[0, 1].map((b) => (
              <mesh
                key={`blade-${b}`}
                position={[0, 1.4 + b * 0.1, 0]}
                rotation={[Math.PI / 6, b * Math.PI, 0]}
              >
                <planeGeometry args={[0.08, 0.4]} />
                <meshStandardMaterial
                  color="#8BC34A"
                  emissive="#9CCC65"
                  emissiveIntensity={0.1}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.85}
                  roughness={0.9}
                />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced 3D Background - FIXED position makes it persist */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
            <pointLight position={[0, 10, 0]} intensity={1} color="#06b6d4" />
            <spotLight
              position={[0, 20, 0]}
              angle={0.5}
              penumbra={1}
              intensity={2}
              color="#00d4ff"
            />

            <EnhancedNeuralNetwork />
            <AttentionHeatmap />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block px-6 py-2 glass rounded-full mb-6">
            <span className="text-accent-cyan font-semibold">AI × Agriculture × Innovation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          style={{
            color: 'rgba(240, 240, 240, 0.85)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7), 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.15)'
          }}
        >
          Offline AI for
          <br />
          Rural Empowerment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{
            color: '#e0e0e0',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4)'
          }}
        >
          Meet the team behind <span className="gradient-text font-semibold">India's first offline farmer-query LLM</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold glass rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="relative z-10">Explore Projects</span>
            <motion.span
              className="relative z-10 text-2xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 212, 255, 0.3)',
                  '0 0 60px rgba(139, 92, 246, 0.6)',
                  '0 0 20px rgba(0, 212, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </a>

          <a
            href="#about"
            className="group inline-flex items-center gap-2 px-10 py-5 text-lg font-semibold border-2 border-white/20 rounded-full hover:border-accent-cyan hover:scale-105 transition-all"
          >
            <span>Learn More</span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ⚡
            </motion.span>
          </a>
        </motion.div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <p className="text-sm text-gray-500 mb-3">Powered by</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Transformers', 'RAG', 'Quantization', 'Offline-First', 'Multilingual'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="px-4 py-2 glass-hover rounded-lg text-sm font-medium text-gray-400"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
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

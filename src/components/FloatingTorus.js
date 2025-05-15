import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const TORUS_COUNT = 5
const START_Y = 3.35
const END_Y = 1.5
const SPEED = 0.025
const FADE_DISTANCE = 0.4
const OFFSET_STEP = 0.2

function AnimatedTorus({ initialOffset }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [y, setY] = useState(START_Y + initialOffset)
  const [isResetting, setIsResetting] = useState(false)

  useFrame(() => {
    let newY = y - SPEED

    // Fade out
    if (newY <= END_Y + FADE_DISTANCE && newY > END_Y) {
      const t = (newY - END_Y) / FADE_DISTANCE
      materialRef.current.opacity = t
    }

    // Reset
    if (newY <= END_Y && !isResetting) {
      setIsResetting(true)
      newY = START_Y
      materialRef.current.opacity = 0
    }

    // Fade in
    if (isResetting && materialRef.current.opacity < 1) {
      materialRef.current.opacity += 0.05
      if (materialRef.current.opacity >= 1) {
        materialRef.current.opacity = 1
        setIsResetting(false)
      }
    }

    // === Smooth Scaling ===
    // Map y from [4, 0] to scale from [1.2, 0.4]
    const minScale = 0.4
    const maxScale = 1.2
    const scaleT = (newY - END_Y) / (START_Y - END_Y) // normalized 0–1
    const scale = minScale + scaleT * (maxScale - minScale)

    // Apply transforms
    meshRef.current.position.y = newY
    meshRef.current.scale.set(scale, scale, scale)
    meshRef.current.rotation.x = Math.PI / 2

    setY(newY)
  })

  return (
    <mesh ref={meshRef} position={[0, y, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 100]} />
        <meshStandardMaterial
            ref={materialRef}
            color='orange'
            emissive='orange'             
            emissiveIntensity={2}        
            toneMapped={false}            
            transparent
            opacity={1}
        />

    </mesh>
  )
}

export default function AnimatedTorusGroup() {
  return (
    <>
      {Array.from({ length: TORUS_COUNT }).map((_, i) => (
        <AnimatedTorus key={i} initialOffset={-(i * OFFSET_STEP)} />
      ))}
    </>
  )
}

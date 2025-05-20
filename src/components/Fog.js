import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'

export default function FogSetup() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.Fog('#000000', 3, 40)
  }, [scene])

  return null
}

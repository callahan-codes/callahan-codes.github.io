import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

export default function Model({ scale, onClick, onHoverChange }) {
  const { scene } = useGLTF('/gltf/model.gltf');
  const fansRef = useRef({});

  // reference fans
  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      const fan = scene.getObjectByName(`Fan-${i}`);
      if (fan) {
        fansRef.current[`Fan-${i}`] = fan;
      } else {
        console.warn(`Fan-${i} not found in model`);
      }
    }
  }, [scene]);

  // animate fans
  useFrame(() => {
    for (let i = 1; i <= 6; i++) {
      const fan = fansRef.current[`Fan-${i}`];
      if (fan) {
        if (i <= 3) {
          fan.rotation.x += 0.2;
        } else {
          fan.rotation.y += 0.2;
        }
      }
    }
  });

  const handlePointerOver = () => {
    onHoverChange(true);
  };

  const handlePointerOut = () => {
    onHoverChange(false);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <primitive
      object={scene}
      scale={scale}
      position={[0, 1.5, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

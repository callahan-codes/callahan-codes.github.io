import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AnimateCamera({ animate }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // original position & target coords
  const fromPos = { x: -10, y: 3, z: 0 };
  const fromTarget = { x: 0, y: 4, z: 0 };
  const toPos = { x: -5, y: 0, z: 0 };
  const toTarget = { x: 10, y: 0, z: 10 };

  useEffect(() => {

    // check if orbit controls ref exists
    if (!controlsRef.current) return;

    // position/target to animate
    const pos = animate ? toPos : fromPos;
    const target = animate ? toTarget : fromTarget;

    // camera animaiton
    gsap.to(camera.position, {
      duration: 2,
      x: pos.x,
      y: pos.y,
      z: pos.z,
      ease: 'power2.inOut',
      onUpdate: () => controlsRef.current.update()
    });

    // target animation
    gsap.to(controlsRef.current.target, {
      duration: 2,
      x: target.x,
      y: target.y,
      z: target.z,
      ease: 'power2.inOut',
      onUpdate: () => controlsRef.current.update()
    });
  }, [animate, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

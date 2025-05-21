import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function IFrame() {
  const [visible, setVisible] = useState(true);
  const occluderRef = useRef();

  return (
    <group position={[1.05, 5.2, 0]} rotation={[0, Math.PI / 2, 0]}>

      <mesh ref={occluderRef}>
        <planeGeometry args={[3.2, 1.8]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} visible={false} />
      </mesh>

      <Html
        transform
        scale={0.15}
        position={[0, 0, 0.01]}
        rotation={[0, Math.PI, 0]}
        occlude={[occluderRef]}
        onOcclude={setVisible}
      >

        <div style={{ display: visible ? 'block' : 'none' }}>
          <iframe
            src="https://callahan-codes.github.io/OS/"
            width="835"
            height="470"
            style={{
              border: 'none',
              pointerEvents: visible ? 'auto' : 'none',
            }}
          />
        </div>  

      </Html>
    </group>
  );
}

// App.js
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

import { useState } from 'react';
import CubeGrid from './components/CubeGrid'; // Import CubeGrid component
import Model from './components/Model'; // Your existing Model component
import AnimateCamera from './components/AnimateCamera'; // Assuming you have the AnimateCamera component

function App() {
  const [animateCamera, setAnimateCamera] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [-6, 5, 0] }}>
        {/* Ambient and directional lights */}
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />

        {/* The CubeGrid component that contains the animated cubes */}
        <CubeGrid gridSize={15} cubeSize={1} />

        {/* The Model component that handles model rendering */}
        <Model scale={1} onHoverChange={setAnimateCamera} />

        {/* The AnimateCamera component, animated based on hover */}
        {/* <AnimateCamera animate={animateCamera} /> */}

        {/* Environment settings */}
        <Environment preset="sunset" />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
      </Canvas>
    </div>
  );
}

export default App;

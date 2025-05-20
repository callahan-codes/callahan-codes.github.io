import './App.css';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import CubeGrid from './components/CubeGrid'; 
import Model from './components/Model'; 
import AnimateCamera from './components/AnimateCamera';
import AnimatedTorusGroup from './components/FloatingTorus';
import IFrame from './components/IFrame';
import FogSetup from './components/Fog';
import SceneBloom from './components/Bloom';

function App() {
  const [animateCamera, setAnimateCamera] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas camera={{ position: [-10, 5, 0] }}>

      <FogSetup/>
      <directionalLight
        position={[-5, 5, 5]}
        intensity={3}
        castShadow
      />
      
        <CubeGrid gridSize={75} cubeSize={1} />
        <Model scale={1} onHoverChange={setAnimateCamera} />
        <IFrame/>
        <AnimatedTorusGroup />

        <SceneBloom/>
        <AnimateCamera animate={animateCamera} />

      </Canvas>
    </div>
  );
}

export default App;

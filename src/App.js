// App.js
import './App.css';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import CubeGrid from './components/CubeGrid'; // Import CubeGrid component
import Model from './components/Model'; // Your existing Model component
import AnimateCamera from './components/AnimateCamera'; // Assuming you have the AnimateCamera component
import AnimatedTorusGroup from './components/FloatingTorus';
import IFrame from './components/IFrame';
import SceneBloom from './components/Bloom';

function App() {
  const [animateCamera, setAnimateCamera] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [-10, 5, 0] }}>

        <ambientLight />

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

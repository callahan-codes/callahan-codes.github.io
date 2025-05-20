import './App.css';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { useProgress } from '@react-three/drei';
import CubeGrid from './components/CubeGrid'; 
import Model from './components/Model'; 
import AnimateCamera from './components/AnimateCamera';
import AnimatedTorusGroup from './components/FloatingTorus';
import IFrame from './components/IFrame';
import FogSetup from './components/Fog';
import SceneBloom from './components/Bloom';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [animateCamera, setAnimateCamera] = useState(false);
  const [isHoveringModel, setIsHoveringModel] = useState(false);
  const { progress } = useProgress(); // progress is a number from 0 to 100

  const handleModelClick = () => {
    setAnimateCamera((prev) => !prev); 
  };

  return (
    <>
      {progress < 100 && <LoadingScreen />}

      <div
        style={{
          width: '100vw',
          height: '100vh',
          cursor: isHoveringModel ? 'pointer' : 'default',
        }}
      >
        <Canvas camera={{ position: [-10, 5, 0] }}>
          <FogSetup />
          <directionalLight position={[-5, 5, 5]} intensity={3} castShadow />
          <CubeGrid gridSize={75} cubeSize={1} />
          <Model
            scale={1}
            onClick={handleModelClick}
            onHoverChange={setIsHoveringModel}
          />
          <IFrame />
          <AnimatedTorusGroup />
          <SceneBloom />
          <AnimateCamera animate={animateCamera} />
        </Canvas>
      </div>
    </>
  );
}

export default App;

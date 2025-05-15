// components/Model.js
import { useGLTF } from '@react-three/drei';

export default function Model({ scale, onHoverChange }) {
  const { scene } = useGLTF('/gltf/model.gltf');

  const handlePointerOver = (e) => {
    if (e.object.name === 'Monitor_Base') {
      onHoverChange(true);
    }
  };

  const handlePointerOut = (e) => {
    if (e.object.name === 'Monitor_Base') {
      onHoverChange(false);
    }
  };

  return (
    <primitive
      object={scene}
      scale={scale}
      position={[0, 1.5, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

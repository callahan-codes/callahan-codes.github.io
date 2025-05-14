import { useGLTF } from '@react-three/drei';

export default function Model({ scale, onHoverChange }) {
  const { scene } = useGLTF('/gltf/model.gltf');

  return (
    <primitive
      object={scene}
      scale={scale}
      onPointerOver={() => onHoverChange(true)}
      onPointerOut={() => onHoverChange(false)}
    />
  );
}
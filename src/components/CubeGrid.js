// components/CubeGrid.js
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CubeGrid = ({ gridSize = 15, cubeSize = 1 }) => {
  const { scene, camera } = useThree();

  const instancedMeshRef = useRef();
  const moveSpeedsRef = useRef([]);

  useEffect(() => {
    // Create geometry and material only once
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // Create an InstancedMesh with the gridSize * gridSize instances
    const instancedMesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize);
    scene.add(instancedMesh);
    instancedMeshRef.current = instancedMesh;

    // Initialize movement speeds for each cube
    const moveSpeeds = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      moveSpeeds.push(Math.random() * 0.0002 + 0.0001);
    }
    moveSpeedsRef.current = moveSpeeds;

    // Set initial positions of cubes using matrix transformations
    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          new THREE.Vector3(
            i * cubeSize - (gridSize * cubeSize) / 2,
            (j * cubeSize - (gridSize * cubeSize) / 2) - 5,
            0
          )
        );
        instancedMesh.setMatrixAt(index, matrix);
        index++;
      }
    }

    // Update all instances each frame
    instancedMesh.instanceMatrix.needsUpdate = true;
  }, [gridSize, cubeSize, scene]);

  // Mouse movement effect to adjust the camera position
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;  // Normalize -1 to 1
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize -1 to 1
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Frame animation logic
  useFrame(() => {
    // Update camera position based on mouse movement
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 2 - camera.position.y) * 0.05;

    // Animate cubes up and down using instancing
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const scale = new THREE.Vector3();

    for (let i = 0; i < gridSize * gridSize; i++) {
      const speed = moveSpeedsRef.current[i];
      const matrix = new THREE.Matrix4();
      instancedMeshRef.current.getMatrixAt(i, matrix);

      // Decompose matrix into position, rotation, and scale
      matrix.decompose(position, rotation, scale);

      // Apply sin-based animation to the Z position of each cube
      position.z = Math.sin(Date.now() * speed) * 1.2;

      // Update the position of the instance
      matrix.setPosition(position);
      instancedMeshRef.current.setMatrixAt(i, matrix);
    }

    // Mark that instance matrices need an update to reflect the changes
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return null;
};

export default CubeGrid;

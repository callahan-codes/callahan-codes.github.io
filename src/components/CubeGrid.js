// components/CubeGrid.js
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CubeGrid = ({ gridSize = 15, cubeSize = 1 }) => {
  const { scene } = useThree();

  const instancedMeshRef = useRef();
  const moveSpeedsRef = useRef([]);

  useEffect(() => {
    // Create cube geometry and material (used for all instances)
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000 });

    // Create the instanced mesh and add it to the scene
    const instancedMesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize);
    scene.add(instancedMesh);
    instancedMeshRef.current = instancedMesh;

    // Generate random movement speeds for each cube instance
    const moveSpeeds = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      moveSpeeds.push(Math.random() * 0.0002 + 0.0001);
    }
    moveSpeedsRef.current = moveSpeeds;

    // Position each cube in a grid layout on the XZ plane (like a floor)
    let index = 0;
    for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
        new THREE.Vector3(
            i * cubeSize - (gridSize * cubeSize) / 2, // X position
            -10,                                      // Y position (lowered to -10)
            j * cubeSize - (gridSize * cubeSize) / 2  // Z position
        )
        );
        instancedMesh.setMatrixAt(index, matrix);
        index++;
    }
    }


    // Mark matrices for update
    instancedMesh.instanceMatrix.needsUpdate = true;
  }, [gridSize, cubeSize, scene]);

    useFrame(() => {
        const instancedMesh = instancedMeshRef.current;
        if (!instancedMesh) return; // Skip frame if not ready

        const position = new THREE.Vector3();
        const rotation = new THREE.Euler();
        const scale = new THREE.Vector3();

        for (let i = 0; i < gridSize * gridSize; i++) {
            const speed = moveSpeedsRef.current[i];
            const matrix = new THREE.Matrix4();

            instancedMesh.getMatrixAt(i, matrix);
            matrix.decompose(position, rotation, scale);

            position.y = Math.sin(Date.now() * speed) * 0.65;
            matrix.setPosition(position);
            instancedMesh.setMatrixAt(i, matrix);
        }

        instancedMesh.instanceMatrix.needsUpdate = true;
    });


  return null;
};

export default CubeGrid;

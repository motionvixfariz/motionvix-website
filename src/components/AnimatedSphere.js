// src/components/AnimatedSphere.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function AnimatedSphere() {
  const ref = useRef();

  // Animate the sphere on each frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#8A2BE2" // A vibrant color for the sphere
        attach="material"
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
}
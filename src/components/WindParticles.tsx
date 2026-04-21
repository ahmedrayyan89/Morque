"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


export default function WindParticles({ count = 500 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Create random positions and speeds for the wind particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        // Random spread, prioritizing outer edges to avoid clipping through the center car
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 50;
      const speed = 0.2 + Math.random() * 0.5;
      
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      // Move particle along Z axis
      p.z += p.speed;

      // Wrap around
      if (p.z > 25) {
        p.z = -25;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(1, 1, Math.random() * 5 + 2); // stretch to look like lines
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.02, 0.02, 1]} />
        <meshBasicMaterial 
            color="#00f0ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
        />
        </instancedMesh>
    </group>
  );
}

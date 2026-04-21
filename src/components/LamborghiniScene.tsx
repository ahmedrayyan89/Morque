"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { LamborghiniCar } from "./LamborghiniCar";
import { AeroEffects } from "./AeroEffects";

export default function LamborghiniScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 25 }}
      >
        {/* Brand dark background */}
        <color attach="background" args={["#06080c"]} />

        <Suspense fallback={null}>
          {/* ─── The Car ─── */}
          <LamborghiniCar rotation={[0, Math.PI / 1.5, 0]} scale={0.015} />

          {/* ─── Lighting ─── */}
          <hemisphereLight intensity={0.5} />

          {/* Soft contact shadow underneath the car */}
          <ContactShadows
            resolution={1024}
            frames={1}
            position={[0, -1.16, 0]}
            scale={15}
            blur={0.5}
            opacity={1}
            far={20}
          />

          {/* ─── Reflective floor ─── */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050709"
              metalness={0.8}
            />
          </mesh>

          {/* ─── Decorative floor geometry (from original demo) ─── */}
          <mesh
            scale={4}
            position={[3, -1.161, -1.5]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.9, 1, 4, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>
          <mesh
            scale={4}
            position={[-3, -1.161, -1]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.9, 1, 3, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>

          {/* ─── Dynamic Environment Map ─── */}
          {/* Everything in here is captured by a cubemap camera and applied
              as reflections to the car body — this is the magic sauce */}
          <Environment resolution={512}>
            {/* Ceiling strip lights */}
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]}  scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]}  scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]}  scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]}  scale={[10, 1, 1]} />
            {/* Side fill lights */}
            <Lightformer intensity={2} rotation-y={Math.PI / 2}  position={[-50, 2, 0]} scale={[100, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]}  scale={[100, 2, 1]} />
            {/* Hot red key rim light */}
            <Lightformer
              form="ring"
              color="red"
              intensity={10}
              scale={2}
              position={[10, 5, 10]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
          </Environment>

          {/* ─── Post Processing ─── */}
          <AeroEffects />

          {/* ─── Controls — horizontal orbit only ─── */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

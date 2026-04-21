"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { applyProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

/*
 * Lamborghini Urus — Steven Grey (https://sketchfab.com/Steven007)
 * License: CC-BY-NC-4.0 — adapted for use in the Morque AERO section.
 * Ported from: https://codesandbox.io/p/sandbox/e662p3
 */
export function LamborghiniCar(props: any) {
  const { scene, nodes, materials } = useGLTF("/models/lambo.glb") as any;

  useMemo(() => {
    // Iterate over every mesh in the model and fix known issues
    Object.values(nodes).forEach((node: any) => {
      if (node.isMesh) {
        // Glass normals are messed up in original due to compression — recompute
        if (node.name.startsWith("glass"))
          node.geometry.computeVertexNormals();
        // Brake disc logo is too dark — lighten it
        if (node.name === "silver_001_BreakDiscs_0")
          node.material = applyProps(materials.BreakDiscs.clone(), {
            color: "#ddd",
          });
      }
    });

    // Windows need to be inset further
    if (nodes["glass_003"]) nodes["glass_003"].scale.setScalar(2.7);

    // Inner frame — darken and add metalness
    if (materials.FrameBlack)
      applyProps(materials.FrameBlack, {
        metalness: 0.75,
        roughness: 0,
        color: "black",
      });

    // Wheels — chrome → black matte
    if (materials.Chrome)
      applyProps(materials.Chrome, { metalness: 1, roughness: 0, color: "#333" });
    if (materials.BreakDiscs)
      applyProps(materials.BreakDiscs, {
        metalness: 0.2,
        roughness: 0.2,
        color: "#555",
      });
    if (materials.TiresGum)
      applyProps(materials.TiresGum, {
        metalness: 0,
        roughness: 0.4,
        color: "#181818",
      });
    if (materials.GreyElements)
      applyProps(materials.GreyElements, { metalness: 0, color: "#292929" });

    // Make front + tail LEDs emissive
    if (materials.emitbrake)
      applyProps(materials.emitbrake, { emissiveIntensity: 3, toneMapped: false });
    if (materials.LightsFrontLed)
      applyProps(materials.LightsFrontLed, {
        emissiveIntensity: 3,
        toneMapped: false,
      });

    // Body paint — yellow → gloss black with clearcoat (automotive lacquer look)
    if (nodes.yellow_WhiteCar_0) {
      nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
        roughness: 0.3,
        metalness: 0.05,
        color: "#111",
        envMapIntensity: 0.75,
        clearcoatRoughness: 0,
        clearcoat: 1,
      });
    }
  }, [nodes, materials]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/lambo.glb");

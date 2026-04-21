"use client";

import { useLoader } from "@react-three/fiber";
import { EffectComposer, Bloom, LUT } from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";

/*
 * Post-processing pipeline for the AERO section.
 * Bloom makes the LEDs and emissive surfaces glow.
 * LUT applies the F-6800-STD cinematic color grade (warm shadows, cool highlights).
 */
export function AeroEffects() {
  const lut = useLoader(LUTCubeLoader, "/F-6800-STD.cube") as any;

  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom
        luminanceThreshold={0.2}
        mipmapBlur
        luminanceSmoothing={0}
        intensity={1.75}
      />
      <LUT lut={lut} />
    </EffectComposer>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

// Dynamically import — Canvas cannot run on the server
const LamborghiniScene = dynamic(
  () => import("@/components/LamborghiniScene"),
  { ssr: false }
);

export default function AeroPage() {
  return (
    <main className="relative w-full h-screen bg-[#06080c] overflow-hidden">
      <CustomCursor />
      <FilmGrain />
      <Navbar />

      {/* The full-bleed 3D canvas */}
      <Suspense fallback={null}>
        <LamborghiniScene />
      </Suspense>

      {/* ── Brand overlay — sits on top of the canvas ── */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between px-8 md:px-16 py-10 md:py-16">

        {/* Top-left section label */}
        <div className="flex items-center gap-4 pt-20">
          <div className="w-6 h-[1px] bg-cyan-glow/60" />
          <span className="text-[10px] tracking-[0.5em] text-cyan-glow/60 uppercase font-medium">
            Section 02 — Active Aerodynamics
          </span>
        </div>

        {/* Bottom section — specs + title */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">

          {/* Large ghost AERO text */}
          <h1 className="text-[8rem] md:text-[14rem] leading-none font-bold tracking-tighter uppercase text-white/[0.04] select-none pointer-events-none">
            AERO
          </h1>

          {/* Right side — spec stack */}
          <div className="flex flex-col items-end gap-4 pb-2">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                Drag Coefficient
              </span>
              <span className="text-2xl font-bold text-white/80 tracking-tight">
                0.29 <span className="text-sm font-normal text-white/40">Cd</span>
              </span>
            </div>
            <div className="w-24 h-[1px] bg-steel-blue/30" />
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                Peak Downforce
              </span>
              <span className="text-2xl font-bold text-white/80 tracking-tight">
                285 <span className="text-sm font-normal text-white/40">kg</span>
              </span>
            </div>
            <div className="w-24 h-[1px] bg-steel-blue/30" />
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                Tested at
              </span>
              <span className="text-2xl font-bold text-cyan-glow/80 tracking-tight">
                340 <span className="text-sm font-normal text-cyan-glow/40">km/h</span>
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal rule + caption */}
        <div className="flex items-center gap-6 pb-2">
          <div className="flex-1 h-[1px] bg-white/5" />
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">
            Drag to rotate · All aerodynamics data from tunnel simulation
          </p>
        </div>
      </div>
    </main>
  );
}

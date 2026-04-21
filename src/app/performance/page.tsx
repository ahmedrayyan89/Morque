"use client";

import { useEffect, useRef, useState } from "react";
import { useVanta } from "@/lib/useVanta";
import Navbar from "@/components/Navbar";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";

// Animated counter hook
function useCounter(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { value: 1250, suffix: "", label: "Horsepower", sub: "Naturally aspirated V10" },
  { value: 367, suffix: "", label: "Top Speed", sub: "km/h — electronically limited" },
  { value: 1100, suffix: "", label: "Peak Torque", sub: "Newton-metres at 6,500 rpm" },
  { value: 2, suffix: ".1G", label: "Lateral G-Force", sub: "Peak cornering load" },
  { value: 128, suffix: "", label: "Power-to-Weight", sub: "hp per 100 kg unladen" },
  { value: 68, suffix: "", label: "Shift Time", sub: "milliseconds — paddle-shift" },
];

function StatCard({ stat, index, started }: { stat: typeof stats[0]; index: number; started: boolean }) {
  const count = useCounter(stat.value, 1600 + index * 100, started);
  return (
    <motion.div
      className="flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 + 0.5, duration: 0.6, ease: "easeOut" as const }}
    >
      <div className="relative">
        <span className="text-5xl md:text-7xl font-bold tabular-nums text-white/95 leading-none tracking-tight">
          {count}
          <span className="text-cyan-glow">{stat.suffix}</span>
        </span>
      </div>
      <div className="mt-3 w-8 h-[1px] bg-cyan-glow/40" />
      <div className="mt-3 text-[10px] tracking-[0.4em] uppercase text-white/60 font-semibold">
        {stat.label}
      </div>
      <div className="mt-1 text-[10px] tracking-wide text-white/25 font-light max-w-[140px]">
        {stat.sub}
      </div>
    </motion.div>
  );
}

export default function PerformancePage() {
  const containerRef = useVanta({
    effect: "dots",
    options: {
      backgroundColor: 0x06080c,
      color: 0x00c8ff,
      color2: 0x0050ff,
      size: 2.5,
      spacing: 38,
      showLines: true,
      mouseControls: true,
      touchControls: true,
    },
  });

  const [started, setStarted] = useState(false);
  useEffect(() => {
    // Kick off counters after a short load delay
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#06080c] overflow-hidden">
      <CustomCursor />
      <FilmGrain />
      <Navbar />

      {/* Vanta canvas container */}
      <div ref={containerRef} className="fixed inset-0 z-0" />

      {/* Radial dark vignette — keeps center bright, edges dark */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #06080c 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16">
        <div className="max-w-screen-xl mx-auto w-full">

          {/* ── Header ── */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-6 h-[1px] bg-cyan-glow/60" />
              <span className="text-[10px] tracking-[0.5em] text-cyan-glow/60 uppercase font-medium">
                Section 04 — Performance
              </span>
              <div className="w-6 h-[1px] bg-cyan-glow/60" />
            </div>

            {/* Hero 0-100 stat */}
            <div className="relative mb-4">
              <h1
                className="text-[10rem] md:text-[18rem] leading-none font-bold tracking-tighter text-white/[0.04] select-none pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                PERFORMANCE
              </h1>
              <div className="relative flex flex-col items-center gap-2 py-6">
                <span className="text-[10px] tracking-[0.5em] uppercase text-white/30">Zero to one hundred</span>
                <div className="flex items-end gap-3">
                  <span className="text-8xl md:text-[10rem] font-bold leading-none text-white/95 tracking-tighter">
                    2.7
                  </span>
                  <span className="text-4xl md:text-6xl font-light text-cyan-glow mb-3">s</span>
                </div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/25">
                  0 — 100 km/h · Full aerodynamic downforce
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Stats grid ── */}
          <div className="border-t border-white/[0.06] pt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} started={started} />
              ))}
            </div>
          </div>

          {/* ── Bottom label ── */}
          <motion.div
            className="flex items-center gap-6 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 whitespace-nowrap">
              All figures measured at 1,050m altitude · FIA homologation pending Q3 2026
            </p>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
          </motion.div>
        </div>
      </div>
    </main>
  );
}

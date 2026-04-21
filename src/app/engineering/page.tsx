"use client";

import { useVanta } from "@/lib/useVanta";
import Navbar from "@/components/Navbar";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";

const specCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Carbon Monocoque",
    stat: "1,040 kg",
    label: "Dry Weight",
    desc: "Full carbon-fibre tub with titanium roll cage integration. Aerospace-grade layup, zero compromise.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    title: "Carbon-Ceramic Brakes",
    stat: "1,200°C",
    label: "Thermal Rating",
    desc: "Six-piston monoblock calipers. Fade-free from cold start to track limit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Dry-Sump Engine",
    stat: "2.1G",
    label: "Max Cornering",
    desc: "Flat-plane V10 with force-fed lubrication. Oil starvation is not in its vocabulary.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: "Active Suspension",
    stat: "22 mm",
    label: "Adaptive Travel",
    desc: "Magnetorheological dampers responding in 2ms. The road becomes irrelevant.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M8 7V5a4 4 0 018 0v2" />
      </svg>
    ),
    title: "Sequential Gearbox",
    stat: "68 ms",
    label: "Shift Time",
    desc: "8-speed paddle-shift transaxle. Every ratio calibrated for the next corner.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
    title: "PTFE Intake Lining",
    stat: "0%",
    label: "Airflow Resistance",
    desc: "Frictionless coated intake manifold. The engine breathes like it has no lungs.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function EngineeringPage() {
  const containerRef = useVanta({
    effect: "net",
    options: {
      backgroundColor: 0x06080c,
      color: 0x00c8ff,
      points: 9,
      maxDistance: 22,
      spacing: 18,
      showDots: false,
      mouseControls: true,
      touchControls: true,
    },
  });

  return (
    <main className="relative min-h-screen bg-[#06080c] overflow-hidden">
      <CustomCursor />
      <FilmGrain />
      <Navbar />

      {/* Vanta canvas container */}
      <div ref={containerRef} className="fixed inset-0 z-0" />

      {/* Gradient vignette over Vanta to keep text readable */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#06080c]/90 via-[#06080c]/30 to-[#06080c]/10" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 pt-28 pb-16">
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Hero copy ── */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-[1px] bg-cyan-glow/60" />
              <span className="text-[10px] tracking-[0.5em] text-cyan-glow/60 uppercase font-medium">
                Section 03 — Engineering
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white/95 uppercase">
              Precision<br />
              engineered<br />
              <span className="text-cyan-glow">at every<br />atom.</span>
            </h1>

            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-md">
              Every component on the Morque is subjected to 10,000-cycle fatigue simulation before a single prototype part is cut. We don&apos;t iterate in public.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white/90">47</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Carbon components</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white/90">3.2k</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Engineering hours</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-cyan-glow">100%</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Handbuilt</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Spec cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="group relative p-5 rounded-sm border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-cyan-glow/30 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-cyan-glow/70 group-hover:text-cyan-glow transition-colors duration-300">
                    {card.icon}
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white/90 leading-none">{card.stat}</div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 mt-0.5">{card.label}</div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-2">
                  {card.title}
                </h3>

                {/* Desc */}
                <p className="text-xs text-white/35 leading-relaxed font-light">
                  {card.desc}
                </p>

                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-glow/0 group-hover:bg-cyan-glow/40 transition-all duration-500 rounded-b-sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function StoryCopy() {
  const { scrollYProgress } = useScroll();

  // Intro: 0% to 10%
  const introOp = useTransform(scrollYProgress, [0, 0.05, 0.08, 0.1], [1, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const introDisplay = useTransform(scrollYProgress, (p) => p > 0.12 ? "none" : "flex");

  // Act 1 (Aero): 12% to 30%
  const aeroOp = useTransform(scrollYProgress, [0.12, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const aeroY = useTransform(scrollYProgress, [0.12, 0.15, 0.3], [50, 0, -50]);
  const aeroDisplay = useTransform(scrollYProgress, (p) => p < 0.1 || p > 0.32 ? "none" : "flex");

  // Act 2 (Materialization): 35% to 55%
  const matOp = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const matY = useTransform(scrollYProgress, [0.35, 0.4, 0.55], [50, 0, -50]);
  const matDisplay = useTransform(scrollYProgress, (p) => p < 0.32 || p > 0.58 ? "none" : "flex");

  // Act 3 (Hero): 60% to 80%
  const heroOp = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0.6, 0.65, 0.8], [50, 0, -50]);
  const heroDisplay = useTransform(scrollYProgress, (p) => p < 0.58 || p > 0.82 ? "none" : "flex");

  // Act 4 (Launch / CTA): 90% to 100%
  const launchOp = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const launchY = useTransform(scrollYProgress, [0.85, 0.9, 1], [50, 0, 0]);
  const launchDisplay = useTransform(scrollYProgress, (p) => p < 0.82 ? "none" : "flex");

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center p-6 md:p-12">
      
      {/* Intro */}
      <motion.div 
        className="absolute text-center flex-col items-center justify-center space-y-2 max-w-3xl"
        style={{ opacity: introOp, y: introY, display: introDisplay }}
      >
        <span className="text-cyan-glow tracking-[0.4em] text-xs font-bold uppercase drop-shadow-[0_0_10px_rgba(0,200,255,0.5)]">
          Project 001
        </span>
        <h1 className="text-7xl md:text-9xl font-signature font-light tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Morque
        </h1>
        <div className="pt-4 space-y-4">
          <p className="text-xl md:text-3xl font-medium tracking-wide text-ice-white/90">
            Engineered in the wind.<br />Perfected in silence.
          </p>
          <p className="text-sm md:text-base text-white/55 font-light tracking-[0.2em] uppercase max-w-xl leading-relaxed">
            Every surface tested.<br />Every gram justified.<br />Every kilometer inevitable.
          </p>
        </div>
      </motion.div>

      {/* Aerodynamics */}
      <motion.div 
        className="absolute left-6 md:left-24 max-w-xl space-y-6 flex-col"
        style={{ opacity: aeroOp, y: aeroY, display: aeroDisplay }}
      >
        <div className="w-12 h-[1px] bg-cyan-glow/50 mb-8" />
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/95 uppercase">
          Air doesn&apos;t lie.
        </h2>
        <p className="text-lg md:text-2xl font-medium text-ice-white/80">
          Ten million simulations. One perfect form.
        </p>
        <p className="text-sm md:text-lg text-white/55 font-light leading-relaxed tracking-wide">
          Every surface, every vent, every crease exists because the wind demanded it.
        </p>
      </motion.div>

      {/* Materialization */}
      <motion.div 
        className="absolute right-6 md:right-24 max-w-xl text-right space-y-6 flex-col items-end"
        style={{ opacity: matOp, y: matY, display: matDisplay }}
      >
        <div className="w-12 h-[1px] bg-steel-blue/50 mb-8" />
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/95 uppercase">
          Carbon.<br/>Titanium.<br/>Obsession.
        </h2>
        <p className="text-lg md:text-2xl font-medium text-ice-white/80">
          A monocoque chassis born from aerospace engineering.
        </p>
        <p className="text-sm md:text-lg text-white/55 font-light leading-relaxed tracking-wide">
          Lighter than what came before.<br/>Stronger than anything beside it.
        </p>
      </motion.div>

      {/* Hero Money Shot */}
      <motion.div 
        className="absolute bottom-12 md:bottom-24 text-center flex-col items-center justify-center space-y-4 max-w-4xl"
        style={{ opacity: heroOp, y: heroY, display: heroDisplay }}
      >
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide text-white/95 uppercase">
          This is what 1,000 hours of<br/>wind tunnel testing looks like.
        </h2>
        <p className="text-sm md:text-lg text-cyan-glow/80 font-medium tracking-[0.2em] uppercase">
          Active aerodynamics. Real-time downforce management. Zero drag compromise.
        </p>
      </motion.div>

      {/* Launch / CTA */}
      <motion.div 
        className="absolute text-center flex-col items-center justify-center space-y-8 max-w-4xl p-12 md:p-24"
        style={{ opacity: launchOp, y: launchY, display: launchDisplay }}
      >
        <div className="space-y-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/95 uppercase">
            The tunnel is where<br/>legends are made.
          </h2>
          <p className="text-4xl md:text-5xl tracking-[0.2em] font-light text-cyan-glow drop-shadow-[0_0_15px_rgba(0,200,255,0.4)] my-4 uppercase">
            Designed By<br/>Rayyan Ahmed
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto mt-8">
          <button className="px-10 py-4 bg-ice-white text-steel-dark text-sm font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(232,244,255,0.3)] hover:shadow-[0_0_30px_rgba(232,244,255,0.6)]">
            Explore Aerodynamics
          </button>
          
          <button className="px-10 py-4 bg-transparent border border-steel-blue/50 text-ice-white text-sm font-medium uppercase tracking-[0.2em] rounded-sm hover:border-cyan-glow hover:text-cyan-glow transition-all duration-300">
            Explore Engineering
          </button>
        </div>
      </motion.div>
    </div>
  );
}

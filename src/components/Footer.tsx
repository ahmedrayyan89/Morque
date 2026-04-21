"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  // Reveal footer gracefully ONLY between 95% and 100% scroll
  const opacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.95, 1], [30, 0]);

  return (
    <motion.footer 
      className="fixed bottom-0 w-full z-20 pointer-events-auto flex flex-col md:flex-row items-center justify-between px-8 py-6 border-t border-steel-blue/10 bg-steel-dark/60 backdrop-blur-xl"
      style={{ opacity, y }}
    >
      <div className="flex gap-8 text-xs font-medium text-white/40 uppercase tracking-widest">
        <MagneticButton>
          <Link href="#" className="hover:text-ice-white transition-colors">Privacy</Link>
        </MagneticButton>
        <MagneticButton>
          <Link href="#" className="hover:text-ice-white transition-colors">Terms</Link>
        </MagneticButton>
      </div>

      <div className="mt-4 md:mt-0 text-[10px] text-white/20 uppercase tracking-[0.3em]">
        © 2026 MORQUE AUTOMOTIVE INC.
      </div>
      
      <div className="hidden md:flex gap-8 text-xs font-bold text-cyan-glow uppercase tracking-widest">
        <MagneticButton>
          <Link href="#" className="hover:text-ice-white transition-colors">Instagram</Link>
        </MagneticButton>
        <MagneticButton>
          <Link href="#" className="hover:text-ice-white transition-colors">X (Twitter)</Link>
        </MagneticButton>
      </div>
    </motion.footer>
  );
}

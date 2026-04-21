"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const links = ["Overview", "Aero", "Engineering", "Performance"];

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Transform width, top, and border radius over the first 300px of scroll
  const navWidth = useTransform(scrollY, [0, 300], ["100%", "720px"]);
  const navTop = useTransform(scrollY, [0, 300], ["0px", "24px"]);
  const navRadius = useTransform(scrollY, [0, 300], ["0px", "99px"]);
  
  const navBg = useTransform(scrollY, [0, 300], ["rgba(8, 12, 18, 0)", "rgba(8, 12, 18, 0.65)"]);
  const navBorder = useTransform(scrollY, [0, 300], ["1px solid rgba(74, 127, 165, 0)", "1px solid rgba(74, 127, 165, 0.2)"]);

  return (
    <motion.div 
      className="fixed left-0 right-0 mx-auto z-50 flex justify-center pointer-events-auto"
      style={{ top: navTop, width: navWidth }}
    >
      <motion.nav
        className="w-full flex items-center justify-between px-8 py-5 transition-shadow duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        style={{
          borderRadius: navRadius,
          backgroundColor: navBg,
          backdropFilter: "blur(16px)",
          border: navBorder,
        }}
      >
        <MagneticButton>
          <Link 
            href="/" 
            className="text-ice-white font-medium text-lg tracking-[0.2em]"
          >
            MORQUE
          </Link>
        </MagneticButton>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
          const href =
              link.toLowerCase() === "aero"
                ? "/aero"
                : link.toLowerCase() === "engineering"
                ? "/engineering"
                : link.toLowerCase() === "performance"
                ? "/performance"
                : `/#${link.toLowerCase()}`;
            return (
              <MagneticButton key={link}>
                <Link 
                  href={href}
                  className="text-xs font-semibold text-white/50 hover:text-cyan-glow transition-colors tracking-widest uppercase"
                >
                  {link}
                </Link>
              </MagneticButton>
            );
          })}
        </div>

      </motion.nav>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Smooth springs for cursor follow magic
  const smoothX = useSpring(0, { stiffness: 400, damping: 28 });
  const smoothY = useSpring(0, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);

      // Check if mouse is hovering an interactive element
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [smoothX, smoothY]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-glow rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_#00C8FF]"
        animate={{ 
          x: mousePosition.x - 4, 
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[99] flex items-center justify-center"
        style={{ x: smoothX, y: smoothY }}
        animate={{ 
          translateX: "-50%", 
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(0, 200, 255, 0.8)" : "rgba(255, 255, 255, 0.3)",
          backgroundColor: isHovering ? "rgba(0, 200, 255, 0.1)" : "rgba(0, 200, 255, 0)"
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
    </>
  );
}

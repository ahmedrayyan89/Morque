"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";

const FRAME_COUNT = 193;

function getFramePath(index: number) {
  const paddedIndex = (index + 1).toString().padStart(4, "0");
  return `/frames-webp/frame_${paddedIndex}.webp`;
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Map 0 -> 0.9 of scroll into the full cinematic sequence.
  // This leaves the last 10% of scroll sitting perfectly still on the final empty tunnel frame!
  const frameValue = useTransform(scrollYProgress, [0, 0.9], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          renderFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);

    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        if (loadedImages.length === FRAME_COUNT) {
          renderFrame(Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1)), loadedImages);
        }
      }
    };
    
    // Initial size setup
    resizeCanvas();
    
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[] = images) => {
    if (!canvasRef.current || !imgArray[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgArray[index];
    if (!img.complete || img.naturalWidth === 0) return;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Create gradient overlay to hide Veo watermark (smooth steel dark gradient)
    const cw = canvas.width;
    const ch = canvas.height;
    const maskRadius = Math.max(cw, ch) * 0.15; // responsive radius
    
    const gradient = ctx.createRadialGradient(
      cw, ch, 0, 
      cw, ch, maskRadius
    );
    // #080C12 in rgb is 8, 12, 18
    gradient.addColorStop(0, "rgba(8, 12, 18, 1)");
    gradient.addColorStop(0.5, "rgba(8, 12, 18, 0.7)");
    gradient.addColorStop(1, "rgba(8, 12, 18, 0)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(cw - maskRadius * 2, ch - maskRadius * 2, maskRadius * 2, maskRadius * 2);
  };

  useMotionValueEvent(frameValue, "change", (latest) => {
    if (images.length === FRAME_COUNT) {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest)
      );
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-steel-dark overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover origin-center"
      />
    </div>
  );
}

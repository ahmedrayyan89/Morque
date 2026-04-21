"use client";

import { useEffect, useRef } from "react";

interface VantaOptions {
  effect: "net" | "dots";
  options: Record<string, unknown>;
}

/**
 * Dynamically loads a Vanta effect and attaches it to a ref'd element.
 * Handles cleanup automatically on unmount.
 */
export function useVanta({ effect, options }: VantaOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    if (vantaRef.current || !containerRef.current) return;

    const load = async () => {
      const THREE = (await import("three")) as any;
      // Patch glob window for Vanta effects that rely on global THREE (like DOTS)
      if (typeof window !== "undefined") {
        (window as any).THREE = THREE;
      }
      // Vanta effects each have their own bundle
      const VANTA = await import(
        /* webpackChunkName: "vanta" */
        `vanta/dist/vanta.${effect}.min`
      );
      vantaRef.current = VANTA.default({
        el: containerRef.current,
        THREE,
        ...options,
      });
    };

    load();

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

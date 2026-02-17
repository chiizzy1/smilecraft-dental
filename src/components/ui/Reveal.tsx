"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  blur?: boolean;
  y?: number;
  className?: string;
  overflow?: "hidden" | "visible";
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.8,
  blur = true,
  y = 20,
  className = "",
  overflow = "hidden",
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: y,
      filter: blur ? "blur(8px)" : "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1], // Luxurious editorial ease
      },
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow }} className={className}>
      <motion.div variants={variants} initial="hidden" animate={mainControls}>
        {children}
      </motion.div>
    </div>
  );
};

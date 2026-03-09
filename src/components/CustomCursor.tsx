"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          left: springX,
          top: springY,
        }}
      />
      <motion.div
        className="custom-cursor-glow"
        style={{
          left: springX,
          top: springY,
          x: -10,
          y: -10,
        }}
      />
    </>
  );
};
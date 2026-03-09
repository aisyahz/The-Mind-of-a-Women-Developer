
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const WOMEN_FIGURES = [
  {
    id: "ada",
    name: "Ada Lovelace",
    image: "https://image2url.com/r2/default/images/1773030196135-abfefd18-0d7a-459e-a0dd-33c332ba03ac.png",
    caption: "Often regarded as the first computer programmer.",
    quote: "The Analytical Engine weaves algebraic patterns.",
    color: "#a855f7",
    nodeSource: "Creativity",
    heroNodeId: "creativity",
    bgLabel: "Analytical Engine"
  },
  {
    id: "grace",
    name: "Grace Hopper",
    image: "https://image2url.com/r2/default/images/1773030220691-47d33614-a2f1-427a-a6f1-e79dc950c94b.png",
    caption: "Pioneer of modern programming languages and creator of COBOL.",
    quote: "The most dangerous phrase is 'we've always done it this way.'",
    color: "#3b82f6",
    nodeSource: "Logic",
    heroNodeId: "logic",
    bgLabel: "COBOL"
  },
  {
    id: "margaret",
    name: "Margaret Hamilton",
    image: "https://image2url.com/r2/default/images/1773030464884-ba20030d-6257-4673-9177-be1d42cf2029.png",
    caption: "Led the development of the Apollo guidance software.",
    quote: "There was no choice but to be pioneers.",
    color: "#f43f5e",
    nodeSource: "Empathy",
    heroNodeId: "empathy",
    bgLabel: "Apollo Guidance"
  },
  {
    id: "radia",
    name: "Radia Perlman",
    image: "https://image2url.com/r2/default/images/1773030535115-f2041c60-0d97-4275-bf7b-315f5bd4b94f.png",
    caption: "Invented key networking protocols fundamental to the modern internet.",
    quote: "If you think technology solves problems, think again.",
    color: "#22d3ee",
    nodeSource: "Collaboration",
    heroNodeId: "collaboration",
    bgLabel: "Spanning Tree Protocol"
  }
];

interface WomenInTechGalleryProps {
  onPioneerHover: (heroNodeId: string | null) => void;
  onLegacyComplete?: () => void;
}

export const WomenInTechGallery: React.FC<WomenInTechGalleryProps> = ({ onPioneerHover, onLegacyComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [legacyHovered, setLegacyHovered] = useState(false);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set([0]));

  const currentWoman = WOMEN_FIGURES[activeIndex];

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    setViewedIndices(prev => new Set(Array.from(prev).concat(index)));
    onPioneerHover(WOMEN_FIGURES[index].heroNodeId);
  };

  const handleLegacyClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    onLegacyComplete?.();
  };

  // Auto-highlight hero node when active pioneer changes
  useEffect(() => {
    onPioneerHover(currentWoman.heroNodeId);
    return () => onPioneerHover(null);
  }, [activeIndex, currentWoman.heroNodeId, onPioneerHover]);

  return (
    <div id="gallery-section" className="relative py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {WOMEN_FIGURES.map((woman, idx) => (
            <motion.g 
              key={`bg-label-${idx}`}
              animate={{ opacity: activeIndex === idx ? 0.6 : 0.1 }}
            >
              <text
                x={150 + (idx * 300)} y={600 + (Math.sin(idx) * 50)}
                fill="white" fontSize="8" className="uppercase tracking-[0.5em] font-light italic"
              >
                {woman.bgLabel}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <p className="text-[10px] uppercase tracking-[1.5em] text-white/20 mb-6 font-medium">
          THE CONSTELLATION THAT CAME BEFORE US
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic uppercase leading-none mb-12">
          Women Who <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
            Shaped the Code
          </span>
        </h2>

        {/* Navigation Orbs */}
        <div className="flex justify-center gap-8 md:gap-12 relative">
          {WOMEN_FIGURES.map((woman, idx) => (
            <button
              key={`nav-${woman.id}`}
              onClick={() => handleNavClick(idx)}
              className="group relative flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: activeIndex === idx ? 1.5 : 1,
                  backgroundColor: activeIndex === idx ? woman.color : "rgba(255,255,255,0.2)",
                  boxShadow: activeIndex === idx ? `0 0 20px ${woman.color}` : "0 0 0px transparent"
                }}
                className="w-3 h-3 rounded-full transition-colors duration-500"
              />
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    layoutId="orb-ring"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.4, scale: 2.5 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 rounded-full border border-white/40"
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              <motion.span 
                animate={{ opacity: activeIndex === idx ? 1 : 0.3 }}
                className="absolute top-8 text-[8px] uppercase tracking-[0.4em] text-white font-bold whitespace-nowrap"
              >
                {woman.name.split(' ')[0]}
              </motion.span>
            </button>
          ))}
          
          {/* Connecting Line behind Orbs */}
          <div className="absolute top-1.5 left-0 right-0 h-[1px] bg-white/5 -z-10" />
        </div>
      </motion.div>

      {/* Active Pioneer Display */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWoman.id}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', x: 50 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', x: -50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24"
          >
            {/* Portrait Node */}
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[60px]"
                style={{ backgroundColor: currentWoman.color }}
              />
              
              <div className="relative w-64 h-80">
                <Image 
                  src={currentWoman.image} 
                  alt={currentWoman.name} 
                  fill 
                  className="object-contain filter grayscale brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
              </div>

              {/* Orbital Star Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div 
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: `translate(${140 + i * 20}px, -50%)`,
                      boxShadow: '0 0 10px white' 
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Content Details */}
            <div className="max-w-md text-center md:text-left space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.8em] text-white/30 font-bold">
                  {currentWoman.nodeSource} Branch
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase italic">
                  {currentWoman.name}
                </h3>
              </div>
              
              <p className="text-xs md:text-sm text-white/60 leading-relaxed tracking-wide">
                {currentWoman.caption}
              </p>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs italic text-white/80 glow-sm pt-4 border-t border-white/10"
              >
                "{currentWoman.quote}"
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legacy Gateway Interaction */}
      <div className="relative flex flex-col items-center justify-center mt-12 pb-24">
        
        {/* Connection to Legacy */}
        <div className="absolute inset-0 -top-[100px] w-full h-[200px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 200" className="w-full h-full overflow-visible">
            <motion.path
              d="M 600,0 C 600,50 600,100 600,150"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: viewedIndices.size === 4 ? 1 : 0 }}
            />
          </svg>
        </div>

        <div className="relative flex flex-col items-center z-10">
          <motion.p 
            animate={{ opacity: viewedIndices.size === 4 ? 0.6 : 0.1 }}
            className="text-[9px] uppercase tracking-[1em] text-white font-bold mb-8 whitespace-nowrap"
          >
            Legacy continues
          </motion.p>

          <motion.div
            onMouseEnter={() => setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className={`relative flex items-center justify-center group ${viewedIndices.size === 4 ? 'cursor-none' : 'cursor-not-allowed opacity-20'}`}
          >
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && viewedIndices.size === 4 && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.2 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-32 h-32 rounded-full bg-primary blur-[40px]"
                  />
                  {[1, 2].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-16 h-16 border border-white/20 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scale: isTransitioning ? [1, 20, 1] : (legacyHovered ? 1.4 : 1),
                opacity: isTransitioning ? [1, 0, 0] : 1,
                backgroundColor: viewedIndices.size === 4 ? "#fff" : "#333",
                boxShadow: legacyHovered && viewedIndices.size === 4
                  ? "0 0 40px rgba(139, 92, 246, 0.8)" 
                  : "0 0 10px rgba(255, 255, 255, 0.1)"
              }}
              transition={{ duration: isTransitioning ? 1.5 : 0.5 }}
              className={`w-4 h-4 rounded-full relative z-20`}
            />
          </motion.div>

          <motion.p 
            animate={{ 
              opacity: legacyHovered && viewedIndices.size === 4 ? 1 : 0.2,
              y: legacyHovered ? 5 : 0
            }}
            className="text-[8px] uppercase tracking-[0.6em] text-white font-medium mt-8 transition-all duration-700"
          >
            {isTransitioning ? "Traveling through history..." : (viewedIndices.size === 4 ? "Click to follow the constellation" : "Explore all pioneers to continue")}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

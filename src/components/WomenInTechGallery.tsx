
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
  const allViewed = viewedIndices.size === WOMEN_FIGURES.length;

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    setViewedIndices(prev => new Set(Array.from(prev).concat(index)));
    onPioneerHover(WOMEN_FIGURES[index].heroNodeId);
  };

  const handleLegacyClick = () => {
    if (!allViewed || isTransitioning) return;
    setIsTransitioning(true);
    
    // Staged cinematic sequence
    setTimeout(() => {
      onLegacyComplete?.();
    }, 2500); // Wait for the "growing line" animation to start its descent
  };

  useEffect(() => {
    onPioneerHover(currentWoman.heroNodeId);
    return () => onPioneerHover(null);
  }, [activeIndex, currentWoman.heroNodeId, onPioneerHover]);

  return (
    <div id="gallery-section" className="relative py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Background Atmosphere Labels */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {WOMEN_FIGURES.map((woman, idx) => (
            <motion.g 
              key={`bg-label-${idx}`}
              animate={{ opacity: activeIndex === idx ? 0.6 : 0.05 }}
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
              
              {/* Halos */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-10 border border-white/10 rounded-full pointer-events-none"
              />
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
      <div className="relative flex flex-col items-center justify-center mt-24 pb-32">
        
        {/* Converging Lines to Legacy Core */}
        <div className="absolute inset-0 -top-[300px] w-full h-[600px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 600" className="w-full h-full overflow-visible">
            {WOMEN_FIGURES.map((woman, idx) => (
              <motion.path
                key={`converge-${woman.id}`}
                d={`M ${150 + (idx * 300)},0 C ${150 + (idx * 300)},200 600,200 600,450`}
                fill="none"
                stroke={woman.color}
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: viewedIndices.has(idx) ? 1 : 0, 
                  opacity: isTransitioning ? [0.4, 1, 0] : (viewedIndices.has(idx) ? 0.2 : 0)
                }}
                transition={{ 
                  duration: isTransitioning ? 1.5 : 2, 
                  ease: "easeInOut",
                  opacity: isTransitioning ? { duration: 2, times: [0, 0.5, 1] } : {}
                }}
              />
            ))}
            
            {/* The Descent Line */}
            <AnimatePresence>
              {isTransitioning && (
                <motion.path
                  d="M 600,450 L 600,1200"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </svg>
        </div>

        <div className="relative flex flex-col items-center z-10">
          <motion.p 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.6) : 0.1,
              filter: allViewed ? 'blur(0px)' : 'blur(2px)'
            }}
            className="text-[10px] uppercase tracking-[1.2em] text-white font-bold mb-10 whitespace-nowrap glow-sm"
          >
            Legacy continues
          </motion.p>

          <motion.div
            onMouseEnter={() => setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className={`relative flex items-center justify-center group ${allViewed ? 'cursor-none' : 'cursor-not-allowed opacity-20'}`}
          >
            {/* Halo Expansion */}
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && allViewed && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isTransitioning ? 20 : 2, opacity: isTransitioning ? 0 : 0.3 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-32 h-32 rounded-full bg-primary blur-[50px]"
                    transition={{ duration: isTransitioning ? 2 : 0.5 }}
                  />
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ 
                        scale: isTransitioning ? 3 : (legacyHovered ? 2.5 : 2), 
                        opacity: isTransitioning ? 0 : [0, 0.2, 0] 
                      }}
                      transition={{ 
                        duration: isTransitioning ? 1 : 3, 
                        repeat: isTransitioning ? 0 : Infinity, 
                        delay: i * 0.4 
                      }}
                      className="absolute w-20 h-20 border border-white/20 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Core Node */}
            <motion.div
              animate={{
                scale: isTransitioning ? [1, 2.5, 0.8] : (legacyHovered ? 1.4 : 1),
                opacity: isTransitioning ? [1, 1, 0] : 1,
                backgroundColor: allViewed ? "#fff" : "#333",
                boxShadow: legacyHovered && allViewed
                  ? "0 0 60px rgba(255, 255, 255, 0.9), 0 0 100px rgba(139, 92, 246, 0.8)" 
                  : "0 0 15px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ duration: isTransitioning ? 2 : 0.5, ease: "easeInOut" }}
              className={`w-5 h-5 rounded-full relative z-20`}
            />

            {/* Orbital Particles on Hover */}
            {legacyHovered && allViewed && !isTransitioning && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`p-orbit-${i}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
                      style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: `translate(${30}px, -50%)`,
                        boxShadow: '0 0 10px white' 
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            animate={{ 
              opacity: legacyHovered && allViewed ? 1 : 0.2,
              y: legacyHovered ? 10 : 0
            }}
            className="text-center mt-12 space-y-4"
          >
            <p className="text-[9px] uppercase tracking-[0.6em] text-white font-medium transition-all duration-700">
              {isTransitioning ? "Traveling through time..." : (allViewed ? "Follow the constellation" : `Explore ${WOMEN_FIGURES.length - viewedIndices.size} more pioneers`)}
            </p>
            {allViewed && !isTransitioning && (
               <motion.div 
                 animate={{ y: [0, 5, 0] }} 
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="flex justify-center"
               >
                 <div className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent" />
               </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

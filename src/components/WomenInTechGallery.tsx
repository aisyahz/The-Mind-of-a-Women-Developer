
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
    bgLabel: "Analytical Engine",
    targetX: 150
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
    bgLabel: "COBOL",
    targetX: 350
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
    bgLabel: "Apollo Guidance",
    targetX: 550
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
    bgLabel: "Spanning Tree Protocol",
    targetX: 750
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
    
    setTimeout(() => {
      onLegacyComplete?.();
    }, 2500);
  };

  useEffect(() => {
    onPioneerHover(currentWoman.heroNodeId);
    return () => onPioneerHover(null);
  }, [activeIndex, currentWoman.heroNodeId, onPioneerHover]);

  return (
    <div id="gallery-section" className="relative py-24 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none opacity-40">
        <svg viewBox="0 0 900 800" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYTop">
          {WOMEN_FIGURES.map((woman, idx) => {
            const incomingX = woman.targetX; 
            const targetX = 450 + (Math.sin(idx * 2) * 300);
            const targetY = 300 + (Math.cos(idx * 2) * 120);
            return (
              <motion.g key={`ancestry-${woman.id}`}>
                <motion.path
                  d={`M ${incomingX},-200 C ${incomingX},150 ${targetX},80 ${targetX},${targetY}`}
                  fill="none"
                  stroke={woman.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 5, delay: idx * 0.6, ease: "easeInOut" }}
                />
                
                <motion.circle
                  cx={targetX} cy={targetY} r="3"
                  fill={woman.color}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 2, 1], opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 4.5 + (idx * 0.6), duration: 1.2 }}
                  className="glow-md"
                />

                <motion.circle
                  r="2"
                  fill="white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.8, 0] }}
                  animate={{
                    cx: [incomingX, targetX],
                    cy: [-200, targetY],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: 2 + idx * 1.5,
                    ease: "linear"
                  }}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="text-center mb-20 relative z-10"
      >
        <div className="space-y-4 mb-12">
          <p className="text-[12px] uppercase tracking-[1.2em] text-white/25 font-bold">
            THE CONSTELLATION THAT CAME BEFORE US
          </p>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic uppercase leading-none">
            Women Who <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
              Shaped the Code
            </span>
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.6em] text-primary/60 font-black"
          >
            {allViewed ? "Lineage Discovered" : `Connecting ${viewedIndices.size}/${WOMEN_FIGURES.length} Pioneer Nodes`}
          </motion.div>
        </div>

        <div className="flex justify-center gap-12 md:gap-20 relative">
          {WOMEN_FIGURES.map((woman, idx) => {
            const isViewed = viewedIndices.has(idx);
            return (
              <button
                key={`nav-${woman.id}`}
                onClick={() => handleNavClick(idx)}
                className="group relative flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    scale: activeIndex === idx ? 1.8 : (isViewed ? 1.2 : [1, 1.2, 1]),
                    backgroundColor: activeIndex === idx ? woman.color : (isViewed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"),
                    boxShadow: activeIndex === idx 
                      ? `0 0 35px ${woman.color}` 
                      : (isViewed ? "0 0 0px transparent" : `0 0 15px ${woman.color}66`)
                  }}
                  transition={{ 
                    duration: isViewed ? 0.5 : 2.5, 
                    repeat: isViewed ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-4 h-4 rounded-full transition-colors duration-600"
                />
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="orb-ring"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.4, scale: 3 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 rounded-full border-2 border-white/40"
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                <motion.span 
                  animate={{ opacity: activeIndex === idx ? 1 : 0.4 }}
                  className="absolute top-10 text-[10px] uppercase tracking-[0.4em] text-white font-black whitespace-nowrap"
                >
                  {woman.name.split(' ')[0]}
                </motion.span>
              </button>
            );
          })}
          <div className="absolute top-2 left-0 right-0 h-[1px] bg-white/10 -z-10" />
        </div>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWoman.id}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)', x: 60 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)', x: -60 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row items-center gap-16 md:gap-24"
          >
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[70px]"
                style={{ backgroundColor: currentWoman.color }}
              />
              
              <div className="relative w-64 h-[400px]">
                <Image 
                  src={currentWoman.image} 
                  alt={currentWoman.name} 
                  fill 
                  className="object-contain filter grayscale brightness-75 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-70" />
              </div>

              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12 + i * 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div 
                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: `translate(${160 + i * 25}px, -50%)`,
                      boxShadow: '0 0 15px white' 
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="max-w-md text-center md:text-left space-y-8">
              <div className="space-y-3">
                <p className="text-[12px] uppercase tracking-[1em] text-white/40 font-black">
                  {currentWoman.nodeSource} Lineage
                </p>
                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-tight">
                  {currentWoman.name}
                </h3>
              </div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed tracking-wider font-light">
                {currentWoman.caption}
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-white/15"
              >
                 <p className="text-base md:text-xl italic text-white/90 glow-sm font-light leading-relaxed">
                   "{currentWoman.quote}"
                 </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex flex-col items-center justify-center mt-32 pb-48">
        
        <div className="absolute inset-0 -top-[400px] w-full h-[800px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 1000" className="w-full h-full overflow-visible">
            {WOMEN_FIGURES.map((woman, idx) => (
              <motion.path
                key={`converge-${woman.id}`}
                d={`M ${150 + (idx * 300)},0 C ${150 + (idx * 300)},350 600,350 600,700`}
                fill="none"
                stroke={woman.color}
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: viewedIndices.has(idx) ? 1 : 0, 
                  opacity: isTransitioning ? [0.4, 1, 0] : (viewedIndices.has(idx) ? 0.3 : 0)
                }}
                transition={{ 
                  duration: isTransitioning ? 1.5 : 3.5, 
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>

        <div className="relative flex flex-col items-center z-10">
          <motion.p 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.6) : 0.2,
              filter: allViewed ? 'blur(0px)' : 'blur(1px)'
            }}
            className="text-[12px] uppercase tracking-[1.5em] text-white font-black mb-12 whitespace-nowrap glow-sm"
          >
            {allViewed ? "The Bridge to the Future" : "Legacy Awaiting Activation"}
          </motion.p>

          <motion.div
            onMouseEnter={() => allViewed && setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className={`relative flex items-center justify-center group ${allViewed ? 'cursor-none' : 'cursor-default'}`}
          >
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && allViewed && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isTransitioning ? 30 : 2.5, opacity: isTransitioning ? 0 : 0.4 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-40 h-40 rounded-full bg-primary blur-[60px]"
                    transition={{ duration: isTransitioning ? 2 : 0.7 }}
                  />
                </>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scale: isTransitioning ? [1, 3.5, 0.8] : (allViewed ? (legacyHovered ? 1.6 : 1.1) : 1),
                opacity: isTransitioning ? [1, 1, 0] : (allViewed ? 1 : 0.35),
                backgroundColor: allViewed ? "#fff" : "rgba(255,255,255,0.15)",
                boxShadow: legacyHovered && allViewed
                  ? "0 0 80px rgba(255, 255, 255, 1), 0 0 120px rgba(139, 92, 246, 0.8)" 
                  : "0 0 20px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ duration: isTransitioning ? 2.5 : 0.7, ease: "easeInOut" }}
              className={`w-7 h-7 rounded-full relative z-20 border-2 ${allViewed ? 'border-transparent' : 'border-white/20'}`}
            />
          </motion.div>

          <motion.div 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.5) : 0.25,
              y: legacyHovered ? 12 : 0
            }}
            className="text-center mt-16 space-y-4"
          >
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.8em] text-white font-black transition-all duration-800">
              {isTransitioning 
                ? "Connecting history..." 
                : (allViewed 
                    ? "Step into the continuation" 
                    : `Observe ${WOMEN_FIGURES.length - viewedIndices.size} more pioneers`
                  )
              }
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

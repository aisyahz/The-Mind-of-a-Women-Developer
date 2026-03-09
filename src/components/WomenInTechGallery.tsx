
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
    
    setTimeout(() => {
      onLegacyComplete?.();
    }, 2500);
  };

  useEffect(() => {
    onPioneerHover(currentWoman.heroNodeId);
    return () => onPioneerHover(null);
  }, [activeIndex, currentWoman.heroNodeId, onPioneerHover]);

  return (
    <div id="gallery-section" className="relative py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Background Ancestry Network: Receiving hero threads */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 600" className="w-full h-full overflow-visible">
          {WOMEN_FIGURES.map((woman, idx) => {
            const startX = 200 + (idx * 200);
            const targetX = 600 + (Math.sin(idx) * 300);
            const targetY = 300 + (Math.cos(idx) * 100);
            return (
              <motion.g key={`ancestry-${woman.id}`}>
                <motion.path
                  d={`M ${startX},-100 C ${startX},200 ${targetX},100 ${targetX},${targetY}`}
                  fill="none"
                  stroke={woman.color}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 4, delay: idx * 0.5 }}
                />
                <motion.circle
                  cx={targetX} cy={targetY} r="3"
                  fill={woman.color}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 3.5 + (idx * 0.5) }}
                  className="glow-sm"
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <div className="space-y-4 mb-12">
          <p className="text-[12px] uppercase tracking-[1.5em] text-white/20 font-medium">
            THE CONSTELLATION THAT CAME BEFORE US
          </p>
          <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter italic uppercase leading-none">
            Women Who <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
              Shaped the Code
            </span>
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] uppercase tracking-[0.6em] text-primary/60 font-bold"
          >
            {allViewed ? "Discovery Complete" : `Discover ${viewedIndices.size}/${WOMEN_FIGURES.length} Pioneers`}
          </motion.div>
        </div>

        {/* Navigation Orbs */}
        <div className="flex justify-center gap-10 md:gap-16 relative">
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
                    scale: activeIndex === idx ? 1.8 : (isViewed ? 1.2 : [1, 1.3, 1]),
                    backgroundColor: activeIndex === idx ? woman.color : (isViewed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"),
                    boxShadow: activeIndex === idx 
                      ? `0 0 30px ${woman.color}` 
                      : (isViewed ? "0 0 0px transparent" : `0 0 15px ${woman.color}66`)
                  }}
                  transition={{ 
                    duration: isViewed ? 0.5 : 2.5, 
                    repeat: isViewed ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-4 h-4 rounded-full transition-colors duration-500"
                />
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="orb-ring"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.4, scale: 3 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 rounded-full border border-white/40"
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                {!isViewed && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 0.4, 0] }}
                     transition={{ duration: 3, repeat: Infinity }}
                     className="absolute -top-1 w-6 h-6 border border-white/20 rounded-full"
                   />
                )}

                <motion.span 
                  animate={{ opacity: activeIndex === idx ? 1 : 0.35 }}
                  className="absolute top-10 text-[10px] uppercase tracking-[0.4em] text-white font-bold whitespace-nowrap"
                >
                  {woman.name.split(' ')[0]}
                </motion.span>
              </button>
            );
          })}
          <div className="absolute top-1.5 left-0 right-0 h-[1px] bg-white/5 -z-10" />
        </div>
      </motion.div>

      {/* Active Pioneer Display */}
      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWoman.id}
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(25px)', x: 60 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(25px)', x: -60 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row items-center gap-16 md:gap-28"
          >
            {/* Portrait Node */}
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.25, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[70px]"
                style={{ backgroundColor: currentWoman.color }}
              />
              
              <div className="relative w-72 h-96">
                <Image 
                  src={currentWoman.image} 
                  alt={currentWoman.name} 
                  fill 
                  className="object-contain filter grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-70" />
              </div>

              {[...Array(4)].map((_, i) => (
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
              
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -inset-12 border border-white/15 rounded-full pointer-events-none"
              />
            </div>

            {/* Content Details */}
            <div className="max-w-lg text-center md:text-left space-y-8">
              <div className="space-y-3">
                <p className="text-[12px] uppercase tracking-[1em] text-white/30 font-bold">
                  {currentWoman.nodeSource} Lineage
                </p>
                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-tight">
                  {currentWoman.name}
                </h3>
              </div>
              <p className="text-sm md:text-base text-white/60 leading-relaxed tracking-wide font-light">
                {currentWoman.caption}
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 border-t border-white/15"
              >
                 <p className="text-sm md:text-lg italic text-white/80 glow-sm font-light leading-relaxed">
                   "{currentWoman.quote}"
                 </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legacy Gateway Interaction */}
      <div className="relative flex flex-col items-center justify-center mt-32 pb-40">
        
        {/* Converging Lines to Legacy Core */}
        <div className="absolute inset-0 -top-[400px] w-full h-[800px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 800" className="w-full h-full overflow-visible">
            {WOMEN_FIGURES.map((woman, idx) => (
              <motion.path
                key={`converge-${woman.id}`}
                d={`M ${150 + (idx * 300)},0 C ${150 + (idx * 300)},300 600,300 600,550`}
                fill="none"
                stroke={woman.color}
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: viewedIndices.has(idx) ? 1 : 0, 
                  opacity: isTransitioning ? [0.4, 1, 0] : (viewedIndices.has(idx) ? 0.3 : 0)
                }}
                transition={{ 
                  duration: isTransitioning ? 1.5 : 3, 
                  ease: "easeInOut",
                  opacity: isTransitioning ? { duration: 2, times: [0, 0.5, 1] } : {}
                }}
              />
            ))}
            
            <AnimatePresence>
              {isTransitioning && (
                <motion.path
                  d="M 600,550 L 600,1600"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
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
              opacity: allViewed ? (legacyHovered ? 1 : 0.6) : 0.2,
              filter: allViewed ? 'blur(0px)' : 'blur(1.5px)'
            }}
            className="text-[12px] uppercase tracking-[1.5em] text-white font-bold mb-12 whitespace-nowrap glow-sm"
          >
            {allViewed ? "The Bridge to the Future" : "Legacy Awaiting"}
          </motion.p>

          <motion.div
            onMouseEnter={() => allViewed && setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className={`relative flex items-center justify-center group ${allViewed ? 'cursor-none' : 'cursor-default'}`}
          >
            {/* Halo Expansion */}
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && allViewed && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isTransitioning ? 25 : 2.5, opacity: isTransitioning ? 0 : 0.4 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-40 h-40 rounded-full bg-primary blur-[60px]"
                    transition={{ duration: isTransitioning ? 2 : 0.6 }}
                  />
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ 
                        scale: isTransitioning ? 4 : (legacyHovered ? 3 : 2), 
                        opacity: isTransitioning ? 0 : [0, 0.3, 0] 
                      }}
                      transition={{ 
                        duration: isTransitioning ? 1.2 : 3.5, 
                        repeat: isTransitioning ? 0 : Infinity, 
                        delay: i * 0.5 
                      }}
                      className="absolute w-24 h-24 border border-white/20 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Core Node */}
            <motion.div
              animate={{
                scale: isTransitioning ? [1, 3, 0.8] : (allViewed ? (legacyHovered ? 1.5 : 1) : 1),
                opacity: isTransitioning ? [1, 1, 0] : (allViewed ? 1 : 0.3),
                backgroundColor: allViewed ? "#fff" : "rgba(255,255,255,0.15)",
                boxShadow: legacyHovered && allViewed
                  ? "0 0 80px rgba(255, 255, 255, 1), 0 0 120px rgba(139, 92, 246, 0.9)" 
                  : "0 0 20px rgba(255, 255, 255, 0.25)"
              }}
              transition={{ duration: isTransitioning ? 2.5 : 0.6, ease: "easeInOut" }}
              className={`w-6 h-6 rounded-full relative z-20 border ${allViewed ? 'border-transparent' : 'border-white/25'}`}
            />

            {/* Orbital Particles on Hover */}
            {legacyHovered && allViewed && !isTransitioning && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`p-orbit-${i}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[0.5px]"
                      style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: `translate(${40}px, -50%)`,
                        boxShadow: '0 0 12px white' 
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.5) : 0.2,
              y: legacyHovered ? 12 : 0
            }}
            className="text-center mt-16 space-y-5"
          >
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.8em] text-white font-bold transition-all duration-700">
              {isTransitioning 
                ? "Connecting history to the future..." 
                : (allViewed 
                    ? "Step into the next chapter" 
                    : `Discover ${WOMEN_FIGURES.length - viewedIndices.size} more pioneers to activate the bridge`
                  )
              }
            </p>
            {allViewed && !isTransitioning && (
               <motion.div 
                 animate={{ y: [0, 8, 0] }} 
                 transition={{ repeat: Infinity, duration: 2.5 }}
                 className="flex justify-center"
               >
                 <div className="w-[1.5px] h-10 bg-gradient-to-b from-white to-transparent" />
               </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

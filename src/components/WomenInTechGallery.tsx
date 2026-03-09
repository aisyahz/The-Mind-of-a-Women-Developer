
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
    targetX: 150 // Matches LINEAGE_TARGETS in hero
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
    <div id="gallery-section" className="relative py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* ANCESTRY NETWORK: Receiving hero lineage threads */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-50">
        <svg viewBox="0 0 900 800" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYTop">
          {WOMEN_FIGURES.map((woman, idx) => {
            // Pick up from the targetX established in hero
            const incomingX = woman.targetX; 
            const targetX = 450 + (Math.sin(idx * 2) * 350);
            const targetY = 350 + (Math.cos(idx * 2) * 150);
            return (
              <motion.g key={`ancestry-${woman.id}`}>
                {/* Lineage bridge: From the top edge to a historical anchor */}
                <motion.path
                  d={`M ${incomingX},-200 C ${incomingX},200 ${targetX},100 ${targetX},${targetY}`}
                  fill="none"
                  stroke={woman.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 6, delay: idx * 0.8, ease: "easeInOut" }}
                />
                
                {/* Ignition Spark: Fires when lineage reaches the anchor */}
                <motion.circle
                  cx={targetX} cy={targetY} r="4"
                  fill={woman.color}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 2.5, 1], opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 5.5 + (idx * 0.8), duration: 1.5 }}
                  className="glow-md"
                />

                {/* Descending pulses for continuous flow */}
                <motion.circle
                  r="3"
                  fill="white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  animate={{
                    cx: [incomingX, targetX],
                    cy: [-200, targetY],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: 2 + idx * 2,
                    ease: "linear"
                  }}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="text-center mb-24 relative z-10"
      >
        <div className="space-y-6 mb-16">
          <p className="text-[14px] uppercase tracking-[1.8em] text-white/25 font-bold">
            THE CONSTELLATION THAT CAME BEFORE US
          </p>
          <h2 className="text-5xl md:text-9xl font-bold text-white tracking-tighter italic uppercase leading-none">
            Women Who <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
              Shaped the Code
            </span>
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[12px] uppercase tracking-[0.8em] text-primary/60 font-black"
          >
            {allViewed ? "Lineage Discovered" : `Connecting ${viewedIndices.size}/${WOMEN_FIGURES.length} Pioneer Nodes`}
          </motion.div>
        </div>

        {/* Pioneer Navigation Orbs (The anchors of the transition) */}
        <div className="flex justify-center gap-14 md:gap-24 relative">
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
                    scale: activeIndex === idx ? 2.2 : (isViewed ? 1.4 : [1, 1.4, 1]),
                    backgroundColor: activeIndex === idx ? woman.color : (isViewed ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)"),
                    boxShadow: activeIndex === idx 
                      ? `0 0 45px ${woman.color}` 
                      : (isViewed ? "0 0 0px transparent" : `0 0 20px ${woman.color}88`)
                  }}
                  transition={{ 
                    duration: isViewed ? 0.6 : 3, 
                    repeat: isViewed ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-5 h-5 rounded-full transition-colors duration-600"
                />
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="orb-ring"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.5, scale: 3.5 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                {!isViewed && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 0.5, 0] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="absolute -top-1 w-8 h-8 border border-white/30 rounded-full"
                   />
                )}

                <motion.span 
                  animate={{ opacity: activeIndex === idx ? 1 : 0.45 }}
                  className="absolute top-12 text-[11px] uppercase tracking-[0.5em] text-white font-black whitespace-nowrap"
                >
                  {woman.name.split(' ')[0]}
                </motion.span>
              </button>
            );
          })}
          <div className="absolute top-2.5 left-0 right-0 h-[1px] bg-white/10 -z-10" />
        </div>
      </motion.div>

      {/* Active Pioneer Portrait & Narrative */}
      <div className="relative w-full max-w-6xl h-[700px] flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWoman.id}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)', x: 80 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)', x: -80 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row items-center gap-20 md:gap-32"
          >
            {/* Portrait Node (Cinematic lighting) */}
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[90px]"
                style={{ backgroundColor: currentWoman.color }}
              />
              
              <div className="relative w-80 h-[500px]">
                <Image 
                  src={currentWoman.image} 
                  alt={currentWoman.name} 
                  fill 
                  className="object-contain filter grayscale brightness-75 hover:grayscale-0 transition-all duration-1200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
              </div>

              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15 + i * 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div 
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{ 
                      top: '50%', 
                      left: '50%', 
                      transform: `translate(${200 + i * 35}px, -50%)`,
                      boxShadow: '0 0 20px white' 
                    }}
                  />
                </motion.div>
              ))}
              
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute -inset-16 border border-white/20 rounded-full pointer-events-none"
              />
            </div>

            {/* Narrative Content */}
            <div className="max-w-xl text-center md:text-left space-y-12">
              <div className="space-y-4">
                <p className="text-[14px] uppercase tracking-[1.2em] text-white/40 font-black">
                  {currentWoman.nodeSource} Lineage
                </p>
                <h3 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-tight">
                  {currentWoman.name}
                </h3>
              </div>
              <p className="text-base md:text-lg text-white/70 leading-relaxed tracking-widest font-light">
                {currentWoman.caption}
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-10 border-t border-white/20"
              >
                 <p className="text-lg md:text-2xl italic text-white/90 glow-sm font-light leading-relaxed">
                   "{currentWoman.quote}"
                 </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legacy Gateway (The Warp to the Finale) */}
      <div className="relative flex flex-col items-center justify-center mt-48 pb-64">
        
        {/* Converging Lineage to Core */}
        <div className="absolute inset-0 -top-[500px] w-full h-[1000px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 1000" className="w-full h-full overflow-visible">
            {WOMEN_FIGURES.map((woman, idx) => (
              <motion.path
                key={`converge-${woman.id}`}
                d={`M ${150 + (idx * 300)},0 C ${150 + (idx * 300)},400 600,400 600,750`}
                fill="none"
                stroke={woman.color}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: viewedIndices.has(idx) ? 1 : 0, 
                  opacity: isTransitioning ? [0.5, 1, 0] : (viewedIndices.has(idx) ? 0.4 : 0)
                }}
                transition={{ 
                  duration: isTransitioning ? 1.8 : 4, 
                  ease: "easeInOut",
                  opacity: isTransitioning ? { duration: 2.5, times: [0, 0.5, 1] } : {}
                }}
              />
            ))}
            
            <AnimatePresence>
              {isTransitioning && (
                <motion.path
                  d="M 600,750 L 600,2000"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </svg>
        </div>

        <div className="relative flex flex-col items-center z-10">
          <motion.p 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.7) : 0.25,
              filter: allViewed ? 'blur(0px)' : 'blur(2px)'
            }}
            className="text-[14px] uppercase tracking-[1.8em] text-white font-black mb-16 whitespace-nowrap glow-sm"
          >
            {allViewed ? "The Bridge to the Future" : "Legacy Awaiting Activation"}
          </motion.p>

          <motion.div
            onMouseEnter={() => allViewed && setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className={`relative flex items-center justify-center group ${allViewed ? 'cursor-none' : 'cursor-default'}`}
          >
            {/* Halo Expansion Event */}
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && allViewed && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isTransitioning ? 35 : 3, opacity: isTransitioning ? 0 : 0.5 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-48 h-48 rounded-full bg-primary blur-[70px]"
                    transition={{ duration: isTransitioning ? 2.5 : 0.8 }}
                  />
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ 
                        scale: isTransitioning ? 5 : (legacyHovered ? 4 : 2.5), 
                        opacity: isTransitioning ? 0 : [0, 0.4, 0] 
                      }}
                      transition={{ 
                        duration: isTransitioning ? 1.5 : 4, 
                        repeat: isTransitioning ? 0 : Infinity, 
                        delay: i * 0.6 
                      }}
                      className="absolute w-32 h-32 border-2 border-white/30 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Legacy Core Node */}
            <motion.div
              animate={{
                scale: isTransitioning ? [1, 4, 0.8] : (allViewed ? (legacyHovered ? 1.8 : 1.2) : 1),
                opacity: isTransitioning ? [1, 1, 0] : (allViewed ? 1 : 0.4),
                backgroundColor: allViewed ? "#fff" : "rgba(255,255,255,0.2)",
                boxShadow: legacyHovered && allViewed
                  ? "0 0 100px rgba(255, 255, 255, 1), 0 0 150px rgba(139, 92, 246, 1)" 
                  : "0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: isTransitioning ? 3 : 0.8, ease: "easeInOut" }}
              className={`w-8 h-8 rounded-full relative z-20 border-2 ${allViewed ? 'border-transparent' : 'border-white/30'}`}
            />

            {/* Discovery Orbitals */}
            {legacyHovered && allViewed && !isTransitioning && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`p-orbit-${i}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-2 h-2 bg-white rounded-full blur-[0.6px]"
                      style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: `translate(${55}px, -50%)`,
                        boxShadow: '0 0 15px white' 
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Gateway Subtext */}
          <motion.div 
            animate={{ 
              opacity: allViewed ? (legacyHovered ? 1 : 0.6) : 0.3,
              y: legacyHovered ? 15 : 0
            }}
            className="text-center mt-20 space-y-6"
          >
            <p className="text-[12px] md:text-[14px] uppercase tracking-[1em] text-white font-black transition-all duration-800">
              {isTransitioning 
                ? "Connecting history to your potential..." 
                : (allViewed 
                    ? "Step into the living continuation" 
                    : `Observe ${WOMEN_FIGURES.length - viewedIndices.size} more pioneers to stabilize the bridge`
                  )
              }
            </p>
            {allViewed && !isTransitioning && (
               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="flex justify-center"
               >
                 <div className="w-[2px] h-14 bg-gradient-to-b from-white to-transparent" />
               </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};


"use client";

import React, { useState } from 'react';
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [legacyHovered, setLegacyHovered] = useState(false);

  const handleLegacyClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    onLegacyComplete?.();
  };

  return (
    <div id="gallery-section" className="relative pt-48 pb-64 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Background Labels & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {WOMEN_FIGURES.map((woman, idx) => (
            <motion.g key={`bg-label-${idx}`}>
              <text
                x={150 + (idx * 300)} y={600 + (Math.sin(idx) * 50)}
                fill="white" fontSize="8" className="uppercase tracking-[0.5em] font-light opacity-30 italic"
              >
                {woman.bgLabel}
              </text>
              <circle cx={150 + (idx * 300)} cy={600 + (Math.sin(idx) * 50)} r="1" fill="white" className="opacity-20" />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-48 relative z-10"
      >
        <p className="text-[10px] uppercase tracking-[1.5em] text-white/20 mb-6 font-medium">
          THE CONSTELLATION THAT CAME BEFORE US
        </p>
        <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic uppercase leading-none">
          Women Who <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
            Shaped the Code
          </span>
        </h2>
      </motion.div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-12 max-w-7xl w-full px-4 relative z-10 mb-48">
        {WOMEN_FIGURES.map((woman, idx) => {
          const delay = 0.5 + idx * 1.5;
          const isHovered = hoveredId === woman.id;

          return (
            <div 
              key={woman.id} 
              className="relative flex flex-col items-center"
              onMouseEnter={() => {
                setHoveredId(woman.id);
                onPioneerHover(woman.heroNodeId);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                onPioneerHover(null);
              }}
            >
              {/* Star Node Atmosphere */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.4] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay }}
                className="absolute top-24 w-64 h-64 rounded-full blur-[80px]"
                style={{ backgroundColor: woman.color }}
              />

              {/* Orbital Rings */}
              <div className="absolute top-24 w-80 h-80 flex items-center justify-center pointer-events-none">
                {[120, 160].map((radius, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/5"
                    style={{ width: radius * 2, height: radius * 2 }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>

              {/* Node Portrait Card */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center w-full"
              >
                <div className="relative w-full flex flex-col items-center">
                  <motion.div className="relative w-56 h-72 z-10 transition-all duration-700 ease-out group-hover:-translate-y-6">
                    <Image src={woman.image} alt={woman.name} fill className="object-contain filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                  </motion.div>

                  <div className="relative w-full max-w-[220px] pt-12 pb-12 px-6 flex flex-col items-center text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.6em] text-white/20 font-bold whitespace-nowrap">
                      {woman.nodeSource} Branch
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-[0.12em] uppercase italic mb-2">
                      {woman.name}
                    </h3>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed mb-4">
                      {woman.caption}
                    </p>

                    {/* Sequential Quote */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0 }}
                          className="text-[8px] text-white/60 italic tracking-[0.1em] glow-sm"
                        >
                          "{woman.quote}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Legacy Gateway Interaction */}
      <div className="relative flex flex-col items-center justify-center mt-24">
        
        {/* Connection Lines from Pioneers to Legacy Core */}
        <div className="absolute inset-0 -top-[400px] w-full h-[600px] pointer-events-none z-0">
          <svg viewBox="0 0 1200 600" className="w-full h-full overflow-visible">
            {[150, 450, 750, 1050].map((x, i) => (
              <motion.path
                key={`legacy-line-${i}`}
                d={`M ${x},0 C ${x},200 600,300 600,450`}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, delay: 5 }}
              />
            ))}
          </svg>
        </div>

        {/* The Legacy Node */}
        <div className="relative flex flex-col items-center z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-[9px] uppercase tracking-[1em] text-white font-bold mb-12 whitespace-nowrap"
          >
            Legacy continues
          </motion.p>

          <motion.div
            onMouseEnter={() => setLegacyHovered(true)}
            onMouseLeave={() => setLegacyHovered(false)}
            onClick={handleLegacyClick}
            className="relative cursor-none flex items-center justify-center group"
          >
            {/* Atmospheric Rings */}
            <AnimatePresence>
              {(legacyHovered || isTransitioning) && (
                <>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.15 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute w-48 h-48 rounded-full bg-primary blur-[40px]"
                  />
                  {[1, 2].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-24 h-24 border border-white/20 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Core Orb */}
            <motion.div
              animate={{
                scale: isTransitioning ? [1, 15, 1] : (legacyHovered ? [1, 1.2, 1] : [1, 1.1, 1]),
                opacity: isTransitioning ? [1, 0, 0] : 1,
                boxShadow: legacyHovered 
                  ? "0 0 40px rgba(139, 92, 246, 0.8)" 
                  : "0 0 20px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ duration: isTransitioning ? 2 : 3, repeat: isTransitioning ? 0 : Infinity }}
              className={`w-4 h-4 rounded-full bg-white relative z-20 ${isTransitioning ? 'pointer-events-none' : ''}`}
            />

            {/* Transition Burst Particles */}
            <AnimatePresence>
              {isTransitioning && (
                <motion.div className="absolute z-30">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                        x: (Math.random() - 0.5) * 400, 
                        y: 800, 
                        scale: 0,
                        opacity: 0 
                      }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p 
            animate={{ 
              opacity: legacyHovered ? 1 : 0.3,
              y: legacyHovered ? [0, 5, 0] : 0
            }}
            className="text-[8px] uppercase tracking-[0.6em] text-white font-medium mt-12 transition-all duration-700"
          >
            {isTransitioning ? "Traveling through history..." : "Click to follow the constellation"}
          </motion.p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-64 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 italic max-w-sm mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>
    </div>
  );
};

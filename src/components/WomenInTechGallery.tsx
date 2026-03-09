
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
}

export const WomenInTechGallery: React.FC<WomenInTechGalleryProps> = ({ onPioneerHover }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div id="gallery-section" className="relative py-48 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
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

      {/* Legacy Core Node */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="w-96 h-96 rounded-full bg-white/5 blur-[100px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_white]"
          />
          <span className="absolute mt-8 text-[8px] uppercase tracking-[1em] text-white/20 font-bold whitespace-nowrap">
            Legacy Core
          </span>
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-12 max-w-7xl w-full px-4 relative z-10">
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

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-48 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 italic max-w-sm mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>
    </div>
  );
};


"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WOMEN_FIGURES = [
  {
    name: "Ada Lovelace",
    image: "https://image2url.com/r2/default/images/1773030196135-abfefd18-0d7a-459e-a0dd-33c332ba03ac.png",
    caption: "The first computer programmer.",
    color: "#a855f7", // Creativity (Violet)
    nodeSource: "Creativity"
  },
  {
    name: "Grace Hopper",
    image: "https://image2url.com/r2/default/images/1773030220691-47d33614-a2f1-427a-a6f1-e79dc950c94b.png",
    caption: "Pioneer of COBOL and modern languages.",
    color: "#3b82f6", // Logic (Blue)
    nodeSource: "Logic"
  },
  {
    name: "Margaret Hamilton",
    image: "https://image2url.com/r2/default/images/1773030464884-ba20030d-6257-4673-9177-be1d42cf2029.png",
    caption: "Lead Apollo guidance software engineer.",
    color: "#f43f5e", // Empathy (Rose)
    nodeSource: "Empathy"
  },
  {
    name: "Radia Perlman",
    image: "https://image2url.com/r2/default/images/1773030535115-f2041c60-0d97-4275-bf7b-315f5bd4b94f.png",
    caption: "Inventor of the Spanning Tree Protocol.",
    color: "#22d3ee", // Collaboration (Cyan)
    nodeSource: "Collaboration"
  }
];

export const WomenInTechGallery: React.FC = () => {
  return (
    <div id="gallery-section" className="relative py-48 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent">
      
      {/* Constellation Bridge Lines */}
      <div className="absolute top-0 left-0 w-full h-96 pointer-events-none overflow-visible">
        <svg viewBox="0 0 1200 400" className="w-full h-full preserve-3d">
          {WOMEN_FIGURES.map((woman, idx) => {
            // Calculate start and end points for lines
            // Start points roughly correspond to node positions in the hero
            const startX = 300 + (idx * 200);
            const endX = 150 + (idx * 300);
            return (
              <motion.path
                key={`bridge-line-${idx}`}
                d={`M ${startX},-100 C ${startX},100 ${endX},150 ${endX},400`}
                fill="none"
                stroke={woman.color}
                strokeWidth="0.8"
                strokeOpacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 3, delay: idx * 0.2, ease: "easeInOut" }}
              />
            );
          })}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-40 relative z-10"
      >
        <p className="text-[10px] uppercase tracking-[1.2em] text-white/30 mb-6 font-medium">
          The Constellation Continues
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic uppercase">
          Women Who<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
            Shaped the Code
          </span>
        </h2>
      </motion.div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-12 max-w-7xl w-full px-4 relative z-10">
        {WOMEN_FIGURES.map((woman, idx) => (
          <motion.div
            key={woman.name}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 1.2, 
              delay: idx * 0.2,
              type: "spring",
              stiffness: 50
            }}
            className="group relative flex flex-col items-center"
          >
            {/* Holographic Figure Assembly */}
            <div className="relative w-full flex flex-col items-center">
              
              {/* Portrait */}
              <motion.div 
                className="relative w-64 h-80 z-10 -mb-12 transition-all duration-700 ease-out group-hover:-translate-y-6"
              >
                <Image 
                  src={woman.image}
                  alt={woman.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Shard Pedestal */}
              <motion.div 
                className="relative w-full max-w-[240px] pt-16 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden"
                style={{
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
                }}
              >
                {/* Glass Background */}
                <div className="absolute inset-0 glass-morphism -z-10 group-hover:bg-white/[0.08] transition-all duration-700" />
                
                {/* Source Node Hint */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.4em] text-white/20 font-bold">
                  {woman.nodeSource} Node Connected
                </div>

                {/* Accent Glow Strip */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ backgroundColor: woman.color, boxShadow: `0 0 20px ${woman.color}` }}
                />

                {/* Typography */}
                <div className="text-center space-y-3 z-20">
                  <h3 className="text-lg font-bold text-white tracking-widest uppercase italic group-hover:text-white transition-colors duration-500">
                    {woman.name}
                  </h3>
                  
                  <div className="h-[1px] w-6 bg-white/10 mx-auto transition-all duration-700 group-hover:w-12" 
                       style={{ backgroundColor: woman.color }} 
                  />
                  
                  <motion.p 
                    className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-[180px] mx-auto opacity-60 group-hover:opacity-100 group-hover:text-white/60 transition-all duration-700"
                  >
                    {woman.caption}
                  </motion.p>
                </div>

                {/* Interactive Shimmer */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
              </motion.div>

              {/* Base Constellation Glow */}
              <div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/5 blur-md rounded-full group-hover:bg-white/20 transition-all duration-700" 
                style={{ backgroundColor: `${woman.color}20` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="mt-64 text-center relative z-10"
      >
        <div className="w-12 h-[1px] bg-white/10 mx-auto mb-10" />
        <p className="text-[9px] uppercase tracking-[0.8em] text-white/20 italic leading-loose max-w-sm mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>

      {/* Global Background Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.02)_0%,transparent_70%)] -z-10" />
    </div>
  );
};

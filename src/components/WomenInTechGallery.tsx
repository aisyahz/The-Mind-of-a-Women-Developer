
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WOMEN_FIGURES = [
  {
    name: "Ada Lovelace",
    image: "https://image2url.com/r2/default/images/1773030196135-abfefd18-0d7a-459e-a0dd-33c332ba03ac.png",
    caption: "The first computer programmer.",
    color: "rgba(59, 130, 246, 0.5)" // Blue
  },
  {
    name: "Grace Hopper",
    image: "https://image2url.com/r2/default/images/1773030220691-47d33614-a2f1-427a-a6f1-e79dc950c94b.png",
    caption: "Pioneer of COBOL and modern languages.",
    color: "rgba(139, 92, 246, 0.5)" // Violet
  },
  {
    name: "Margaret Hamilton",
    image: "https://image2url.com/r2/default/images/1773030464884-ba20030d-6257-4673-9177-be1d42cf2029.png",
    caption: "Lead Apollo guidance software engineer.",
    color: "rgba(244, 63, 94, 0.5)" // Rose
  },
  {
    name: "Radia Perlman",
    image: "https://image2url.com/r2/default/images/1773030535115-f2041c60-0d97-4275-bf7b-315f5bd4b94f.png",
    caption: "Inventor of the Spanning Tree Protocol.",
    color: "rgba(34, 211, 238, 0.5)" // Cyan
  }
];

export const WomenInTechGallery: React.FC = () => {
  return (
    <div id="gallery-section" className="relative py-48 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent">
      {/* Decorative Constellation Connector Lines (Temporal Expansion Bridge) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-violet-500/50 to-transparent opacity-30" />
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-40"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-12 max-w-7xl w-full px-4">
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
            {/* Holographic Shard Base / Pedestal */}
            <div className="relative w-full flex flex-col items-center">
              
              {/* Portrait: Emerging from the base */}
              <motion.div 
                className="relative w-64 h-80 z-10 -mb-12 transition-all duration-700 ease-out group-hover:-translate-y-6"
              >
                <Image 
                  src={woman.image}
                  alt={woman.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Subtle base blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* The Shard Pedestal */}
              <motion.div 
                className="relative w-full max-w-[240px] pt-16 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden"
                style={{
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
                }}
              >
                {/* Glass Background */}
                <div className="absolute inset-0 glass-morphism -z-10 group-hover:bg-white/[0.08] transition-all duration-700" />
                
                {/* Accent Glow Strip */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ backgroundColor: woman.color, boxShadow: `0 0 15px ${woman.color}` }}
                />

                {/* Typography inside the pedestal */}
                <div className="text-center space-y-3 z-20">
                  <h3 className="text-lg font-bold text-white tracking-widest uppercase italic group-hover:text-white transition-colors duration-500">
                    {woman.name}
                  </h3>
                  
                  <div className="h-[1px] w-6 bg-white/10 mx-auto transition-all duration-700 group-hover:w-12" 
                       style={{ backgroundColor: `rgba(255,255,255,${0.1})` }} 
                  />
                  
                  <motion.p 
                    className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-[180px] mx-auto opacity-60 group-hover:opacity-100 group-hover:text-white/60 transition-all duration-700"
                  >
                    {woman.caption}
                  </motion.p>
                </div>

                {/* Interactive shimmer pass inside shard */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
              </motion.div>

              {/* Decorative Constellation Sparkle under pedestal */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-700 blur-[1px]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Poetic Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="mt-64 text-center"
      >
        <div className="w-12 h-[1px] bg-white/10 mx-auto mb-10" />
        <p className="text-[9px] uppercase tracking-[0.8em] text-white/20 italic leading-loose max-w-sm mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>

      {/* Global Vignette for section depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.02)_0%,transparent_70%)] -z-10" />
    </div>
  );
};

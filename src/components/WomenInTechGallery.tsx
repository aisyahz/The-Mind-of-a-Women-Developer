"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WOMEN_FIGURES = [
  {
    name: "Ada Lovelace",
    image: "https://image2url.com/r2/default/images/1773030196135-abfefd18-0d7a-459e-a0dd-33c332ba03ac.png",
    caption: "Often regarded as the first computer programmer.",
    color: "#a855f7",
    nodeSource: "Creativity",
    startX: 400,
  },
  {
    name: "Grace Hopper",
    image: "https://image2url.com/r2/default/images/1773030220691-47d33614-a2f1-427a-a6f1-e79dc950c94b.png",
    caption: "Pioneer of modern programming languages and creator of COBOL.",
    color: "#3b82f6",
    nodeSource: "Logic",
    startX: 520,
  },
  {
    name: "Margaret Hamilton",
    image: "https://image2url.com/r2/default/images/1773030464884-ba20030d-6257-4673-9177-be1d42cf2029.png",
    caption: "Led the development of the Apollo guidance software.",
    color: "#f43f5e",
    nodeSource: "Empathy",
    startX: 300,
  },
  {
    name: "Radia Perlman",
    image: "https://image2url.com/r2/default/images/1773030535115-f2041c60-0d97-4275-bf7b-315f5bd4b94f.png",
    caption: "Invented key networking protocols fundamental to the modern internet.",
    color: "#22d3ee",
    nodeSource: "Collaboration",
    startX: 560,
  }
];

export const WomenInTechGallery: React.FC = () => {
  return (
    <div id="gallery-section" className="relative py-64 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Constellation Bridge Lines */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-visible">
        <svg viewBox="0 0 1200 800" className="w-full h-full preserve-3d">
          {WOMEN_FIGURES.map((woman, idx) => {
            const startX = woman.startX || (300 + idx * 200);
            const endX = 150 + (idx * 300);
            return (
              <motion.path
                key={`bridge-line-${idx}`}
                d={`M ${startX},-200 C ${startX},200 ${endX},300 ${endX},600`}
                fill="none"
                stroke={woman.color}
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                transition={{ 
                  duration: 5.0,
                  delay: idx * 0.5, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center mb-56 relative z-10"
      >
        <p className="text-[10px] uppercase tracking-[1.5em] text-white/20 mb-8 font-medium">
          The constellation that came before us.
        </p>
        <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic uppercase leading-none">
          Women Who <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
            Shaped the Code
          </span>
        </h2>
      </motion.div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 md:gap-16 max-w-7xl w-full px-4 relative z-10">
        {WOMEN_FIGURES.map((woman, idx) => (
          <div key={woman.name} className="relative flex flex-col items-center">
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.4] }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, delay: 2.5 + idx * 0.4, ease: "easeOut" }}
              className="absolute top-20 w-4 h-4 rounded-full blur-xl"
              style={{ backgroundColor: woman.color }}
            />

            <motion.div
              initial={{ opacity: 0, filter: 'blur(30px)', scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 3.5, delay: 3.5 + idx * 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col items-center w-full"
            >
              <div className="relative w-full flex flex-col items-center">
                
                {/* Portrait */}
                <motion.div 
                  className="relative w-64 h-80 z-10 -mb-12 transition-all duration-1000 ease-out group-hover:-translate-y-8"
                >
                  <Image 
                    src={woman.image}
                    alt={woman.name}
                    fill
                    className="object-contain filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-110 group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Pedestal Panel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 5.5 + idx * 0.4 }}
                  className="relative w-full max-w-[240px] pt-20 pb-12 px-8 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)',
                  }}
                >
                  <div className="absolute inset-0 glass-morphism -z-10 bg-white/[0.02] border-white/5 group-hover:bg-white/[0.08] transition-all duration-700" />
                  
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.6em] text-white/20 font-bold whitespace-nowrap">
                    {woman.nodeSource} Branch
                  </div>

                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-[1.5px] opacity-10 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundColor: woman.color, boxShadow: `0 0 25px ${woman.color}` }}
                  />

                  <div className="text-center space-y-4 z-20">
                    <h3 className="text-xl font-bold text-white tracking-[0.15em] uppercase italic group-hover:text-white transition-colors duration-500">
                      {woman.name}
                    </h3>
                    
                    <div className="h-[1px] w-8 bg-white/10 mx-auto transition-all duration-700 group-hover:w-16" 
                         style={{ backgroundColor: woman.color }} 
                    />
                    
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.25em] leading-relaxed max-w-[160px] mx-auto group-hover:text-white/60 transition-all duration-700">
                      {woman.caption}
                    </p>
                  </div>

                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"
                  />
                </motion.div>

                <div 
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-1 blur-xl opacity-20 group-hover:opacity-40 transition-all duration-1000" 
                  style={{ backgroundColor: woman.color }}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Poetic Line Under Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 }}
        className="mt-72 text-center relative z-10"
      >
        <div className="w-16 h-[1px] bg-white/10 mx-auto mb-12" />
        <p className="text-[10px] uppercase tracking-[1em] text-white/20 italic leading-loose max-w-md mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.03)_0%,transparent_70%)] -z-10" />
    </div>
  );
};

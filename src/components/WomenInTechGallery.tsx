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

const OrbitingParticles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          animate={{
            rotate: 360,
            x: [Math.cos(i) * 120, Math.cos(i + 2 * Math.PI) * 120],
            y: [Math.sin(i) * 120, Math.sin(i + 2 * Math.PI) * 120],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const WomenInTechGallery: React.FC = () => {
  return (
    <div id="gallery-section" className="relative py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden">
      
      {/* Constellation Bridge Lines (Background Connections) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full preserve-3d">
          {WOMEN_FIGURES.map((woman, idx) => {
            if (idx === WOMEN_FIGURES.length - 1) return null;
            // Choreographed timing: Line appears after current woman and before next woman
            const lineDelay = 1.2 + idx * 1.5; 
            return (
              <motion.line
                key={`bridge-${idx}`}
                x1={150 + (idx * 300)}
                y1={400}
                x2={150 + ((idx + 1) * 300)}
                y2={400}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: lineDelay, ease: "easeInOut" }}
              />
            );
          })}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-12 max-w-7xl w-full px-4 relative z-10">
        {WOMEN_FIGURES.map((woman, idx) => {
          // Sequential reveal timing
          const figureDelay = 0.5 + idx * 1.5;

          return (
            <div key={woman.name} className="relative flex flex-col items-center">
              
              {/* Constellation Node Core (The Star Background) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.4] }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, delay: figureDelay }}
                className="absolute top-24 w-64 h-64 rounded-full blur-[80px]"
                style={{ backgroundColor: woman.color }}
              />

              {/* Orbiting Elements */}
              <div className="absolute top-24 w-80 h-80 flex items-center justify-center pointer-events-none">
                <OrbitingParticles color={woman.color} />
                
                {/* Faint Orbit Rings */}
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

              <motion.div
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.9, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  filter: 'blur(0px)', 
                  scale: 1, 
                  y: 0,
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: figureDelay + 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center w-full"
              >
                {/* Reveal Pulse Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5, 2] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: figureDelay }}
                  className="absolute top-48 w-full h-1 bg-white/20 blur-2xl rounded-full"
                />

                <div className="relative w-full flex flex-col items-center">
                  
                  {/* Portrait - Styled as Node Content */}
                  <motion.div 
                    className="relative w-56 h-72 z-10 -mb-10 transition-all duration-700 ease-out group-hover:-translate-y-6"
                  >
                    <Image 
                      src={woman.image}
                      alt={woman.name}
                      fill
                      className="object-contain filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-110 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                  </motion.div>

                  {/* Pedestal Panel */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.0, delay: figureDelay + 0.5 }}
                    className="relative w-full max-w-[220px] pt-16 pb-10 px-6 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      clipPath: 'polygon(15% 0%, 85% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)',
                    }}
                  >
                    <div className="absolute inset-0 glass-morphism -z-10 bg-white/[0.02] border-white/5 group-hover:bg-white/[0.06] transition-all duration-500" />
                    
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.6em] text-white/20 font-bold whitespace-nowrap">
                      {woman.nodeSource} Branch
                    </div>

                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-10 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: woman.color, boxShadow: `0 0 20px ${woman.color}` }}
                    />

                    <div className="text-center space-y-3 z-20">
                      <h3 className="text-lg font-bold text-white tracking-[0.12em] uppercase italic group-hover:text-white transition-colors duration-400">
                        {woman.name}
                      </h3>
                      
                      <div className="h-[1px] w-6 bg-white/10 mx-auto transition-all duration-500 group-hover:w-12" 
                           style={{ backgroundColor: woman.color }} 
                      />
                      
                      <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed max-w-[140px] mx-auto group-hover:text-white/60 transition-all duration-500">
                        {woman.caption}
                      </p>
                    </div>

                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                  </motion.div>

                  {/* Node Connection Base Glow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 blur-xl" 
                    style={{ backgroundColor: woman.color }}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Poetic Line Under Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mt-48 text-center relative z-10"
      >
        <div className="w-12 h-[1px] bg-white/10 mx-auto mb-10" />
        <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 italic leading-loose max-w-sm mx-auto">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.02)_0%,transparent_70%)] -z-10" />
    </div>
  );
};
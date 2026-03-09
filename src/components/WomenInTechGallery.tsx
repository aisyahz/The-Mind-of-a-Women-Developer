"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WOMEN_FIGURES = [
  {
    name: "Ada Lovelace",
    image: "https://image2url.com/r2/default/images/1773030196135-abfefd18-0d7a-459e-a0dd-33c332ba03ac.png",
    caption: "Often regarded as the first computer programmer."
  },
  {
    name: "Grace Hopper",
    image: "https://image2url.com/r2/default/images/1773030220691-47d33614-a2f1-427a-a6f1-e79dc950c94b.png",
    caption: "Pioneer of modern programming languages and creator of COBOL."
  },
  {
    name: "Margaret Hamilton",
    image: "https://image2url.com/r2/default/images/1773030464884-ba20030d-6257-4673-9177-be1d42cf2029.png",
    caption: "Led the development of the Apollo guidance software."
  },
  {
    name: "Radia Perlman",
    image: "https://image2url.com/r2/default/images/1773030535115-f2041c60-0d97-4275-bf7b-315f5bd4b94f.png",
    caption: "Invented key networking protocols fundamental to the modern internet."
  }
];

export const WomenInTechGallery: React.FC = () => {
  return (
    <div className="py-32 px-6 md:px-24 flex flex-col items-center justify-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-32"
      >
        <p className="text-[10px] uppercase tracking-[1em] text-white/30 mb-6 font-medium">
          The Constellation Continues
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic uppercase">
          Women Who<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
            Shaped the Code
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 max-w-7xl w-full">
        {WOMEN_FIGURES.map((woman, idx) => (
          <motion.div
            key={woman.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: idx * 0.2 }}
            className="group relative flex flex-col items-center text-center"
          >
            {/* Background Constellation Lines (Appear on Hover) */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 240 240" className="opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
                <motion.path
                  d="M 20,40 L 220,200 M 220,40 L 20,200"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <circle cx="20" cy="40" r="1.5" fill="white" />
                <circle cx="220" cy="200" r="1.5" fill="white" />
                <circle cx="220" cy="40" r="1.5" fill="white" />
                <circle cx="20" cy="200" r="1.5" fill="white" />
              </svg>
            </div>

            {/* Portrait */}
            <div className="relative w-64 h-80 mb-8 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:glow-md">
              <Image 
                src={woman.image}
                alt={woman.name}
                fill
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              {/* Subtle overlay to blend into background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-40" />
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight uppercase italic group-hover:text-primary transition-colors duration-500">
                {woman.name}
              </h3>
              
              <div className="h-[1px] w-8 bg-white/10 mx-auto transition-all duration-500 group-hover:w-16 group-hover:bg-primary/40" />
              
              <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                {woman.caption}
              </p>
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
        className="mt-48 text-center"
      >
        <div className="w-16 h-[1px] bg-white/10 mx-auto mb-10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 italic leading-loose">
          Innovation is not a single mind.<br />
          It is a constellation of pioneers.
        </p>
      </motion.div>
    </div>
  );
};

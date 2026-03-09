
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

export default function Home() {
  const [isExplored, setIsExplored] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);

  return (
    <main className={`relative min-h-screen w-full bg-[#050508] flex flex-col items-center ${!isExplored ? 'overflow-hidden h-screen' : 'overflow-x-hidden'}`}>
      {/* Pinned Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Hero Section: The Mind of a Woman Developer */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10 shrink-0">
        <div className="relative w-full h-full">
          <NeuralConstellation onExplore={() => setIsExplored(true)} />
        </div>

        {/* Narrative Intro Line */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, delay: 5 }}
            className="text-[9px] md:text-[10px] uppercase tracking-[1.2em] text-white/30 font-medium glow-sm whitespace-nowrap italic"
          >
            Before the code, there was curiosity.
          </motion.p>
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-light">
              Cognitive Core // Ver. 2.5
            </p>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
        </div>
        
        <div className="absolute bottom-12 right-12 z-20 pointer-events-none text-right">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-light">
            Neural Constellation Projection
          </p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/10 mt-1">
            Galleria Digital Installation 2024
          </p>
        </div>

        {/* Global Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-5" />
      </section>

      {/* Conditional Content: Revealed after curiosity node is clicked */}
      <AnimatePresence>
        {isExplored && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full flex flex-col"
          >
            {/* Gallery Section: Women Who Shaped the Code */}
            <section className="relative w-full z-20 bg-transparent">
              <WomenInTechGallery />
            </section>

            {/* Poetic Ending Section */}
            <section className="relative w-full py-48 flex flex-col items-center justify-center z-20 bg-transparent overflow-hidden">
              <div className="text-center space-y-12 max-w-2xl px-6 relative">
                
                {/* Visual Echo: Forming Nodes */}
                <div className="flex justify-center gap-6 mb-16">
                  {[0, 1, 2].map((i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: [0, 0.4, 0.2], scale: [0, 1.2, 1] }}
                      transition={{ delay: i * 0.3, duration: 2 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/40 blur-[1px]" 
                    />
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase italic leading-none">
                    The Constellation <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
                      Continues
                    </span>
                  </h2>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 2 }}
                  className="text-[10px] md:text-xs uppercase tracking-[1.5em] text-white/30 font-medium leading-loose pt-8"
                >
                  Every line of code <br className="md:hidden" /> writes the future.
                </motion.p>

                {/* The Interactive Next Star: Inspirational Climax */}
                <div className="pt-48 relative flex flex-col items-center">
                   
                   {/* Connection Path: Leading to the user */}
                   <motion.div 
                     initial={{ height: 0 }}
                     whileInView={{ height: 160 }}
                     transition={{ duration: 3, ease: "easeInOut" }}
                     className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-transparent"
                   />

                   <motion.div
                    onMouseEnter={() => setIsStarHovered(true)}
                    onMouseLeave={() => setIsStarHovered(false)}
                    className="relative cursor-none group"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 2 }}
                   >
                     {/* Pulsing Core */}
                     <motion.div
                       animate={{ 
                         scale: [1, 1.5, 1],
                         opacity: [0.6, 1, 0.6],
                         boxShadow: [
                           "0 0 15px rgba(255, 255, 255, 0.3)",
                           "0 0 40px rgba(139, 92, 246, 0.7)",
                           "0 0 15px rgba(255, 255, 255, 0.3)"
                         ]
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       className="w-3 h-3 bg-white rounded-full relative z-10"
                     />
                     
                     {/* External Atmospheric Rings */}
                     <motion.div
                        animate={{ scale: [1, 3, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0 -m-3 rounded-full border border-white/10"
                     />
                     <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.1, 0, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 -m-1 rounded-full border border-primary/20"
                     />

                     {/* Tooltip Message: The Reveal */}
                     <AnimatePresence>
                       {isStarHovered && (
                         <motion.div
                           initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.95 }}
                           animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                           exit={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                           className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
                         >
                           <p className="text-[11px] uppercase tracking-[0.8em] text-white/70 font-bold italic transition-colors duration-700 group-hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                             Maybe the next star is you.
                           </p>
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: "100%" }}
                             className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2 mx-auto"
                           />
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                </div>

                {/* Ambient Decorative Nodes: Creating the feeling of a new constellation */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 0.05, 0] }}
                      transition={{ 
                        duration: 4 + Math.random() * 4, 
                        repeat: Infinity, 
                        delay: Math.random() * 10 
                      }}
                      className="absolute w-[1px] h-[1px] bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Horizon Gradient */}
              <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


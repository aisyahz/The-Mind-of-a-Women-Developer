
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

export default function Home() {
  const [isExplored, setIsExplored] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);

  // Character staggered animation variants
  const charVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.8 + i * 0.04,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  const finalMessage = "Maybe the next star is you.";

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
            <section className="relative w-full py-64 flex flex-col items-center justify-center z-20 bg-transparent overflow-hidden">
              <div className="text-center space-y-12 max-w-2xl px-6 relative">
                
                {/* Visual Echo: Forming Nodes */}
                <div className="flex justify-center gap-6 mb-24">
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
                  transition={{ duration: 2, ease: "easeOut" }}
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
                  transition={{ delay: 1.2, duration: 2 }}
                  className="text-[10px] md:text-xs uppercase tracking-[1.5em] text-white/30 font-medium leading-loose pt-8"
                >
                  Every line of code <br className="md:hidden" /> writes the future.
                </motion.p>

                {/* THE MIND-BLOWN CLIMAX */}
                <div className="pt-64 relative flex flex-col items-center">
                   
                   {/* Divine Connection Path: The "Arrow" that leads to the final star */}
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     whileInView={{ height: 280, opacity: 1 }}
                     transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
                     className="absolute -top-24 left-1/2 -translate-x-1/2 w-[2px] z-0 overflow-hidden"
                   >
                     <div className="w-full h-full bg-gradient-to-b from-primary/0 via-primary/40 to-white/60" />
                     {/* Bouncing Pulse within the arrow path */}
                     <motion.div
                       animate={{ y: [0, 280] }}
                       transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                       className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-white/80 to-transparent"
                     />
                   </motion.div>

                   <motion.div
                    onMouseEnter={() => setIsStarHovered(true)}
                    onMouseLeave={() => setIsStarHovered(false)}
                    className="relative cursor-none group"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 2.5, ease: "easeOut" }}
                   >
                     {/* Supernova Atmospheric Expanders (Visible on Hover) */}
                     <AnimatePresence>
                       {isStarHovered && (
                         <>
                           <motion.div
                             initial={{ scale: 0, opacity: 0 }}
                             animate={{ scale: 15, opacity: 0.1 }}
                             exit={{ scale: 0, opacity: 0 }}
                             transition={{ duration: 1.5, ease: "easeOut" }}
                             className="absolute inset-0 -m-10 rounded-full bg-primary/20 blur-[100px] pointer-events-none"
                           />
                           <motion.div
                             initial={{ scale: 0, opacity: 0 }}
                             animate={{ scale: 8, opacity: 0.15 }}
                             exit={{ scale: 0, opacity: 0 }}
                             transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                             className="absolute inset-0 -m-10 rounded-full bg-white/10 blur-[60px] pointer-events-none"
                           />
                         </>
                       )}
                     </AnimatePresence>

                     {/* Pulsing Core Star */}
                     <motion.div
                       animate={{ 
                         scale: isStarHovered ? [1.2, 1.4, 1.2] : [1, 1.3, 1],
                         opacity: isStarHovered ? 1 : [0.6, 1, 0.6],
                         boxShadow: isStarHovered 
                           ? "0 0 60px rgba(255, 255, 255, 0.9), 0 0 100px rgba(139, 92, 246, 0.8)"
                           : [
                             "0 0 15px rgba(255, 255, 255, 0.3)",
                             "0 0 40px rgba(139, 92, 246, 0.7)",
                             "0 0 15px rgba(255, 255, 255, 0.3)"
                           ]
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       className="w-4 h-4 bg-white rounded-full relative z-10"
                     />
                     
                     {/* External Atmospheric Rings */}
                     <motion.div
                        animate={{ scale: isStarHovered ? [1, 6, 1] : [1, 3, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0 -m-4 rounded-full border border-white/20"
                     />
                     <motion.div
                        animate={{ scale: isStarHovered ? [1, 4, 1] : [1, 2, 1], opacity: [0.1, 0, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 -m-2 rounded-full border border-primary/30"
                     />

                     {/* The "Mindblown" Text Reveal */}
                     <AnimatePresence>
                       {isStarHovered && (
                         <motion.div
                           initial={{ opacity: 0, y: 40 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                           className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                         >
                           <div className="flex gap-[0.4em] justify-center">
                             {finalMessage.split("").map((char, i) => (
                               <motion.span
                                 key={i}
                                 custom={i}
                                 variants={charVariants}
                                 initial="hidden"
                                 animate="visible"
                                 className="text-[12px] md:text-[14px] uppercase tracking-[0.1em] text-white font-bold italic drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                               >
                                 {char === " " ? "\u00A0" : char}
                               </motion.span>
                             ))}
                           </div>
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: "100%" }}
                             transition={{ duration: 1.5, delay: 0.5 }}
                             className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-4 mx-auto"
                           />
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                </div>

                {/* Ambient Decorative Nodes: Creating the feeling of a new constellation */}
                <div className="absolute inset-0 pointer-events-none -z-10">
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 0.08, 0] }}
                      transition={{ 
                        duration: 5 + Math.random() * 5, 
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

              {/* Bottom Horizon Gradient: A sense of a new dawn */}
              <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Divine Arrow Guidance (Points to the user node from above) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: [0, 0.5, 0], y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-48 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                  <path d="M12 0V40M12 40L6 34M12 40L18 34" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
                </svg>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

export default function Home() {
  const [isExplored, setIsExplored] = useState(false);
  const [isFinalRevealed, setIsFinalRevealed] = useState(false);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [isFinalStarHovered, setIsFinalStarHovered] = useState(false);
  const [userStars, setUserStars] = useState<{ x: number, y: number }[]>([]);

  // Character staggered animation variants
  const charVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.03,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const handleLegacyComplete = () => {
    setIsFinalRevealed(true);
    setTimeout(() => {
      const finalSection = document.getElementById('final-section');
      if (finalSection) {
        finalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleFinalStarClick = () => {
    // Add a new "user star" near the central star
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    setUserStars(prev => [...prev, { x, y }]);
  };

  return (
    <main className={`relative min-h-screen w-full bg-[#050508] flex flex-col items-center ${!isExplored ? 'overflow-hidden h-screen' : 'overflow-x-hidden'}`}>
      {/* Pinned Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10 shrink-0">
        <div className="relative w-full h-full">
          <NeuralConstellation 
            onExplore={() => setIsExplored(true)} 
            externalHighlightId={highlightedNodeId}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-5" />
      </section>

      {/* Sequential Journey */}
      <AnimatePresence>
        {isExplored && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full flex flex-col"
          >
            {/* Gallery Section */}
            <section className="relative w-full z-20 bg-transparent">
              <WomenInTechGallery 
                onPioneerHover={(id) => setHighlightedNodeId(id)} 
                onLegacyComplete={handleLegacyComplete}
              />
            </section>

            {/* Final Section: Continuation */}
            <AnimatePresence>
              {isFinalRevealed && (
                <motion.section 
                  id="final-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative w-full py-64 flex flex-col items-center justify-center z-20 bg-transparent overflow-hidden"
                >
                  <div className="text-center space-y-16 max-w-2xl px-6 relative">
                    
                    {/* Visual Entrance: Sequential Star Birth */}
                    <div className="flex justify-center gap-8 mb-32">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: [0, 0.6, 0.2], scale: [0, 1.5, 1] }}
                          transition={{ delay: i * 0.4, duration: 2.5 }}
                          className="w-2 h-2 rounded-full bg-primary/50 blur-[2px]" 
                        />
                      ))}
                    </div>
                    
                    {/* Animated Titles */}
                    <div className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      >
                        <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-none">
                          The Constellation <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
                            Continues
                          </span>
                        </h2>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 2 }}
                        className="space-y-6 pt-12"
                      >
                        <p className="text-[11px] md:text-xs uppercase tracking-[1.5em] text-white/40 font-medium leading-loose">
                          Every line of code writes the future.
                        </p>
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[1.2em] text-white/20 font-light">
                          And every curious mind adds a new star.
                        </p>
                      </motion.div>
                    </div>

                    {/* THE FINAL INTERACTIVE STAR */}
                    <div className="pt-80 relative flex flex-col items-center">
                       
                       {/* Connection Pillar (The Divine Arrow) */}
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }}
                         whileInView={{ height: 320, opacity: 1 }}
                         transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
                         className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1px] z-0 overflow-hidden"
                       >
                         <div className="w-full h-full bg-gradient-to-b from-primary/0 via-primary/50 to-white" />
                         <motion.div
                           animate={{ y: [0, 320] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/80 to-transparent"
                         />
                       </motion.div>

                       <motion.div
                        onMouseEnter={() => setIsFinalStarHovered(true)}
                        onMouseLeave={() => setIsFinalStarHovered(false)}
                        onClick={handleFinalStarClick}
                        className="relative cursor-none group"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
                       >
                         {/* Supernova Atmospheric Effect */}
                         <AnimatePresence>
                           {isFinalStarHovered && (
                             <>
                               <motion.div
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ scale: 20, opacity: 0.1 }}
                                 exit={{ scale: 0.5, opacity: 0 }}
                                 transition={{ duration: 2, ease: "easeOut" }}
                                 className="absolute inset-0 -m-10 rounded-full bg-primary/30 blur-[120px] pointer-events-none"
                               />
                               <motion.div
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ scale: 12, opacity: 0.2 }}
                                 exit={{ scale: 0.5, opacity: 0 }}
                                 transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                                 className="absolute inset-0 -m-10 rounded-full bg-white/20 blur-[80px] pointer-events-none"
                               />
                             </>
                           )}
                         </AnimatePresence>

                         {/* Core Star Node */}
                         <motion.div
                           animate={{ 
                             scale: isFinalStarHovered ? [1.3, 1.5, 1.3] : [1, 1.4, 1],
                             opacity: isFinalStarHovered ? 1 : [0.7, 1, 0.7],
                             boxShadow: isFinalStarHovered 
                               ? "0 0 80px rgba(255, 255, 255, 1), 0 0 120px rgba(139, 92, 246, 0.9)"
                               : "0 0 20px rgba(255, 255, 255, 0.4)"
                           }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           className="w-5 h-5 bg-white rounded-full relative z-10"
                         />

                         {/* User Spawned Stars */}
                         {userStars.map((star, idx) => (
                           <motion.div
                             key={`user-star-${idx}`}
                             initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                             animate={{ scale: 1, opacity: [0, 1, 0.6], x: star.x, y: star.y }}
                             transition={{ duration: 2, ease: "easeOut" }}
                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full z-10 glow-sm"
                           />
                         ))}

                         {/* User Connections */}
                         {userStars.length > 0 && (
                            <svg className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none overflow-visible">
                              {userStars.map((star, idx) => (
                                <motion.line
                                  key={`line-${idx}`}
                                  x1="100" y1="100"
                                  x2={100 + star.x} y2={100 + star.y}
                                  stroke="white" strokeWidth="0.5" strokeOpacity="0.3"
                                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                />
                              ))}
                            </svg>
                         )}
                         
                         {/* The Message Materialization */}
                         <AnimatePresence>
                           {isFinalStarHovered && (
                             <motion.div
                               initial={{ opacity: 0, y: 50 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                               className="absolute top-24 left-1/2 -translate-x-1/2 whitespace-nowrap"
                             >
                               <div className="flex gap-[0.3em] justify-center">
                                 {"Maybe the next star is you.".split("").map((char, i) => (
                                   <motion.span
                                     key={i}
                                     custom={i}
                                     variants={charVariants}
                                     initial="hidden"
                                     animate="visible"
                                     className="text-xs md:text-sm uppercase tracking-[0.2em] text-white font-bold italic drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                   >
                                     {char === " " ? "\u00A0" : char}
                                   </motion.span>
                                 ))}
                               </div>
                               <motion.p 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 0.3 }}
                                 className="text-[8px] uppercase tracking-[0.6em] text-white text-center mt-6"
                               >
                                 Click to ignite your node
                               </motion.p>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </motion.div>
                    </div>
                  </div>

                  {/* Environment Accents */}
                  <div className="absolute inset-0 pointer-events-none -z-10">
                    {[...Array(60)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 0.1, 0] }}
                        transition={{ 
                          duration: 4 + Math.random() * 6, 
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
                </motion.section>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

interface BranchNode {
  x: number;
  y: number;
  delay: number;
}

interface ConstellationBranch {
  id: string;
  path: string;
  nodes: BranchNode[];
}

interface EnvironmentAccent {
  id: number;
  duration: number;
  delay: number;
  top: string;
  left: string;
}

export default function Home() {
  const router = useRouter();
  const [isExplored, setIsExplored] = useState(false);
  const [isFinalRevealed, setIsFinalRevealed] = useState(false);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [isFinalStarHovered, setIsFinalStarHovered] = useState(false);
  const [isIgnited, setIsIgnited] = useState(false);
  const [isSupernova, setIsSupernova] = useState(false);
  const [branches, setBranches] = useState<ConstellationBranch[]>([]);
  const [showConceptualIntro, setShowConceptualIntro] = useState(true);
  const [environmentAccents, setEnvironmentAccents] = useState<EnvironmentAccent[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConceptualIntro(false);
    }, 7000);

    // Generate environment accents on client to avoid hydration mismatch
    const generatedAccents = [...Array(60)].map((_, i) => ({
      id: i,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 10,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setEnvironmentAccents(generatedAccents);

    return () => clearTimeout(timer);
  }, []);

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
    if (isIgnited) {
      setIsSupernova(true);
      setTimeout(() => {
        router.push('/equity');
      }, 2500);
      return;
    }
    
    setIsIgnited(true);

    // Generate organic branching paths
    const newBranches: ConstellationBranch[] = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
      const length = 150 + Math.random() * 150;
      
      const cp1x = Math.cos(angle + 0.4) * (length * 0.4);
      const cp1y = Math.sin(angle + 0.4) * (length * 0.4);
      const cp2x = Math.cos(angle - 0.2) * (length * 0.7);
      const cp2y = Math.sin(angle - 0.2) * (length * 0.7);
      const endX = Math.cos(angle) * length;
      const endY = Math.sin(angle) * length;

      const path = `M 0,0 C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
      
      const branchNodes: BranchNode[] = Array.from({ length: 3 }).map((_, nodeIdx) => {
        const t = (nodeIdx + 1) / 4;
        return {
          x: endX * t + (Math.random() * 20 - 10),
          y: endY * t + (Math.random() * 20 - 10),
          delay: 2 + (i * 0.2) + (nodeIdx * 0.5)
        };
      });

      return {
        id: `branch-${i}`,
        path,
        nodes: branchNodes
      };
    });

    setBranches(newBranches);
  };

  return (
    <main className={`relative min-h-screen w-full bg-[#050508] flex flex-col items-center ${!isExplored ? 'overflow-hidden h-screen' : 'overflow-x-hidden'}`}>
      
      {/* Supernova Flash Overlay */}
      <AnimatePresence>
        {isSupernova && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white pointer-events-none"
            transition={{ duration: 1.5, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* Conceptual Intro Sequence */}
      <AnimatePresence>
        {showConceptualIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050508] flex items-center justify-center p-6 text-center"
          >
            <div className="max-w-3xl space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="space-y-6"
              >
                <p className="text-sm md:text-lg text-white/90 font-light leading-relaxed tracking-wide italic font-body">
                  “Gender equity in technology is not just about representation. <br className="hidden md:block" />
                  It is about recognizing the constellation of minds that shaped computing <br className="hidden md:block" />
                  and ensuring the next generation has space to shine.”
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 3 }}
                className="space-y-4"
              >
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
                <p className="text-[10px] uppercase tracking-[1em] text-white/40 font-medium">
                  Past · Present · Future
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10 shrink-0">
        <NeuralConstellation 
          onExplore={() => setIsExplored(true)} 
          externalHighlightId={highlightedNodeId}
        />
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
                  <div className="text-center space-y-16 max-w-4xl px-6 relative">
                    
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
                        className={`relative group ${isSupernova ? 'cursor-default' : 'cursor-none'}`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
                       >
                         {/* Supernova Atmospheric Effect */}
                         <AnimatePresence>
                           {(isFinalStarHovered || isIgnited) && !isSupernova && (
                             <>
                               <motion.div
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ 
                                   scale: isIgnited ? [2, 25] : 20, 
                                   opacity: isIgnited ? [0.1, 0.05] : 0.1 
                                 }}
                                 exit={{ scale: 0.5, opacity: 0 }}
                                 transition={{ duration: isIgnited ? 4 : 2, ease: "easeOut" }}
                                 className="absolute inset-0 -m-10 rounded-full bg-primary/30 blur-[120px] pointer-events-none"
                               />
                               <motion.div
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ 
                                   scale: isIgnited ? [2, 15] : 12, 
                                   opacity: isIgnited ? [0.2, 0.1] : 0.2 
                                 }}
                                 exit={{ scale: 0.5, opacity: 0 }}
                                 transition={{ duration: isIgnited ? 3 : 1.5, ease: "easeOut", delay: 0.1 }}
                                 className="absolute inset-0 -m-10 rounded-full bg-white/20 blur-[80px] pointer-events-none"
                               />
                             </>
                           )}
                         </AnimatePresence>

                         {/* Branching Constellation SVG Overlay */}
                         {isIgnited && (
                           <svg className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none overflow-visible z-0">
                             <g transform="translate(400, 400)">
                               {branches.map((branch) => (
                                 <g key={branch.id}>
                                   <motion.path
                                     key={`${branch.id}-path`}
                                     d={branch.path}
                                     fill="none"
                                     stroke="white"
                                     strokeWidth="0.5"
                                     strokeOpacity="0.2"
                                     initial={{ pathLength: 0, filter: 'blur(2px)' }}
                                     animate={{ pathLength: 1, filter: 'blur(0px)' }}
                                     transition={{ duration: 6, ease: "easeInOut", delay: 1 }}
                                   />
                                   {branch.nodes.map((node, nodeIdx) => (
                                     <motion.circle
                                       key={`${branch.id}-node-${nodeIdx}`}
                                       cx={node.x}
                                       cy={node.y}
                                       r="1"
                                       fill="white"
                                       initial={{ opacity: 0, scale: 0 }}
                                       animate={{ opacity: 0.6, scale: 1 }}
                                       transition={{ duration: 2, delay: node.delay }}
                                       className="glow-sm"
                                     />
                                   ))}
                                 </g>
                               ))}
                             </g>
                           </svg>
                         )}

                         {/* Core Star Node */}
                         <motion.div
                           animate={{ 
                             scale: isSupernova ? 50 : (isIgnited ? [1.5, 2.5, 2] : (isFinalStarHovered ? [1.3, 1.5, 1.3] : [1, 1.4, 1])),
                             opacity: isSupernova ? 1 : ((isFinalStarHovered || isIgnited) ? 1 : [0.7, 1, 0.7]),
                             boxShadow: (isFinalStarHovered || isIgnited)
                               ? "0 0 80px rgba(255, 255, 255, 1), 0 0 120px rgba(139, 92, 246, 0.9)"
                               : "0 0 20px rgba(255, 255, 255, 0.4)"
                           }}
                           transition={{ duration: isSupernova ? 2 : (isIgnited ? 4 : 4), repeat: isSupernova ? 0 : (isIgnited ? 0 : Infinity), ease: "easeInOut" }}
                           className="w-5 h-5 bg-white rounded-full relative z-10"
                         />
                         
                         {/* The Message Materialization */}
                         <AnimatePresence>
                           {(isFinalStarHovered || isIgnited) && !isSupernova && (
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
                                     key={`char-${i}`}
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
                               {!isIgnited && (
                                 <motion.p 
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 0.3 }}
                                   className="text-[8px] uppercase tracking-[0.6em] text-white text-center mt-6"
                                 >
                                   Click to ignite your node
                                 </motion.p>
                               )}
                               {isIgnited && (
                                 <motion.div className="flex flex-col items-center">
                                   <motion.p 
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: [0, 0.4, 0.2] }}
                                     transition={{ delay: 3, duration: 2 }}
                                     className="text-[9px] uppercase tracking-[0.8em] text-violet-300 text-center mt-8 italic"
                                   >
                                     Your curiosity has birthed a new legacy.
                                   </motion.p>
                                   <motion.p 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 4.5, duration: 1 }}
                                     className="text-[10px] uppercase tracking-[0.4em] text-white text-center mt-6 font-bold cursor-none hover:text-primary transition-colors"
                                   >
                                     Click again to see the Equity Horizon
                                   </motion.p>
                                 </motion.div>
                               )}
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </motion.div>
                    </div>
                  </div>

                  {/* Environment Accents */}
                  <div className="absolute inset-0 pointer-events-none -z-10">
                    {environmentAccents.map((accent) => (
                      <motion.div
                        key={accent.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 0.1, 0] }}
                        transition={{ 
                          duration: accent.duration, 
                          repeat: Infinity, 
                          delay: accent.delay 
                        }}
                        className="absolute w-[1px] h-[1px] bg-white rounded-full"
                        style={{
                          top: accent.top,
                          left: accent.left,
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

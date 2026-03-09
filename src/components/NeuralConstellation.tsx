
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

const SILHOUETTE_PATH = "M 350,750 C 300,720 240,650 240,450 C 240,250 350,180 480,220 C 580,250 630,350 610,480 C 630,510 610,560 550,600 C 520,700 450,750 350,730";

interface NeuralConstellationProps {
  onExplore?: () => void;
  externalHighlightId?: string | null;
}

export const NeuralConstellation: React.FC<NeuralConstellationProps> = ({ onExplore, externalHighlightId }) => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [isExpanding, setIsExpanding] = useState(false);
  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate threads only on client mount to avoid hydration mismatch
    const generatedThreads = Array.from({ length: 25 }).map(() => {
      const startX = 420 + (Math.random() - 0.5) * 120;
      const startY = 410 + (Math.random() - 0.5) * 120;
      const endX = 420 + (Math.random() - 0.5) * 380;
      const endY = 410 + (Math.random() - 0.5) * 380;
      return `M ${startX},${startY} C ${startX + (Math.random() - 0.5) * 350},${startY + (Math.random() - 0.5) * 350} ${endX + (Math.random() - 0.5) * 350},${endY + (Math.random() - 0.5) * 350} ${endX},${endY}`;
    });
    setNeuralThreads(generatedThreads);

    const brainTimer = setTimeout(() => setShowBrain(true), 3500);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 5000 + index * 400);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    if (node.id === 'curiosity' && !isExpanding) {
      setIsExpanding(true);
      
      setTimeout(() => {
        onExplore?.();
        
        setTimeout(() => {
          const gallery = document.getElementById('gallery-section');
          if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Intro Narrative */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 5.5 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[1.2em] text-white/30 font-medium glow-sm whitespace-nowrap italic"
        >
          Before the code, there was curiosity.
        </motion.p>
      </div>

      <svg viewBox="0 0 800 1000" className="relative z-10 w-full max-w-5xl h-auto overflow-visible select-none">
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.g animate={{ y: [0, -8, 0], scale: [1, 1.005, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          
          {/* Procedural Neural Threads */}
          <g opacity="0.3">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.4, 0.1] }}
                transition={{ duration: 8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </g>

          {/* Temporal Expansion Path */}
          <AnimatePresence>
            {isExpanding && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const targetX = 100 + (idx * 120);
                  const cp1x = 420 + (Math.random() - 0.5) * 200;
                  const cp2x = targetX + (Math.random() - 0.5) * 200;
                  return (
                    <motion.path
                      key={`expansion-line-${idx}`}
                      d={`M 420,410 C ${cp1x},600 ${cp2x},800 ${targetX},1300`}
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.4)"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.7, 0.2] }}
                      transition={{ duration: 6, ease: "easeInOut", delay: idx * 0.2 }}
                    />
                  );
                })}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Silhouette Trace */}
          <motion.path d={SILHOUETTE_PATH} fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4 }} />

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3 }}>
                <circle cx="420" cy="410" r="110" fill="url(#core-grad)" />
                <motion.circle
                  cx="420" cy="410" r="10" fill="white"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0.8, 0.2], filter: ['blur(8px)', 'blur(20px)', 'blur(8px)'] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Facet Nodes */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isExternallyHighlighted = externalHighlightId === node.id;
            const isActive = activeNode?.id === node.id || isExternallyHighlighted;
            const isCuriosity = node.id === 'curiosity';

            return (
              <g key={node.id} className="cursor-pointer" onMouseEnter={() => setActiveNode(node)} onMouseLeave={() => setActiveNode(null)} onClick={() => handleNodeClick(node)}>
                <AnimatePresence>
                  {isVisible && (
                    <>
                      {/* Interaction Hints */}
                      {isCuriosity && (
                        <g>
                          {[0, 1, 2].map((idx) => (
                            <motion.circle
                              key={`sonar-${idx}`} cx={node.x} cy={node.y} r={16} fill="none" stroke={node.color} strokeWidth="0.5"
                              initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 3.5, opacity: 0 }}
                              transition={{ duration: 3, repeat: Infinity, delay: idx * 1, ease: "easeOut" }}
                            />
                          ))}
                        </g>
                      )}

                      <motion.circle
                        cx={node.x} cy={node.y} r={isActive ? (isCuriosity ? 16 : 12) : (isCuriosity ? 8 : 5)}
                        fill={node.color} initial={{ scale: 0 }} animate={{ scale: 1, opacity: isCuriosity ? 1 : 0.7 }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-700"
                      />

                      <motion.text
                        x={node.x} y={node.y + (node.y > 410 ? 50 : -40)} textAnchor="middle"
                        fill={isActive ? node.color : (isCuriosity ? "white" : "rgba(255,255,255,0.2)")}
                        fontSize="8" fontWeight="600" className="font-body tracking-[0.8em] uppercase pointer-events-none transition-all duration-700"
                      >
                        {node.label}
                      </motion.text>

                      {/* Explicit Invitation */}
                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.4 }} transition={{ duration: 1 }}>
                          <text x={node.x} y={node.y + 70} textAnchor="middle" fill="white" className="text-[7px] uppercase tracking-[0.6em] font-bold">
                            {isActive ? "Discover the pioneers" : "Tap to Explore"}
                          </text>
                          <motion.path
                            d={`M ${node.x - 4} ${node.y + 80} L ${node.x} ${node.y + 84} L ${node.x + 4} ${node.y + 80}`}
                            fill="none" stroke="white" strokeWidth="1" animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </motion.g>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </motion.g>
      </svg>

      {/* Initial Landing Blur Overlay */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(40px)' }} transition={{ duration: 3 }} className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]">
            <div className="space-y-8">
              <motion.div initial={{ letterSpacing: "3em", opacity: 0 }} animate={{ letterSpacing: "1.5em", opacity: 1 }} transition={{ duration: 4 }}>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter italic uppercase leading-tight">
                  The Mind of a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    Woman Developer
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1 }}
                className="text-[10px] md:text-xs text-white/60 tracking-[0.4em] uppercase font-light mt-4 px-6 max-w-2xl mx-auto"
              >
                Where logic, creativity, empathy, collaboration, and curiosity connect.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

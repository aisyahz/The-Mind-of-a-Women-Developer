
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

const SILHOUETTE_PATH = "M 400,850 C 300,800 150,700 150,450 C 150,200 300,100 500,150 C 650,200 750,350 720,550 C 750,600 720,700 620,750 C 580,850 500,900 400,850";

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
  const [backgroundConstellations, setBackgroundConstellations] = useState<string[]>([]);
  const [coreConnections, setCoreConnections] = useState<{id: string, path: string, color: string}[]>([]);
  const [expansionPaths, setExpansionPaths] = useState<string[]>([]);
  const [discoveredNodeId, setDiscoveredNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    // Generate primary neural threads - Only on client to avoid hydration mismatch
    const generatedThreads = Array.from({ length: 45 }).map(() => {
      const startX = 420 + (Math.random() - 0.5) * 150;
      const startY = 420 + (Math.random() - 0.5) * 150;
      const endX = 420 + (Math.random() - 0.5) * 800;
      const endY = 420 + (Math.random() - 0.5) * 800;
      const cp1x = startX + (Math.random() - 0.5) * 500;
      const cp1y = startY + (Math.random() - 0.5) * 500;
      const cp2x = endX + (Math.random() - 0.5) * 500;
      const cp2y = endY + (Math.random() - 0.5) * 500;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(generatedThreads);

    // Generate distant background constellation lines
    const bgLines = Array.from({ length: 30 }).map(() => {
      const x1 = Math.random() * 800;
      const y1 = Math.random() * 1000;
      const x2 = x1 + (Math.random() - 0.5) * 300;
      const y2 = y1 + (Math.random() - 0.5) * 300;
      return `M ${x1},${y1} L ${x2},${y2}`;
    });
    setBackgroundConstellations(bgLines);

    // Generate core connections
    const curiosity = NODES.find(n => n.id === 'curiosity');
    if (curiosity) {
      const conns = NODES.filter(n => n.id !== 'curiosity').map(node => ({
        id: `link-${node.id}`,
        path: `M ${curiosity.x},${curiosity.y} Q ${(curiosity.x + node.x) / 2 + (Math.random() * 80 - 40)}, ${(curiosity.y + node.y) / 2 + (Math.random() * 80 - 40)} ${node.x},${node.y}`,
        color: node.color
      }));
      setCoreConnections(conns);
    }

    // Generate expansive expansion paths
    const paths = [0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
      const targetX = (idx * 150);
      const cp1x = 420 + (Math.random() - 0.5) * 400;
      const cp2x = targetX + (Math.random() - 0.5) * 400;
      return `M 420,420 C ${cp1x}, 600 ${cp2x}, 900 ${targetX}, 1500`;
    });
    setExpansionPaths(paths);

    const brainTimer = setTimeout(() => setShowBrain(true), 1500);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 3000 + index * 300);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    if (node.id === 'curiosity') {
      setDiscoveredNodeId('curiosity');
      if (!isExpanding) {
        setIsExpanding(true);
        setTimeout(() => {
          onExplore?.();
          setTimeout(() => {
            const gallery = document.getElementById('gallery-section');
            if (gallery) {
              gallery.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1500);
        }, 3000); // Give time to read the shard
      }
    } else {
      setDiscoveredNodeId(node.id === discoveredNodeId ? null : node.id);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Intro Narrative */}
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, delay: 5 }}
          className="text-xs md:text-sm uppercase tracking-[2em] text-white/30 font-medium glow-sm whitespace-nowrap italic"
        >
          Before the code, there was curiosity.
        </motion.p>
      </div>

      <motion.svg 
        viewBox="0 0 800 1000" 
        className="relative z-10 w-full h-full max-h-screen overflow-visible select-none transition-all duration-1000"
        preserveAspectRatio="xMidYMid meet"
        animate={{ 
          scale: [1, 1.03, 1],
          rotate: [0, 0.5, 0],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* DISTANT BACKGROUND LAYER */}
        <motion.g 
          animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          opacity="0.15"
        >
          {backgroundConstellations.map((d, i) => (
            <path key={`bg-line-${i}`} d={d} fill="none" stroke="white" strokeWidth="0.2" />
          ))}
        </motion.g>

        {/* MIDGROUND NEURAL LAYER */}
        <motion.g 
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.01, 1],
          }} 
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Procedural Neural Threads */}
          <g opacity="0.4">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.5, 0.15] }}
                transition={{ duration: 10, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </g>

          {/* Primary Network Pulses */}
          <g>
            {coreConnections.map((conn, i) => (
              <React.Fragment key={conn.id}>
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 1 }}
                />
                {/* Traveling Energy Pulse */}
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="3"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0, strokeDasharray: "1, 100", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -100 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "linear"
                  }}
                />
              </React.Fragment>
            ))}
          </g>

          {/* Temporal Expansion Path */}
          <AnimatePresence>
            {isExpanding && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {expansionPaths.map((d, idx) => (
                  <motion.path
                    key={`expansion-line-${idx}`}
                    d={d}
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.5)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0.3] }}
                    transition={{ duration: 7, ease: "easeInOut", delay: idx * 0.2 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Silhouette Trace */}
          <motion.path 
            d={SILHOUETTE_PATH} 
            fill="none" 
            stroke="white" 
            strokeWidth="0.5" 
            strokeOpacity="0.15" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 5 }} 
          />

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 4 }}>
                <circle cx="420" cy="420" r="160" fill="url(#core-grad)" />
                <motion.circle
                  cx="420" cy="420" r="15" fill="white"
                  animate={{ 
                    scale: [1, 3, 1], 
                    opacity: [0.3, 1, 0.3], 
                    filter: ['blur(10px)', 'blur(30px)', 'blur(10px)'] 
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                {/* Curiosity Sonar Pulses */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={`sonar-wave-${i}`}
                    cx="420"
                    cy="420"
                    r="15"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    animate={{
                      r: [15, 800],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: i * 1.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Facet Nodes */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isExternallyHighlighted = externalHighlightId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isDiscovered = discoveredNodeId === node.id;
            const isActive = activeNode?.id === node.id || isExternallyHighlighted || isHovered || isDiscovered;
            const isCuriosity = node.id === 'curiosity';

            return (
              <g 
                key={node.id} 
                className="cursor-pointer" 
                onMouseEnter={() => {
                  setActiveNode(node);
                  setHoveredNodeId(node.id);
                }} 
                onMouseLeave={() => {
                  setActiveNode(null);
                  setHoveredNodeId(null);
                }} 
                onClick={() => handleNodeClick(node)}
              >
                <AnimatePresence>
                  {isVisible && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                      {/* Orbiting Particles */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.circle
                          key={`orbit-${node.id}-${i}`}
                          r="3"
                          fill={node.color}
                          animate={{
                            cx: [
                              node.x + Math.cos((i * Math.PI * 2) / 5) * (isActive ? 50 : 35),
                              node.x + Math.cos((i * Math.PI * 2) / 5 + Math.PI) * (isActive ? 50 : 35),
                              node.x + Math.cos((i * Math.PI * 2) / 5 + Math.PI * 2) * (isActive ? 50 : 35),
                            ],
                            cy: [
                              node.y + Math.sin((i * Math.PI * 2) / 5) * (isActive ? 50 : 35),
                              node.y + Math.sin((i * Math.PI * 2) / 5 + Math.PI) * (isActive ? 50 : 35),
                              node.y + Math.sin((i * Math.PI * 2) / 5 + Math.PI * 2) * (isActive ? 50 : 35),
                            ],
                            opacity: [0.3, 0.9, 0.3],
                            scale: isActive ? [1.2, 1.8, 1.2] : [1, 1.5, 1]
                          }}
                          transition={{
                            duration: (4 + i * 0.8) / (isActive ? 1.5 : 1),
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          filter={`url(#glow-${node.id})`}
                        />
                      ))}

                      {/* Explicit Orbit Ring */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 50 : 35}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="0.5"
                        strokeOpacity="0.25"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />

                      {/* Core Node Circle */}
                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isDiscovered ? (isCuriosity ? 32 : 28) : (isActive ? (isCuriosity ? 28 : 22) : (isCuriosity ? 20 : 14))}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.15 : 1,
                          opacity: isCuriosity ? 1 : 0.8,
                          boxShadow: isDiscovered ? `0 0 50px ${node.color}` : "none"
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      <motion.text
                        x={node.x} y={node.y + (node.y > 420 ? 90 : -80)} textAnchor="middle"
                        fill={isActive ? node.color : (isCuriosity ? "white" : "rgba(255,255,255,0.4)")}
                        fontSize="16" fontWeight="700" className="font-body tracking-[0.8em] uppercase pointer-events-none transition-all duration-700"
                        style={{ filter: isActive ? `drop-shadow(0 0 8px ${node.color})` : "none" }}
                      >
                        {node.label}
                      </motion.text>

                      {/* Holographic Insight Shard */}
                      <AnimatePresence>
                        {isDiscovered && (
                          <motion.g
                            initial={{ opacity: 0, y: 30, scale: 0.8, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(5px)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <path
                              d={`M ${node.x - 130} ${node.y + (node.y > 420 ? -220 : 120)} L ${node.x + 130} ${node.y + (node.y > 420 ? -220 : 120)} L ${node.x + 140} ${node.y + (node.y > 420 ? -120 : 220)} L ${node.x - 140} ${node.y + (node.y > 420 ? -120 : 220)} Z`}
                              fill="rgba(5, 5, 8, 0.85)"
                              stroke={node.color}
                              strokeWidth="1.5"
                              strokeOpacity="0.6"
                              className="backdrop-blur-2xl"
                            />
                            <foreignObject
                              x={node.x - 120}
                              y={node.y + (node.y > 420 ? -200 : 140)}
                              width="240"
                              height="80"
                            >
                              <div className="text-[12px] md:text-[14px] text-white/95 leading-relaxed tracking-[0.15em] font-body text-center flex items-center justify-center h-full italic uppercase font-medium">
                                {node.insight}
                              </div>
                            </foreignObject>
                            
                            {/* Connection Shard Line */}
                            <motion.line 
                              x1={node.x} 
                              y1={node.y + (node.y > 420 ? -50 : 50)}
                              x2={node.x}
                              y2={node.y + (node.y > 420 ? -120 : 120)}
                              stroke={node.color}
                              strokeWidth="1"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {/* Curiosity Narrative Hints */}
                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.5 }} transition={{ duration: 1.5 }}>
                          <text x={node.x} y={node.y + 110} textAnchor="middle" fill="white" className="text-[11px] uppercase tracking-[1em] font-bold">
                            {isActive ? "Discover the pioneers" : "Tap to Explore"}
                          </text>
                          <motion.path
                            d={`M ${node.x - 8} ${node.y + 125} L ${node.x} ${node.y + 133} L ${node.x + 8} ${node.y + 125}`}
                            fill="none" stroke="white" strokeWidth="2" animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </motion.g>
                      )}
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </motion.g>
      </motion.svg>

      {/* Initial Landing Blur Overlay */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(60px)' }} 
            transition={{ duration: 3.5 }} 
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-12">
              <motion.div initial={{ letterSpacing: "3.5em", opacity: 0 }} animate={{ letterSpacing: "2.5em", opacity: 1 }} transition={{ duration: 5 }}>
                <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter italic uppercase leading-none">
                  The Mind of a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    Woman Developer
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3, delay: 1.5 }}
                className="text-[14px] md:text-lg text-white/60 tracking-[1em] uppercase font-light mt-6 px-12 max-w-6xl mx-auto leading-relaxed"
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

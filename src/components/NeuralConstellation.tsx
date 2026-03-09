
"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
  const [discoveredNodeId, setDiscoveredNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    // Generate threads only on client mount to avoid hydration mismatch
    const generatedThreads = Array.from({ length: 30 }).map(() => {
      const startX = 420 + (Math.random() - 0.5) * 80;
      const startY = 410 + (Math.random() - 0.5) * 80;
      const endX = 420 + (Math.random() - 0.5) * 450;
      const endY = 410 + (Math.random() - 0.5) * 450;
      const cp1x = startX + (Math.random() - 0.5) * 400;
      const cp1y = startY + (Math.random() - 0.5) * 400;
      const cp2x = endX + (Math.random() - 0.5) * 400;
      const cp2y = endY + (Math.random() - 0.5) * 400;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(generatedThreads);

    const brainTimer = setTimeout(() => setShowBrain(true), 2000);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 3500 + index * 400);
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
    } else if (node.id !== 'curiosity') {
      setDiscoveredNodeId(node.id === discoveredNodeId ? null : node.id);
    }
  };

  // Connection lines between Curiosity (Core) and other nodes
  const coreConnections = useMemo(() => {
    const curiosity = NODES.find(n => n.id === 'curiosity');
    if (!curiosity) return [];
    return NODES.filter(n => n.id !== 'curiosity').map(node => ({
      id: `link-${node.id}`,
      path: `M ${curiosity.x},${curiosity.y} Q ${(curiosity.x + node.x) / 2 + (Math.random() * 40 - 20)}, ${(curiosity.y + node.y) / 2 + (Math.random() * 40 - 20)} ${node.x},${node.y}`,
      color: node.color
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Intro Narrative */}
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

        <motion.g 
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.02, 1],
          }} 
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
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

          {/* Primary Network Pulses */}
          <g>
            {coreConnections.map((conn, i) => (
              <React.Fragment key={conn.id}>
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="0.8"
                  strokeOpacity="0.1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                {/* Traveling Energy Pulse */}
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0, strokeDasharray: "1, 100", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -100 }}
                  transition={{
                    duration: 3,
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
          <motion.path 
            d={SILHOUETTE_PATH} 
            fill="none" 
            stroke="white" 
            strokeWidth="0.4" 
            strokeOpacity="0.1" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 4 }} 
          />

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3 }}>
                <circle cx="420" cy="410" r="110" fill="url(#core-grad)" />
                <motion.circle
                  cx="420" cy="410" r="10" fill="white"
                  animate={{ 
                    scale: [1, 2.5, 1], 
                    opacity: [0.2, 0.8, 0.2], 
                    filter: ['blur(8px)', 'blur(20px)', 'blur(8px)'] 
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                
                {/* Curiosity Sonar Pulses */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`sonar-wave-${i}`}
                    cx="420"
                    cy="410"
                    r="10"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.5"
                    animate={{
                      r: [10, 400],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 4,
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {/* Orbiting Particles */}
                      {[0, 1, 2].map((i) => (
                        <motion.circle
                          key={`orbit-${node.id}-${i}`}
                          r="1.5"
                          fill={node.color}
                          animate={{
                            cx: [
                              node.x + Math.cos((i * Math.PI * 2) / 3) * (isHovered ? 25 : 15),
                              node.x + Math.cos((i * Math.PI * 2) / 3 + Math.PI) * (isHovered ? 25 : 15),
                              node.x + Math.cos((i * Math.PI * 2) / 3 + Math.PI * 2) * (isHovered ? 25 : 15),
                            ],
                            cy: [
                              node.y + Math.sin((i * Math.PI * 2) / 3) * (isHovered ? 25 : 15),
                              node.y + Math.sin((i * Math.PI * 2) / 3 + Math.PI) * (isHovered ? 25 : 15),
                              node.y + Math.sin((i * Math.PI * 2) / 3 + Math.PI * 2) * (isHovered ? 25 : 15),
                            ],
                            opacity: [0.4, 0.8, 0.4]
                          }}
                          transition={{
                            duration: (3 + i * 0.5) / (isHovered ? 1.5 : 1),
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
                        r={isHovered ? 25 : 15}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="0.2"
                        strokeOpacity="0.2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Core Node Circle */}
                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isActive ? (isCuriosity ? 16 : 12) : (isCuriosity ? 10 : 6)}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          opacity: isCuriosity ? 1 : 0.7 
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      <motion.text
                        x={node.x} y={node.y + (node.y > 410 ? 55 : -45)} textAnchor="middle"
                        fill={isActive ? node.color : (isCuriosity ? "white" : "rgba(255,255,255,0.3)")}
                        fontSize="9" fontWeight="700" className="font-body tracking-[0.6em] uppercase pointer-events-none transition-all duration-700"
                      >
                        {node.label}
                      </motion.text>

                      {/* Holographic Insight Shard */}
                      <AnimatePresence>
                        {(isHovered || isDiscovered) && !isCuriosity && (
                          <motion.g
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <rect
                              x={node.x - 70}
                              y={node.y + (node.y > 410 ? -120 : 60)}
                              width="140"
                              height="50"
                              rx="8"
                              fill="rgba(0,0,0,0.8)"
                              stroke={node.color}
                              strokeWidth="0.5"
                              className="backdrop-blur-md"
                            />
                            <foreignObject
                              x={node.x - 65}
                              y={node.y + (node.y > 410 ? -115 : 65)}
                              width="130"
                              height="40"
                            >
                              <div className="text-[7px] text-white/90 leading-tight tracking-wide font-body text-center flex items-center h-full">
                                {node.insight}
                              </div>
                            </foreignObject>
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {/* Curiosity Narrative Hints */}
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
                    </motion.g>
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

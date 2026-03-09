
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
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
  const [bridgePaths, setBridgePaths] = useState<string[]>([]);
  const [discoveredNodeId, setDiscoveredNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [clickBurst, setClickBurst] = useState<string | null>(null);

  // Mouse Tracking for "Gravity" Effect
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(500);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // Generate primary neural threads
    const generatedThreads = Array.from({ length: 45 }).map(() => {
      const startX = 420 + (Math.random() - 0.5) * 150;
      const startY = 420 + (Math.random() - 0.5) * 150;
      const endX = 420 + (Math.random() - 0.5) * 850;
      const endY = 420 + (Math.random() - 0.5) * 850;
      const cp1x = startX + (Math.random() - 0.5) * 500;
      const cp1y = startY + (Math.random() - 0.5) * 500;
      const cp2x = endX + (Math.random() - 0.5) * 500;
      const cp2y = endY + (Math.random() - 0.5) * 500;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(generatedThreads);

    // Distant background lines
    const bgLines = Array.from({ length: 40 }).map(() => {
      const x1 = Math.random() * 800;
      const y1 = Math.random() * 1000;
      const x2 = x1 + (Math.random() - 0.5) * 400;
      const y2 = y1 + (Math.random() - 0.5) * 400;
      return `M ${x1},${y1} L ${x2},${y2}`;
    });
    setBackgroundConstellations(bgLines);

    // Core connections
    const curiosity = NODES.find(n => n.id === 'curiosity');
    if (curiosity) {
      const conns = NODES.filter(n => n.id !== 'curiosity').map(node => ({
        id: `link-${node.id}`,
        path: `M ${curiosity.x},${curiosity.y} Q ${(curiosity.x + node.x) / 2 + (Math.random() * 120 - 60)}, ${(curiosity.y + node.y) / 2 + (Math.random() * 120 - 60)} ${node.x},${node.y}`,
        color: node.color
      }));
      setCoreConnections(conns);

      // Expansion bridge paths
      const bridgeLines = Array.from({ length: 15 }).map((_, i) => {
        const endX = 420 + (Math.random() - 0.5) * 1200;
        const endY = 1200;
        const cp1x = 420 + (Math.random() - 0.5) * 400;
        const cp1y = 700 + (Math.random() * 200);
        return `M 420,420 C ${cp1x},${cp1y} ${cp1x},${cp1y} ${endX},${endY}`;
      });
      setBridgePaths(bridgeLines);
    }

    const brainTimer = setTimeout(() => setShowBrain(true), 3000);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 5000 + index * 500);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    setClickBurst(node.id);
    setTimeout(() => setClickBurst(null), 1000);

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
          }, 2500);
        }, 7000);
      }
    } else {
      setDiscoveredNodeId(node.id === discoveredNodeId ? null : node.id);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent cursor-none">
      {/* Cinematic Intro Preamble */}
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5, delay: 6 }}
          className="text-sm md:text-lg uppercase tracking-[2.5em] text-white/40 font-bold glow-sm whitespace-nowrap italic"
        >
          Before the code, there was curiosity.
        </motion.p>
      </div>

      <motion.svg 
        viewBox="0 0 800 1000" 
        onMouseMove={handleMouseMove}
        className="relative z-10 w-full h-full max-h-screen overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
        animate={{ 
          scale: isExpanding ? 1.05 : [1, 1.02, 1],
          rotate: isExpanding ? 0 : [0, 0.2, 0],
        }}
        transition={{ duration: 40, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }}
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
              <feComposite in="SourceGraphic" operator="over" />
            </filter>
          ))}
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="core-glow-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* DISTANT BACKGROUND PARALLAX */}
        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [20, -20]),
            y: useTransform(springY, [0, 1000], [20, -20]),
          }}
          opacity="0.1"
        >
          {backgroundConstellations.map((d, i) => (
            <path key={`bg-line-${i}`} d={d} fill="none" stroke="white" strokeWidth="0.3" />
          ))}
        </motion.g>

        {/* MAIN INTERACTIVE NETWORK */}
        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [8, -8]),
            y: useTransform(springY, [0, 1000], [8, -8]),
          }}
        >
          {/* Neural Threads */}
          <g opacity="0.3">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.4, 0.1] }}
                transition={{ duration: 25, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </g>

          {/* Connection Pulses */}
          <g>
            {coreConnections.map((conn, i) => (
              <React.Fragment key={conn.id}>
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="1.2"
                  strokeOpacity={(hoveredNodeId === 'curiosity') ? 0.4 : 0.15}
                  animate={{ strokeOpacity: (hoveredNodeId === 'curiosity') ? [0.4, 0.8, 0.4] : 0.15 }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                {/* Traveling Energy Surge */}
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="3"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0, strokeDasharray: "1, 60", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -120 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear"
                  }}
                />
              </React.Fragment>
            ))}
          </g>

          {/* Temporal Bridge Expansion */}
          <AnimatePresence>
            {isExpanding && (
              <g>
                {bridgePaths.map((d, i) => (
                  <motion.path
                    key={`bridge-${i}`}
                    d={d}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0, filter: 'blur(5px)' }}
                    animate={{ pathLength: 1, filter: 'blur(0px)' }}
                    transition={{ 
                      duration: 8, 
                      ease: [0.22, 1, 0.36, 1], // Quintic Out for smooth cinematic growth
                      delay: i * 0.15 
                    }}
                    className="glow-sm"
                  />
                ))}
              </g>
            )}
          </AnimatePresence>

          {/* Central Silhouette Aura */}
          <motion.path 
            d={SILHOUETTE_PATH} 
            fill="none" 
            stroke="white" 
            strokeWidth="0.8" 
            strokeOpacity="0.1" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 10 }} 
          />

          {/* Central Core (The Mind) */}
          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 8 }}>
                <circle cx="420" cy="420" r="180" fill="url(#core-glow-grad)" />
                <motion.circle
                  cx="420" cy="420" r="20" fill="white"
                  animate={{ 
                    scale: isExpanding ? [1, 6, 3] : [1, 2.5, 1], 
                    opacity: isExpanding ? 1 : [0.4, 1, 0.4], 
                    filter: isExpanding ? 'blur(40px)' : ['blur(15px)', 'blur(35px)', 'blur(15px)'] 
                  }}
                  transition={{ duration: isExpanding ? 5 : 15, repeat: isExpanding ? 0 : Infinity }}
                />
                
                {/* Sonar Awakening Waves */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={`sonar-${i}`}
                    cx="420" cy="420" r="20"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    animate={{
                      r: isExpanding ? [20, 1800] : [20, 1200],
                      opacity: isExpanding ? [0.8, 0] : [0.5, 0],
                    }}
                    transition={{
                      duration: isExpanding ? 6 : 10,
                      repeat: isExpanding ? 1 : Infinity,
                      delay: i * 2.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* FACET NODES */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isHovered = hoveredNodeId === node.id;
            const isDiscovered = discoveredNodeId === node.id;
            const isBursting = clickBurst === node.id;
            const isActive = isHovered || isDiscovered || (externalHighlightId === node.id);
            const isCuriosity = node.id === 'curiosity';

            return (
              <g 
                key={node.id} 
                className="cursor-pointer" 
                onMouseEnter={() => setHoveredNodeId(node.id)} 
                onMouseLeave={() => setHoveredNodeId(null)} 
                onClick={() => handleNodeClick(node)}
              >
                <AnimatePresence>
                  {isVisible && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Reactive Atmosphere Glow */}
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 120 : 80}
                        fill={node.color}
                        animate={{ 
                          opacity: isActive ? 0.25 : 0.08,
                          scale: isActive ? 1.2 : 1
                        }}
                        transition={{ duration: 1.5 }}
                        className="pointer-events-none blur-[40px]"
                      />

                      {/* Orbiting Tech Particles */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.circle
                          key={`orbit-${node.id}-${i}`}
                          r={isActive ? 4 : 2.5}
                          fill={node.color}
                          animate={{
                            cx: [
                              node.x + Math.cos((i * Math.PI * 2) / 5) * (isActive ? 65 : 45),
                              node.x + Math.cos((i * Math.PI * 2) / 5 + Math.PI) * (isActive ? 65 : 45),
                              node.x + Math.cos((i * Math.PI * 2) / 5 + Math.PI * 2) * (isActive ? 65 : 45),
                            ],
                            cy: [
                              node.y + Math.sin((i * Math.PI * 2) / 5) * (isActive ? 65 : 45),
                              node.y + Math.sin((i * Math.PI * 2) / 5 + Math.PI) * (isActive ? 65 : 45),
                              node.y + Math.sin((i * Math.PI * 2) / 5 + Math.PI * 2) * (isActive ? 65 : 45),
                            ],
                            opacity: isActive ? [0.4, 1, 0.4] : [0.2, 0.6, 0.2],
                            scale: isBursting ? [1, 4, 0] : 1
                          }}
                          transition={{
                            duration: (isHovered ? 4 : 8) + i * 0.8,
                            repeat: isBursting ? 0 : Infinity,
                            ease: isBursting ? "easeOut" : "linear"
                          }}
                          filter={`url(#glow-${node.id})`}
                        />
                      ))}

                      {/* Rotating Ring Systems */}
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 55 : 38}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        strokeOpacity="0.3"
                        strokeDasharray="10 5"
                        animate={{ rotate: 360, scale: isActive ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: isHovered ? 6 : 15, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Core Game-like Point */}
                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isCuriosity ? (isActive ? 35 : 28) : (isActive ? 24 : 16)}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          filter: isActive ? `drop-shadow(0 0 25px ${node.color})` : "none",
                          stroke: "#fff",
                          strokeWidth: isActive ? 2 : 0,
                          strokeOpacity: isActive ? 0.6 : 0
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      {/* High-Impact Label */}
                      <motion.text
                        x={node.x} y={node.y + (node.y > 420 ? 110 : -100)} textAnchor="middle"
                        fill={isActive ? "white" : "rgba(255,255,255,0.4)"}
                        fontSize={isActive ? "20" : "16"} fontWeight="800" 
                        className="font-body tracking-[0.6em] uppercase transition-all duration-700"
                        style={{ filter: isActive ? `drop-shadow(0 0 15px ${node.color})` : "none" }}
                      >
                        {node.label}
                      </motion.text>

                      {/* Holographic Discovery Shard */}
                      <AnimatePresence>
                        {isDiscovered && (
                          <motion.g
                            initial={{ opacity: 0, y: 40, scale: 0.7, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 20, scale: 0.8, filter: 'blur(10px)' }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <path
                              d={`M ${node.x - 160} ${node.y + (node.y > 420 ? -260 : 140)} L ${node.x + 160} ${node.y + (node.y > 420 ? -260 : 140)} L ${node.x + 180} ${node.y + (node.y > 420 ? -140 : 260)} L ${node.x - 180} ${node.y + (node.y > 420 ? -140 : 260)} Z`}
                              fill="rgba(5, 5, 8, 0.9)"
                              stroke={node.color}
                              strokeWidth="2"
                              strokeOpacity="0.8"
                              className="backdrop-blur-3xl shadow-2xl"
                            />
                            <foreignObject
                              x={node.x - 140}
                              y={node.y + (node.y > 420 ? -240 : 160)}
                              width="280"
                              height="100"
                            >
                              <div className="text-[14px] md:text-[16px] text-white/95 leading-relaxed tracking-[0.2em] font-body text-center flex items-center justify-center h-full italic uppercase font-bold p-4">
                                {node.insight}
                              </div>
                            </foreignObject>
                            
                            {/* Energy Thread from Node to Shard */}
                            <motion.line 
                              x1={node.x} y1={node.y + (node.y > 420 ? -60 : 60)}
                              x2={node.x} y2={node.y + (node.y > 420 ? -140 : 140)}
                              stroke={node.color} strokeWidth="2" strokeDasharray="6 6"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5 }}
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {/* Curiosity Narrative Gateway */}
                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.6 }} transition={{ duration: 3 }}>
                          <text x={node.x} y={node.y + 130} textAnchor="middle" fill="white" className="text-[14px] uppercase tracking-[1.2em] font-black glow-sm">
                            {isActive ? "UNFOLD HISTORY" : "IGNITE"}
                          </text>
                          <motion.path
                            d={`M ${node.x - 12} ${node.y + 150} L ${node.x} ${node.y + 162} L ${node.x + 12} ${node.y + 150}`}
                            fill="none" stroke="white" strokeWidth="3" animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Hero Initial Immersion Layer */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(100px)' }} 
            transition={{ duration: 6 }} 
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-16">
              <motion.div initial={{ letterSpacing: "5em", opacity: 0 }} animate={{ letterSpacing: "3em", opacity: 1 }} transition={{ duration: 8 }}>
                <h1 className="text-7xl md:text-[11rem] font-bold text-white tracking-tighter italic uppercase leading-none">
                  The Mind of a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    Woman Developer
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 5, delay: 3 }}
                className="text-[16px] md:text-2xl text-white/50 tracking-[1.5em] uppercase font-light mt-8 px-12 max-w-7xl mx-auto leading-relaxed"
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

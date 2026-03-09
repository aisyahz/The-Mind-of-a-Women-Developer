
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

const SILHOUETTE_PATH = "M 400,850 C 300,800 150,700 150,450 C 150,200 300,100 500,150 C 650,200 750,350 720,550 C 750,600 720,700 620,750 C 580,850 500,900 400,850";

// Mapping trait nodes to specific target X positions for the lineage transition
// These match the horizontal distribution in the WomenInTechGallery
const LINEAGE_TARGETS: Record<string, number> = {
  'creativity': 150,    // Ada Lovelace
  'logic': 350,         // Grace Hopper
  'empathy': 550,       // Margaret Hamilton
  'collaboration': 750  // Radia Perlman
};

interface NeuralConstellationProps {
  onExplore?: () => void;
  externalHighlightId?: string | null;
}

export const NeuralConstellation: React.FC<NeuralConstellationProps> = ({ onExplore, externalHighlightId }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [isExpanding, setIsExpanding] = useState(false);
  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  const [backgroundConstellations, setBackgroundConstellations] = useState<string[]>([]);
  const [coreConnections, setCoreConnections] = useState<{id: string, path: string, color: string}[]>([]);
  const [legacyThreads, setLegacyThreads] = useState<{id: string, path: string, color: string}[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [clickBurst, setClickBurst] = useState<string | null>(null);

  // Mouse Tracking for "Neural Gravity" Effect
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(500);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // Generate primary neural threads
    const generatedThreads = Array.from({ length: 60 }).map(() => {
      const startX = 420 + (Math.random() - 0.5) * 200;
      const startY = 420 + (Math.random() - 0.5) * 200;
      const endX = 420 + (Math.random() - 0.5) * 1200;
      const endY = 420 + (Math.random() - 0.5) * 1200;
      const cp1x = startX + (Math.random() - 0.5) * 800;
      const cp1y = startY + (Math.random() - 0.5) * 800;
      const cp2x = endX + (Math.random() - 0.5) * 800;
      const cp2y = endY + (Math.random() - 0.5) * 800;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(generatedThreads);

    // Distant background stars and lines
    const bgLines = Array.from({ length: 70 }).map(() => {
      const x1 = Math.random() * 800;
      const y1 = Math.random() * 1000;
      const x2 = x1 + (Math.random() - 0.5) * 800;
      const y2 = y1 + (Math.random() - 0.5) * 800;
      return `M ${x1},${y1} L ${x2},${y2}`;
    });
    setBackgroundConstellations(bgLines);

    // Core connections (Network visualization)
    const curiosity = NODES.find(n => n.id === 'curiosity');
    if (curiosity) {
      const conns = NODES.filter(n => n.id !== 'curiosity').map(node => ({
        id: `link-${node.id}`,
        path: `M ${curiosity.x},${curiosity.y} Q ${(curiosity.x + node.x) / 2 + (Math.random() * 140 - 70)}, ${(curiosity.y + node.y) / 2 + (Math.random() * 140 - 70)} ${node.x},${node.y}`,
        color: node.color
      }));
      setCoreConnections(conns);

      // Descending Targeted Lineage Threads (Continuous path to pioneers)
      const legacy = NODES.filter(n => n.id !== 'curiosity').map((node, i) => {
        const startX = node.x;
        const startY = node.y;
        const endX = LINEAGE_TARGETS[node.id] || 400;
        const endY = 1600; // Far beyond VIEW to ensure clean transition
        const cp1x = startX + (Math.random() * 150 - 75);
        const cp1y = startY + 300;
        const cp2x = endX + (Math.random() * 150 - 75);
        const cp2y = endY - 500;
        return {
          id: `legacy-${node.id}`,
          path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
          color: node.color
        };
      });
      setLegacyThreads(legacy);
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
      setActiveNodeId('curiosity');
      if (!isExpanding) {
        setIsExpanding(true);
        // Cinematic sequence: Ignite -> Grow -> Transition
        setTimeout(() => {
          onExplore?.();
          setTimeout(() => {
            const gallery = document.getElementById('gallery-section');
            if (gallery) {
              gallery.scrollIntoView({ behavior: 'smooth' });
            }
          }, 4500);
        }, 8000);
      }
    } else {
      setActiveNodeId(node.id === activeNodeId ? null : node.id);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible bg-transparent cursor-none">
      {/* Cinematic Intro Preamble */}
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 6, delay: 6 }}
          className="text-lg md:text-2xl uppercase tracking-[1.5em] md:tracking-[2em] text-white/40 font-bold glow-sm whitespace-nowrap italic"
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
          scale: isExpanding ? 1.08 : [1, 1.015, 1],
          y: isExpanding ? [0, 20] : [0, -12, 0]
        }}
        transition={{ 
          scale: { duration: 18, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" },
          y: { duration: 22, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }
        }}
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
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="core-glow-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* PARALLAX BACKGROUND DEPTH: Reacts strongly to mouse */}
        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [50, -50]),
            y: useTransform(springY, [0, 1000], [50, -50]),
          }}
          opacity="0.12"
        >
          {backgroundConstellations.map((d, i) => (
            <path key={`bg-line-${i}`} d={d} fill="none" stroke="white" strokeWidth="0.2" />
          ))}
        </motion.g>

        {/* MAIN INTERACTIVE NETWORK: Reacts subtly to gravity */}
        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [18, -18]),
            y: useTransform(springY, [0, 1000], [18, -18]),
          }}
        >
          {/* Drifting Neural Particles */}
          <g opacity="0.3">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.35, 0.05] }}
                transition={{ duration: 28, delay: i * 0.15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            ))}
          </g>

          {/* Connection Pulses (Always active ecosystem) */}
          <g>
            {coreConnections.map((conn, i) => (
              <React.Fragment key={conn.id}>
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="0.8"
                  strokeOpacity={(hoveredNodeId === 'curiosity') ? 0.35 : 0.08}
                  animate={{ strokeOpacity: (hoveredNodeId === 'curiosity') ? [0.35, 0.75, 0.35] : 0.08 }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="2.5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0, strokeDasharray: "2, 120", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -120 }}
                  transition={{ duration: 12, repeat: Infinity, delay: i * 2, ease: "linear" }}
                />
              </React.Fragment>
            ))}
          </g>

          {/* TEMPORAL LINEAGE BRIDGE: Targeted paths to pioneers */}
          <AnimatePresence>
            {isExpanding && (
              <g>
                {legacyThreads.map((thread, i) => (
                  <React.Fragment key={thread.id}>
                    <motion.path
                      d={thread.path}
                      fill="none"
                      stroke={thread.color}
                      strokeWidth="3"
                      strokeOpacity="0.5"
                      initial={{ pathLength: 0, filter: 'blur(10px)' }}
                      animate={{ pathLength: 1, filter: 'blur(0px)' }}
                      transition={{ 
                        duration: 10, 
                        ease: [0.16, 1, 0.3, 1], // cinematic quintic ease
                        delay: i * 0.4 
                      }}
                      className="glow-sm"
                    />
                    {/* Travelling energy pulses along lineage paths */}
                    <motion.path
                      d={thread.path}
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeOpacity="0.8"
                      initial={{ pathLength: 0, strokeDasharray: "1, 150" }}
                      animate={{ strokeDashoffset: -300 }}
                      transition={{ duration: 15, repeat: Infinity, delay: 2.5 + (i * 0.6), ease: "linear" }}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}
          </AnimatePresence>

          {/* Central Silhouette Path */}
          <motion.path 
            d={SILHOUETTE_PATH} 
            fill="none" 
            stroke="white" 
            strokeWidth="0.6" 
            strokeOpacity="0.05" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 18, ease: "easeInOut" }} 
          />

          {/* THE MIND: Central Command Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 10 }}>
                <circle cx="420" cy="420" r="240" fill="url(#core-glow-grad)" opacity="0.35" />
                <motion.circle
                  cx="420" cy="420" r="28" fill="white"
                  animate={{ 
                    scale: isExpanding ? [1, 12, 6] : [1, 1.8, 1], 
                    opacity: isExpanding ? 1 : [0.3, 0.7, 0.3], 
                    filter: isExpanding ? 'blur(80px)' : ['blur(25px)', 'blur(50px)', 'blur(25px)'] 
                  }}
                  transition={{ duration: isExpanding ? 8 : 18, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }}
                />
                
                {/* Sonar Pacing Waves (Weighted, cinematic) */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`sonar-${i}`}
                    cx="420" cy="420" r="25"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    animate={{
                      r: isExpanding ? [25, 2500] : [25, 1600],
                      opacity: isExpanding ? [0.9, 0] : [0.35, 0],
                    }}
                    transition={{
                      duration: isExpanding ? 10 : 16,
                      repeat: isExpanding ? 1 : Infinity,
                      delay: i * 4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* INTERACTIVE FACET NODES (Game-like skill points) */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isHovered = hoveredNodeId === node.id;
            const isDiscovered = activeNodeId === node.id;
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
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Reactive Atmosphere (Gravity glow) */}
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 160 : 110}
                        fill={node.color}
                        animate={{ 
                          opacity: isActive ? 0.35 : 0.04,
                          scale: isActive ? 1.4 : 1
                        }}
                        transition={{ duration: 2 }}
                        className="pointer-events-none blur-[60px]"
                      />

                      {/* Orbiting Energy Particles */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.circle
                          key={`orbit-${node.id}-${i}`}
                          r={isActive ? 6 : 3}
                          fill={node.color}
                          animate={{
                            cx: [
                              node.x + Math.cos((i * Math.PI * 2) / 6) * (isActive ? 90 : 60),
                              node.x + Math.cos((i * Math.PI * 2) / 6 + Math.PI) * (isActive ? 90 : 60),
                              node.x + Math.cos((i * Math.PI * 2) / 6 + Math.PI * 2) * (isActive ? 90 : 60),
                            ],
                            cy: [
                              node.y + Math.sin((i * Math.PI * 2) / 6) * (isActive ? 90 : 60),
                              node.y + Math.sin((i * Math.PI * 2) / 6 + Math.PI) * (isActive ? 90 : 60),
                              node.y + Math.sin((i * Math.PI * 2) / 6 + Math.PI * 2) * (isActive ? 90 : 60),
                            ],
                            opacity: isActive ? [0.6, 1, 0.6] : [0.2, 0.4, 0.2],
                            scale: isBursting ? [1, 6, 0] : 1
                          }}
                          transition={{
                            duration: (isHovered ? 5 : 12) + i * 1.5,
                            repeat: isBursting ? 0 : Infinity,
                            ease: isBursting ? "easeOut" : "linear"
                          }}
                          filter={`url(#glow-${node.id})`}
                        />
                      ))}

                      {/* Animated Core Rings */}
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 75 : 55}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="15 8"
                        animate={{ rotate: 360, scale: isActive ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: isHovered ? 8 : 22, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Command Point (The actual node) */}
                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isCuriosity ? (isActive ? 48 : 38) : (isActive ? 32 : 22)}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.3 : 1,
                          filter: isActive ? `drop-shadow(0 0 45px ${node.color})` : "none",
                          stroke: "#fff",
                          strokeWidth: isActive ? 3 : 0,
                          strokeOpacity: isActive ? 0.8 : 0,
                          boxShadow: isActive ? `0 0 60px ${node.color}` : "none"
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      {/* Node Label (Upgraded for full-screen readability) */}
                      <motion.text
                        x={node.x} y={node.y + (node.y > 500 ? 140 : -130)} textAnchor="middle"
                        fill={isActive ? "white" : "rgba(255,255,255,0.4)"}
                        fontSize={isActive ? "32" : "26"} fontWeight="800" 
                        className="font-body tracking-[0.7em] uppercase transition-all duration-800 pointer-events-none"
                        style={{ filter: isActive ? `drop-shadow(0 0 25px ${node.color})` : "none" }}
                      >
                        {node.label}
                      </motion.text>

                      {/* Holographic Insight Shard (Discovery reveal) */}
                      <AnimatePresence>
                        {isDiscovered && (
                          <motion.g
                            initial={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(30px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(15px)' }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <path
                              d={`M ${node.x - 200} ${node.y + (node.y > 500 ? -340 : 200)} L ${node.x + 200} ${node.y + (node.y > 500 ? -340 : 200)} L ${node.x + 220} ${node.y + (node.y > 500 ? -180 : 360)} L ${node.x - 220} ${node.y + (node.y > 500 ? -180 : 360)} Z`}
                              fill="rgba(5, 5, 8, 0.96)"
                              stroke={node.color}
                              strokeWidth="3"
                              strokeOpacity="0.9"
                              className="backdrop-blur-3xl shadow-2xl"
                            />
                            <foreignObject
                              x={node.x - 180}
                              y={node.y + (node.y > 500 ? -320 : 220)}
                              width="360"
                              height="120"
                            >
                              <div className="text-[18px] md:text-[20px] text-white/95 leading-relaxed tracking-[0.25em] font-body text-center flex items-center justify-center h-full italic uppercase font-bold p-6">
                                {node.insight}
                              </div>
                            </foreignObject>
                            
                            <motion.line 
                              x1={node.x} y1={node.y + (node.y > 500 ? -80 : 80)}
                              x2={node.x} y2={node.y + (node.y > 500 ? -180 : 180)}
                              stroke={node.color} strokeWidth="3" strokeDasharray="10 10"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 1.8 }}
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {/* Curiosity Awakening Gateway */}
                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.65 }} transition={{ duration: 4 }}>
                          <text x={node.x} y={node.y + 160} textAnchor="middle" fill="white" className="text-[20px] uppercase tracking-[1.4em] font-black glow-sm pointer-events-none">
                            {isActive ? "UNFOLD LINEAGE" : "IGNITE"}
                          </text>
                          <motion.path
                            d={`M ${node.x - 20} ${node.y + 190} L ${node.x} ${node.y + 210} L ${node.x + 20} ${node.y + 190}`}
                            fill="none" stroke="white" strokeWidth="5" animate={{ y: [0, 18, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Hero Initial Immersion Preamble Overlay */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(120px)' }} 
            transition={{ duration: 8, ease: "easeInOut" }} 
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-20">
              <motion.div initial={{ letterSpacing: "6em", opacity: 0 }} animate={{ letterSpacing: "2.5em", opacity: 1 }} transition={{ duration: 10, ease: "easeOut" }}>
                <h1 className="text-7xl md:text-[12rem] font-bold text-white tracking-tighter italic uppercase leading-none">
                  The Mind of a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    Woman Developer
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 6, delay: 4 }}
                className="text-xl md:text-3xl text-white/50 tracking-[1.8em] uppercase font-light mt-12 px-12 max-w-7xl mx-auto leading-relaxed"
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

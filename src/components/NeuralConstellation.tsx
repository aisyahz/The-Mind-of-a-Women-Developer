"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

const SILHOUETTE_PATH = "M 400,850 C 300,800 150,700 150,450 C 150,200 300,100 500,150 C 650,200 750,350 720,550 C 750,600 720,700 620,750 C 580,850 500,900 400,850";

const LINEAGE_TARGETS: Record<string, number> = {
  'creativity': 150,
  'logic': 350,
  'empathy': 550,
  'collaboration': 750
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
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [clickBurst, setClickBurst] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  const [backgroundConstellations, setBackgroundConstellations] = useState<string[]>([]);
  const [coreConnections, setCoreConnections] = useState<{id: string, path: string, color: string}[]>([]);
  const [legacyThreads, setLegacyThreads] = useState<{id: string, path: string, color: string}[]>([]);

  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(500);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 80 });

  // Hooks must be at top level
  const bgX = useTransform(springX, [0, 800], [50, -50]);
  const bgY = useTransform(springY, [0, 1000], [50, -50]);
  const midX = useTransform(springX, [0, 800], [15, -15]);
  const midY = useTransform(springY, [0, 1000], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    setIsMounted(true);
    
    const curiosity = NODES.find(n => n.id === 'curiosity');
    
    const threads = Array.from({ length: 40 }).map(() => {
      const startX = Math.random() * 800;
      const startY = Math.random() * 1000;
      const endX = startX + (Math.random() - 0.5) * 600;
      const endY = startY + (Math.random() - 0.5) * 600;
      const cp1x = startX + (Math.random() - 0.5) * 300;
      const cp1y = startY + (Math.random() - 0.5) * 300;
      const cp2x = endX + (Math.random() - 0.5) * 300;
      const cp2y = endY + (Math.random() - 0.5) * 300;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(threads);

    const bgLines = Array.from({ length: 60 }).map(() => {
      const x1 = Math.random() * 800;
      const y1 = Math.random() * 1000;
      const x2 = x1 + (Math.random() - 0.5) * 400;
      const y2 = y1 + (Math.random() - 0.5) * 400;
      return `M ${x1},${y1} L ${x2},${y2}`;
    });
    setBackgroundConstellations(bgLines);

    if (curiosity) {
      const conns = NODES.filter(n => n.id !== 'curiosity').map(node => ({
        id: `link-${node.id}`,
        path: `M ${curiosity.x},${curiosity.y} Q ${(curiosity.x + node.x) / 2 + (Math.random() * 100 - 50)}, ${(curiosity.y + node.y) / 2 + (Math.random() * 100 - 50)} ${node.x},${node.y}`,
        color: node.color
      }));
      setCoreConnections(conns);

      const legacy = NODES.filter(n => n.id !== 'curiosity').map((node, i) => {
        const startX = node.x;
        const startY = node.y;
        const endX = LINEAGE_TARGETS[node.id] || 400;
        const endY = 2500;
        const cp1x = startX;
        const cp1y = startY + 600;
        const cp2x = endX;
        const cp2y = endY - 600;
        return {
          id: `legacy-${node.id}`,
          path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
          color: node.color
        };
      });
      setLegacyThreads(legacy);
    }

    const brainTimer = setTimeout(() => setShowBrain(true), 1000);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 2000 + index * 300);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    setClickBurst(node.id);
    setTimeout(() => setClickBurst(null), 800);

    if (node.id === 'curiosity') {
      setActiveNodeId('curiosity');
      if (!isExpanding) {
        setIsExpanding(true);
        setTimeout(() => {
          onExplore?.();
          setTimeout(() => {
            const gallery = document.getElementById('gallery-section');
            if (gallery) {
              gallery.scrollIntoView({ behavior: 'smooth' });
            }
          }, 10000);
        }, 7000);
      }
    } else {
      setActiveNodeId(node.id === activeNodeId ? null : node.id);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent cursor-none">
      <div className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6 w-full max-w-5xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 4, delay: 3 }}
          className="text-lg md:text-xl uppercase tracking-[0.6em] md:tracking-[1em] text-white/60 font-bold glow-sm italic leading-none max-w-full"
        >
          Before the code, there was curiosity.
        </motion.h3>
      </div>

      <motion.svg 
        viewBox="0 0 800 1000" 
        onMouseMove={handleMouseMove}
        className="relative z-10 w-full h-full max-h-[85vh] max-w-[95vw] overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
        animate={{ 
          scale: isExpanding ? 1.05 : [1, 1.01, 1],
          y: [0, -10, 0]
        }}
        transition={{ 
          scale: { duration: 20, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
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
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.01" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.01" />
          </linearGradient>
          <radialGradient id="core-glow-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.g style={{ x: bgX, y: bgY }} opacity="0.1">
          {backgroundConstellations.map((d, i) => (
            <path key={`bg-line-${i}`} d={d} fill="none" stroke="white" strokeWidth="0.2" />
          ))}
        </motion.g>

        <motion.g style={{ x: midX, y: midY }}>
          <g opacity="0.3">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.3, 0.08] }}
                transition={{ duration: 45, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            ))}
          </g>

          <g>
            {coreConnections.map((conn, i) => {
              const isActive = hoveredNodeId === 'curiosity' || hoveredNodeId === conn.id.replace('link-', '');
              return (
                <React.Fragment key={conn.id}>
                  <motion.path
                    d={conn.path}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth="1"
                    strokeOpacity={isActive ? 0.4 : 0.12}
                    animate={{ strokeOpacity: isActive ? [0.4, 0.7, 0.4] : 0.12 }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.path
                    d={conn.path}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth="2.5"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0, strokeDasharray: "4, 200", strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -200 }}
                    transition={{ duration: 15, repeat: Infinity, delay: i * 3, ease: "linear" }}
                  />
                </React.Fragment>
              );
            })}
          </g>

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
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0, filter: 'blur(15px)' }}
                      animate={{ pathLength: 1, filter: 'blur(0px)' }}
                      transition={{ 
                        duration: 12, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.8 
                      }}
                      className="glow-md"
                    />
                    <motion.path
                      d={thread.path}
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      strokeOpacity="0.8"
                      initial={{ pathLength: 0, strokeDasharray: "2, 300" }}
                      animate={{ strokeDashoffset: -600 }}
                      transition={{ duration: 20, repeat: Infinity, delay: 5 + (i * 1.5), ease: "linear" }}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}
          </AnimatePresence>

          <motion.path 
            d={SILHOUETTE_PATH} 
            fill="none" 
            stroke="white" 
            strokeWidth="0.8" 
            strokeOpacity="0.05" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 30, ease: "easeInOut" }} 
          />

          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 10 }}>
                <circle cx="420" cy="420" r="300" fill="url(#core-glow-grad)" opacity="0.3" />
                <motion.circle
                  cx="420" cy="420" r="32" fill="white"
                  animate={{ 
                    scale: isExpanding ? [1, 25, 12] : [1, 1.5, 1], 
                    opacity: isExpanding ? 1 : [0.3, 0.6, 0.3], 
                    filter: isExpanding ? 'blur(100px)' : ['blur(30px)', 'blur(60px)', 'blur(30px)'] 
                  }}
                  transition={{ duration: isExpanding ? 15 : 18, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }}
                />
                
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`sonar-${i}`}
                    cx="420" cy="420" r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    animate={{
                      r: isExpanding ? [40, 5000] : [40, 2500],
                      opacity: isExpanding ? [0.8, 0] : [0.3, 0],
                    }}
                    transition={{
                      duration: isExpanding ? 12 : 20,
                      repeat: isExpanding ? 1 : Infinity,
                      delay: i * 6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isHovered = hoveredNodeId === node.id;
            const isDiscovered = activeNodeId === node.id;
            const isActive = isHovered || isDiscovered || (externalHighlightId === node.id);
            const isCuriosity = node.id === 'curiosity';

            // DIRECTIONAL LABEL & SHARD LOGIC
            const isCreativity = node.id === 'creativity';
            
            // For Creativity specifically, description goes ON TOP. Label goes BELOW.
            // For others, use split logic based on Y position.
            const labelYOffset = isCreativity ? 140 : (node.y < 500 ? -160 : 160);
            const shardBoxYOffset = isCreativity ? -380 : (node.y < 500 ? 180 : -380);
            const shardContentYOffset = isCreativity ? -360 : (node.y < 500 ? 200 : -360);
            const lineY1 = isCreativity ? -90 : (node.y < 500 ? 90 : -90);
            const lineY2 = isCreativity ? -180 : (node.y < 500 ? 180 : -180);

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
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 160 : 100}
                        fill={node.color}
                        animate={{ 
                          opacity: isActive ? 0.35 : 0.04,
                          scale: isActive ? 1.4 : 1
                        }}
                        transition={{ duration: 3 }}
                        className="pointer-events-none blur-[90px]"
                      />

                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 85 : 55}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        strokeOpacity="0.4"
                        strokeDasharray="15 8"
                        animate={{ rotate: 360, scale: isActive ? [1, 1.15, 1] : 1 }}
                        transition={{ duration: isHovered ? 8 : 40, repeat: Infinity, ease: "linear" }}
                      />

                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isCuriosity ? (isActive ? 45 : 35) : (isActive ? 32 : 22)}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.25 : 1,
                          filter: isActive ? `drop-shadow(0 0 50px ${node.color})` : "none",
                          stroke: "#fff",
                          strokeWidth: isActive ? 4 : 0,
                          strokeOpacity: isActive ? 0.8 : 0
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 25 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      <motion.text
                        x={node.x} 
                        y={node.y + labelYOffset}
                        textAnchor="middle"
                        fill={isDiscovered ? "rgba(255,255,255,0.2)" : (isActive ? "white" : "rgba(255,255,255,0.4)")}
                        fontSize={isActive ? "28" : "24"} 
                        fontWeight="900" 
                        className="font-body tracking-[0.4em] uppercase transition-all duration-700 pointer-events-none select-none"
                        style={{ filter: isActive && !isDiscovered ? `drop-shadow(0 0 15px ${node.color})` : "none" }}
                      >
                        {node.label}
                      </motion.text>

                      <AnimatePresence>
                        {isDiscovered && (
                          <motion.g
                            initial={{ opacity: 0, y: isCreativity ? -30 : 30, scale: 0.9, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: isCreativity ? -20 : 20, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <path
                              d={`M ${node.x - 230} ${node.y + shardBoxYOffset} L ${node.x + 230} ${node.y + shardBoxYOffset} L ${node.x + 250} ${node.y + shardBoxYOffset + 180} L ${node.x - 250} ${node.y + shardBoxYOffset + 180} Z`}
                              fill="rgba(5, 5, 8, 0.96)"
                              stroke={node.color}
                              strokeWidth="2"
                              strokeOpacity="0.6"
                              className="backdrop-blur-3xl shadow-2xl"
                            />
                            <foreignObject
                              x={node.x - 210}
                              y={node.y + shardContentYOffset}
                              width="420"
                              height="140"
                            >
                              <div className="text-[16px] md:text-[18px] text-white/90 leading-relaxed tracking-[0.2em] font-body text-center flex items-center justify-center h-full italic uppercase font-medium p-8">
                                {node.insight}
                              </div>
                            </foreignObject>
                            
                            <motion.line 
                              x1={node.x} y1={node.y + lineY1}
                              x2={node.x} y2={node.y + lineY2}
                              stroke={node.color} strokeWidth="2" strokeDasharray="8 8"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 2 }}
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.6 }} transition={{ duration: 4 }}>
                          <motion.path
                            d={`M ${node.x - 15} ${node.y + 260} L ${node.x} ${node.y + 275} L ${node.x + 15} ${node.y + 260} M ${node.x - 15} ${node.y + 275} L ${node.x} ${node.y + 290} L ${node.x + 15} ${node.y + 275}`}
                            fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" 
                            animate={{ 
                              y: [0, 8, 0],
                              opacity: [0.4, 1, 0.4] 
                            }}
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

      <AnimatePresence>
        {!showBrain && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(100px)' }} 
            transition={{ duration: 8, ease: "easeInOut" }} 
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-12 max-w-6xl px-10">
              <motion.div initial={{ letterSpacing: "4em", opacity: 0 }} animate={{ letterSpacing: "1.5em", opacity: 1 }} transition={{ duration: 12, ease: "easeOut" }}>
                <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic uppercase leading-none">
                  The Mind of a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    Woman Developer
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 8, delay: 4 }}
                className="text-lg md:text-xl text-white/60 tracking-[1em] uppercase font-light leading-relaxed"
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

"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Generate randomized visual data only on client
  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  const [backgroundConstellations, setBackgroundConstellations] = useState<string[]>([]);
  const [coreConnections, setCoreConnections] = useState<{id: string, path: string, color: string}[]>([]);
  const [legacyThreads, setLegacyThreads] = useState<{id: string, path: string, color: string}[]>([]);

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
    setIsMounted(true);
    
    const curiosity = NODES.find(n => n.id === 'curiosity');
    
    const threads = Array.from({ length: 40 }).map(() => {
      const startX = 400 + (Math.random() - 0.5) * 150;
      const startY = 400 + (Math.random() - 0.5) * 150;
      const endX = 400 + (Math.random() - 0.5) * 1000;
      const endY = 400 + (Math.random() - 0.5) * 1000;
      const cp1x = startX + (Math.random() - 0.5) * 600;
      const cp1y = startY + (Math.random() - 0.5) * 600;
      const cp2x = endX + (Math.random() - 0.5) * 600;
      const cp2y = endY + (Math.random() - 0.5) * 600;
      return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    });
    setNeuralThreads(threads);

    const bgLines = Array.from({ length: 50 }).map(() => {
      const x1 = Math.random() * 800;
      const y1 = Math.random() * 1000;
      const x2 = x1 + (Math.random() - 0.5) * 600;
      const y2 = y1 + (Math.random() - 0.5) * 600;
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
        const endY = 1600;
        const cp1x = startX + (Math.random() * 120 - 60);
        const cp1y = startY + 250;
        const cp2x = endX + (Math.random() * 120 - 60);
        const cp2y = endY - 400;
        return {
          id: `legacy-${node.id}`,
          path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
          color: node.color
        };
      });
      setLegacyThreads(legacy);
    }

    const brainTimer = setTimeout(() => setShowBrain(true), 1500);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 2500 + index * 400);
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

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible bg-transparent cursor-none">
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 5, delay: 4 }}
          className="text-lg md:text-2xl uppercase tracking-[1.5em] text-white/40 font-bold glow-sm whitespace-nowrap italic"
        >
          Before the code, there was curiosity.
        </motion.p>
      </div>

      <motion.svg 
        viewBox="0 0 800 1000" 
        onMouseMove={handleMouseMove}
        className="relative z-10 w-full h-auto max-h-screen max-w-none overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
        animate={{ 
          scale: isExpanding ? 1.02 : [1, 1.005, 1],
          y: isExpanding ? [0, 10] : [0, -5, 0]
        }}
        transition={{ 
          scale: { duration: 15, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" },
          y: { duration: 18, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }
        }}
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
              <feComposite in="SourceGraphic" operator="over" />
            </filter>
          ))}
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="core-glow-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [50, -50]),
            y: useTransform(springY, [0, 1000], [50, -50]),
          }}
          opacity="0.1"
        >
          {backgroundConstellations.map((d, i) => (
            <path key={`bg-line-${i}`} d={d} fill="none" stroke="white" strokeWidth="0.15" />
          ))}
        </motion.g>

        <motion.g 
          style={{ 
            x: useTransform(springX, [0, 800], [15, -15]),
            y: useTransform(springY, [0, 1000], [15, -15]),
          }}
        >
          <g opacity="0.25">
            {neuralThreads.map((d, i) => (
              <motion.path
                key={`thread-${i}`}
                d={d}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.3, 0.05] }}
                transition={{ duration: 25, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            ))}
          </g>

          <g>
            {coreConnections.map((conn, i) => (
              <React.Fragment key={conn.id}>
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="0.8"
                  strokeOpacity={(hoveredNodeId === 'curiosity') ? 0.3 : 0.1}
                  animate={{ strokeOpacity: (hoveredNodeId === 'curiosity') ? [0.3, 0.6, 0.3] : 0.1 }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="2"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0, strokeDasharray: "2, 100", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -100 }}
                  transition={{ duration: 10, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
                />
              </React.Fragment>
            ))}
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
                      strokeWidth="2.5"
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0, filter: 'blur(8px)' }}
                      animate={{ pathLength: 1, filter: 'blur(0px)' }}
                      transition={{ 
                        duration: 10, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.4 
                      }}
                      className="glow-sm"
                    />
                    <motion.path
                      d={thread.path}
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeOpacity="0.7"
                      initial={{ pathLength: 0, strokeDasharray: "1, 120" }}
                      animate={{ strokeDashoffset: -240 }}
                      transition={{ duration: 12, repeat: Infinity, delay: 2 + (i * 0.5), ease: "linear" }}
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
            strokeWidth="0.5" 
            strokeOpacity="0.04" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 15, ease: "easeInOut" }} 
          />

          <AnimatePresence>
            {showBrain && (
              <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 8 }}>
                <circle cx="420" cy="420" r="220" fill="url(#core-glow-grad)" opacity="0.3" />
                <motion.circle
                  cx="420" cy="420" r="24" fill="white"
                  animate={{ 
                    scale: isExpanding ? [1, 10, 5] : [1, 1.6, 1], 
                    opacity: isExpanding ? 1 : [0.25, 0.6, 0.25], 
                    filter: isExpanding ? 'blur(60px)' : ['blur(20px)', 'blur(40px)', 'blur(20px)'] 
                  }}
                  transition={{ duration: isExpanding ? 8 : 15, repeat: isExpanding ? 0 : Infinity, ease: "easeInOut" }}
                />
                
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`sonar-${i}`}
                    cx="420" cy="420" r="25"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    animate={{
                      r: isExpanding ? [25, 2000] : [25, 1200],
                      opacity: isExpanding ? [0.8, 0] : [0.3, 0],
                    }}
                    transition={{
                      duration: isExpanding ? 10 : 14,
                      repeat: isExpanding ? 1 : Infinity,
                      delay: i * 3.5,
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
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 130 : 90}
                        fill={node.color}
                        animate={{ 
                          opacity: isActive ? 0.3 : 0.03,
                          scale: isActive ? 1.3 : 1
                        }}
                        transition={{ duration: 1.8 }}
                        className="pointer-events-none blur-[50px]"
                      />

                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.circle
                          key={`orbit-${node.id}-${i}`}
                          r={isActive ? 5 : 2.5}
                          fill={node.color}
                          animate={{
                            cx: [
                              node.x + Math.cos((i * Math.PI * 2) / 6) * (isActive ? 75 : 50),
                              node.x + Math.cos((i * Math.PI * 2) / 6 + Math.PI) * (isActive ? 75 : 50),
                              node.x + Math.cos((i * Math.PI * 2) / 6 + Math.PI * 2) * (isActive ? 75 : 50),
                            ],
                            cy: [
                              node.y + Math.sin((i * Math.PI * 2) / 6) * (isActive ? 75 : 50),
                              node.y + Math.sin((i * Math.PI * 2) / 6 + Math.PI) * (isActive ? 75 : 50),
                              node.y + Math.sin((i * Math.PI * 2) / 6 + Math.PI * 2) * (isActive ? 75 : 50),
                            ],
                            opacity: isActive ? [0.5, 0.9, 0.5] : [0.15, 0.3, 0.15],
                            scale: isBursting ? [1, 5, 0] : 1
                          }}
                          transition={{
                            duration: (isHovered ? 4 : 10) + i * 1.2,
                            repeat: isBursting ? 0 : Infinity,
                            ease: isBursting ? "easeOut" : "linear"
                          }}
                          filter={`url(#glow-${node.id})`}
                        />
                      ))}

                      <motion.circle
                        cx={node.x} cy={node.y}
                        r={isActive ? 65 : 45}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.25"
                        strokeDasharray="12 6"
                        animate={{ rotate: 360, scale: isActive ? [1, 1.15, 1] : 1 }}
                        transition={{ duration: isHovered ? 7 : 20, repeat: Infinity, ease: "linear" }}
                      />

                      <motion.circle
                        cx={node.x} cy={node.y} 
                        r={isCuriosity ? (isActive ? 40 : 32) : (isActive ? 28 : 18)}
                        fill={node.color} 
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          filter: isActive ? `drop-shadow(0 0 35px ${node.color})` : "none",
                          stroke: "#fff",
                          strokeWidth: isActive ? 2.5 : 0,
                          strokeOpacity: isActive ? 0.7 : 0
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        filter={`url(#glow-${node.id})`}
                      />

                      <motion.text
                        x={node.x} y={node.y + (node.y > 500 ? 120 : -110)} textAnchor="middle"
                        fill={isActive ? "white" : "rgba(255,255,255,0.3)"}
                        fontSize={isActive ? "28" : "24"} fontWeight="900" 
                        className="font-body tracking-[0.5em] uppercase transition-all duration-800 pointer-events-none"
                        style={{ filter: isActive ? `drop-shadow(0 0 15px ${node.color})` : "none" }}
                      >
                        {node.label}
                      </motion.text>

                      <AnimatePresence>
                        {isDiscovered && (
                          <motion.g
                            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <path
                              d={`M ${node.x - 180} ${node.y + (node.y > 500 ? -320 : 180)} L ${node.x + 180} ${node.y + (node.y > 500 ? -320 : 180)} L ${node.x + 200} ${node.y + (node.y > 500 ? -160 : 340)} L ${node.x - 200} ${node.y + (node.y > 500 ? -160 : 340)} Z`}
                              fill="rgba(5, 5, 8, 0.94)"
                              stroke={node.color}
                              strokeWidth="2.5"
                              strokeOpacity="0.8"
                              className="backdrop-blur-2xl shadow-xl"
                            />
                            <foreignObject
                              x={node.x - 160}
                              y={node.y + (node.y > 500 ? -300 : 200)}
                              width="320"
                              height="120"
                            >
                              <div className="text-[16px] md:text-[18px] text-white/90 leading-relaxed tracking-[0.2em] font-body text-center flex items-center justify-center h-full italic uppercase font-bold p-4">
                                {node.insight}
                              </div>
                            </foreignObject>
                            
                            <motion.line 
                              x1={node.x} y1={node.y + (node.y > 500 ? -70 : 70)}
                              x2={node.x} y2={node.y + (node.y > 500 ? -160 : 160)}
                              stroke={node.color} strokeWidth="2.5" strokeDasharray="8 8"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5 }}
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>

                      {isCuriosity && !isExpanding && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.6 }} transition={{ duration: 3 }}>
                          <text x={node.x} y={node.y + 140} textAnchor="middle" fill="white" className="text-[20px] md:text-[24px] uppercase tracking-[1em] font-black glow-sm pointer-events-none italic">
                            {isActive ? "UNFOLD LINEAGE" : "IGNITE"}
                          </text>
                          {/* Refined Arrow */}
                          <motion.path
                            d={`M ${node.x - 12} ${node.y + 165} L ${node.x} ${node.y + 177} L ${node.x + 12} ${node.y + 165} M ${node.x - 12} ${node.y + 175} L ${node.x} ${node.y + 187} L ${node.x + 12} ${node.y + 175}`}
                            fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" 
                            animate={{ 
                              y: [0, 10, 0],
                              opacity: [0.4, 1, 0.4] 
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
            exit={{ opacity: 0, filter: 'blur(80px)' }} 
            transition={{ duration: 6, ease: "easeInOut" }} 
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-12 max-w-6xl px-8">
              <motion.div initial={{ letterSpacing: "4em", opacity: 0 }} animate={{ letterSpacing: "1.5em", opacity: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
                <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic uppercase leading-none">
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
                className="text-xl md:text-2xl text-white/50 tracking-[1.2em] uppercase font-light leading-relaxed"
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

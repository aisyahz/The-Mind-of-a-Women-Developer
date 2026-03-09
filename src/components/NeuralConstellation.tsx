
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

// Refined, more statuesque silhouette profile
const SILHOUETTE_PATH = "M 350,750 C 300,720 240,650 240,450 C 240,250 350,180 480,220 C 580,250 630,350 610,480 C 630,510 610,560 550,600 C 520,700 450,750 350,730";

const generateNeuralThreads = () => {
  return Array.from({ length: 25 }).map(() => {
    const startX = 420 + (Math.random() - 0.5) * 120;
    const startY = 410 + (Math.random() - 0.5) * 120;
    const endX = 420 + (Math.random() - 0.5) * 380;
    const endY = 410 + (Math.random() - 0.5) * 380;
    
    const cp1x = startX + (Math.random() - 0.5) * 350;
    const cp1y = startY + (Math.random() - 0.5) * 350;
    const cp2x = endX + (Math.random() - 0.5) * 350;
    const cp2y = endY + (Math.random() - 0.5) * 350;
    
    return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  });
};

const generateIncomingStreams = () => {
  return Array.from({ length: 10 }).map((_, i) => ({
    x: 380 + (Math.random() * 80), 
    y: 900,
    targetX: 420 + (Math.random() - 0.5) * 100,
    targetY: 600 + (Math.random() - 0.5) * 80,
    delay: i * 0.6,
    duration: 5 + Math.random() * 3,
  }));
};

const generateHairStrands = () => {
  return Array.from({ length: 30 }).map((_, i) => {
    const t = Math.random();
    const startX = 240 + t * 180; 
    const startY = 350 - (1 - Math.pow(t - 0.5, 2) * 4) * 100;
    
    const endX = startX - 30 + (Math.random() * 60);
    const endY = 950 + (Math.random() * 100);
    
    const cp1x = startX - 50 - (Math.random() * 80);
    const cp1y = startY + 250 + (Math.random() * 100);
    const cp2x = endX + (Math.random() * 40);
    const cp2y = endY - 350;
    
    return {
      path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
      delay: Math.random() * 8,
      opacity: 0.08 + Math.random() * 0.12,
    };
  });
};

export const NeuralConstellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  const [incomingStreams, setIncomingStreams] = useState<any[]>([]);
  const [hairStrands, setHairStrands] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setNeuralThreads(generateNeuralThreads());
    setIncomingStreams(generateIncomingStreams());
    setHairStrands(generateHairStrands());

    const brainTimer = setTimeout(() => setShowBrain(true), 1000);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 2000 + index * 300);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    if (node.id === 'curiosity') {
      setIsExpanding(true);
      setTimeout(() => {
        const gallery = document.getElementById('gallery-section');
        if (gallery) {
          gallery.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => setIsExpanding(false), 2000);
      }, 300);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 1000"
        className="relative z-10 w-full max-w-5xl h-auto overflow-visible select-none"
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="hair-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <filter id="master-bloom">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Subtle Intelligence Orbits */}
          <g className="opacity-10">
            {[280, 360, 440].map((radius, i) => (
              <motion.circle
                key={`orbit-ring-${i}`}
                cx="420"
                cy="410"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 16"
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 70 + i * 15, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </g>

          {/* Temporal Expansion Pulse (on Curiosity Click) */}
          <AnimatePresence>
            {isExpanding && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.path
                    key={`expansion-line-${i}`}
                    d={`M 420,410 C ${420 + (i - 3.5) * 100},600 ${420 + (i - 3.5) * 200},800 ${420 + (i - 3.5) * 300},1200`}
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.4)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Neural Strands / Hair */}
          <g filter="url(#master-bloom)">
            {hairStrands.map((strand, i) => (
              <g key={`hair-${i}`}>
                <motion.path
                  d={strand.path}
                  fill="none"
                  stroke="url(#hair-grad)"
                  strokeWidth="0.7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: strand.opacity }}
                  transition={{ duration: 6, delay: strand.delay, ease: "easeInOut" }}
                />
                <motion.circle
                  r="1.1"
                  fill="white"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 7 + Math.random() * 5,
                    repeat: Infinity,
                    delay: strand.delay + Math.random() * 4,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${strand.path}")` }}
                />
              </g>
            ))}
          </g>

          {/* Incoming Data Streams */}
          <g>
            {incomingStreams.map((stream, i) => (
              <motion.path
                key={`stream-${i}`}
                d={`M ${stream.x},${stream.y} Q ${stream.x},${(stream.y + stream.targetY) / 1.5} ${stream.targetX},${stream.targetY}`}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                transition={{
                  duration: stream.duration,
                  delay: stream.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>

          {/* Core Profile Path */}
          <motion.path
            d={SILHOUETTE_PATH}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3 }}
          />

          {/* Central Core Glow */}
          <AnimatePresence>
            {showBrain && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5 }}
              >
                <circle cx="420" cy="410" r="100" fill="url(#core-grad)" />
                <motion.circle
                  cx="420"
                  cy="410"
                  r="8"
                  fill="white"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0.9, 0.3],
                    filter: ['blur(6px)', 'blur(16px)', 'blur(6px)']
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBrain && (
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 4 }}
                filter="url(#master-bloom)"
              >
                {/* Internal Threads */}
                {neuralThreads.map((path, i) => (
                  <g key={`thread-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#thread-grad)"
                      strokeWidth="0.6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.25 }}
                      transition={{ duration: 5, delay: i * 0.05, ease: "easeInOut" }}
                    />
                    <motion.circle
                      r="1.5"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 0.9, 0]
                      }}
                      transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "easeInOut"
                      }}
                      style={{ offsetPath: `path("${path}")` }}
                    />
                  </g>
                ))}

                {/* Network Connections */}
                {NODES.map((node, i) =>
                  NODES.slice(i + 1).map((target) => (
                    <motion.line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.025)"}
                      strokeWidth={activeNode?.id === node.id || activeNode?.id === target.id ? "1.2" : "0.4"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 5, delay: 2 }}
                    />
                  ))
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Strategic Nodes */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isActive = activeNode?.id === node.id;
            const isCuriosity = node.id === 'curiosity';

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => handleNodeClick(node)}
              >
                <AnimatePresence>
                  {isVisible && (
                    <>
                      {isActive && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {[0, 180].map((angle, idx) => (
                            <motion.circle
                              key={`orbit-${idx}`}
                              r="1.8"
                              fill={node.color}
                              animate={{
                                cx: [
                                  node.x + Math.cos((angle * Math.PI) / 180) * 35,
                                  node.x + Math.cos(((angle + 360) * Math.PI) / 180) * 35,
                                ],
                                cy: [
                                  node.y + Math.sin((angle * Math.PI) / 180) * 35,
                                  node.y + Math.sin(((angle + 360) * Math.PI) / 180) * 35,
                                ],
                              }}
                              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                          ))}
                        </motion.g>
                      )}

                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? (isCuriosity ? 18 : 14) : 5}
                        fill={node.color}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: isCuriosity && isActive ? 1.2 : 1,
                          opacity: isCuriosity && isActive ? 1 : 0.8
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-700"
                      />

                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 40 : 22}
                        stroke={node.color}
                        strokeWidth="0.5"
                        fill="none"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      />

                      <motion.text
                        x={node.x}
                        y={node.y + (node.y > 410 ? 55 : -45)}
                        textAnchor="middle"
                        fill={isActive ? node.color : "rgba(255,255,255,0.25)"}
                        fontSize="8"
                        fontWeight="600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body tracking-[0.6em] uppercase pointer-events-none transition-all duration-500"
                      >
                        {node.label}
                      </motion.text>

                      {isCuriosity && isActive && (
                        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-none">
                          <text 
                            x={node.x} 
                            y={node.y + 75} 
                            textAnchor="middle" 
                            fill="white" 
                            className="text-[6px] uppercase tracking-[0.3em] font-medium opacity-40"
                          >
                            Click to expand through time
                          </text>
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

      {/* Insight Overlay - Reduced size for polish */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-sm w-[85%] glass-morphism p-8 rounded-[2.5rem] z-50 text-center border-white/10 shadow-2xl"
          >
            <div className="mb-4 inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/5">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-semibold">Facet Resolved</span>
            </div>

            <h3 
              className="text-3xl font-bold mb-4 tracking-tight uppercase italic"
              style={{ color: activeNode.color }}
            >
              {activeNode.label}
            </h3>

            <p className="text-sm text-white/70 leading-relaxed font-light italic">
              "{activeNode.insight}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-10">
              <motion.div
                initial={{ letterSpacing: "2em", opacity: 0 }}
                animate={{ letterSpacing: "1em", opacity: 1 }}
                transition={{ duration: 3 }}
              >
                <p className="text-[10px] uppercase text-white/20 mb-6 tracking-[2em]">Neural Initialization</p>
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter italic">
                  PORTRAIT<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500">
                    DIGITAL
                  </span>
                </h1>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

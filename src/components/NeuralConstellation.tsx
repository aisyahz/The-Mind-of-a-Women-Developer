
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

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
  return Array.from({ length: 12 }).map((_, i) => ({
    x: 380 + (Math.random() * 80), 
    y: 1000,
    targetX: 420 + (Math.random() - 0.5) * 150,
    targetY: 650 + (Math.random() - 0.5) * 100,
    delay: i * 0.5,
    duration: 6 + Math.random() * 4,
  }));
};

const generateHairStrands = () => {
  return Array.from({ length: 35 }).map((_, i) => {
    const t = Math.random();
    const startX = 240 + t * 200; 
    const startY = 350 - (1 - Math.pow(t - 0.5, 2) * 4) * 120;
    
    const endX = startX - 40 + (Math.random() * 80);
    const endY = 1000 + (Math.random() * 150);
    
    const cp1x = startX - 60 - (Math.random() * 100);
    const cp1y = startY + 300 + (Math.random() * 150);
    const cp2x = endX + (Math.random() * 50);
    const cp2y = endY - 400;
    
    return {
      path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
      delay: Math.random() * 10,
      opacity: 0.05 + Math.random() * 0.15,
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

    const brainTimer = setTimeout(() => setShowBrain(true), 1200);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 2500 + index * 400);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  const handleNodeClick = (node: NodeData) => {
    if (node.id === 'curiosity' && !isExpanding) {
      setIsExpanding(true);
      // Wait for the light pulses to "travel" before scrolling - Much slower delay (1.5s)
      setTimeout(() => {
        const gallery = document.getElementById('gallery-section');
        if (gallery) {
          gallery.scrollIntoView({ behavior: 'smooth' });
        }
        // Keep the lines visible long enough to feel connected - Reset after 6s
        setTimeout(() => setIsExpanding(false), 6000);
      }, 1500);
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
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="hair-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <filter id="master-bloom">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.005, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Orbital Rings */}
          <g className="opacity-15">
            {[300, 380, 460].map((radius, i) => (
              <motion.circle
                key={`orbit-ring-${i}`}
                cx="420"
                cy="410"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="0.4"
                strokeDasharray="1 20"
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 80 + i * 20, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </g>

          {/* Temporal Expansion Pulse (on Curiosity Click) - Slower growth (4s) */}
          <AnimatePresence>
            {isExpanding && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[0, 1, 2, 3].map((idx) => (
                  <motion.path
                    key={`expansion-line-${idx}`}
                    d={`M 420,410 C ${420},600 ${150 + idx * 250},800 ${150 + idx * 250},1500`}
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.5)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
                    transition={{ 
                      duration: 4.5, 
                      ease: [0.4, 0, 0.2, 1], 
                      delay: idx * 0.15 
                    }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Data Hair / Neural Strands */}
          <g filter="url(#master-bloom)">
            {hairStrands.map((strand, i) => (
              <g key={`hair-${i}`}>
                <motion.path
                  d={strand.path}
                  fill="none"
                  stroke="url(#hair-grad)"
                  strokeWidth="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: strand.opacity }}
                  transition={{ duration: 8, delay: strand.delay, ease: "easeInOut" }}
                />
                <motion.circle
                  r="1.2"
                  fill="white"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 6,
                    repeat: Infinity,
                    delay: strand.delay + Math.random() * 5,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${strand.path}")` }}
                />
              </g>
            ))}
          </g>

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
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3 }}
              >
                <circle cx="420" cy="410" r="110" fill="url(#core-grad)" />
                <motion.circle
                  cx="420"
                  cy="410"
                  r="10"
                  fill="white"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.2, 0.8, 0.2],
                    filter: ['blur(8px)', 'blur(20px)', 'blur(8px)']
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBrain && (
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 5 }}
                filter="url(#master-bloom)"
              >
                {/* Internal Threads */}
                {neuralThreads.map((path, i) => (
                  <g key={`thread-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#thread-grad)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.18 }}
                      transition={{ duration: 6, delay: i * 0.08, ease: "easeInOut" }}
                    />
                  </g>
                ))}

                {/* Connections between nodes */}
                {NODES.map((node, i) =>
                  NODES.slice(i + 1).map((target) => (
                    <motion.line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.015)"}
                      strokeWidth={activeNode?.id === node.id || activeNode?.id === target.id ? "1" : "0.3"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 6, delay: 3 }}
                    />
                  ))
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Interactive Facet Nodes */}
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
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? (isCuriosity ? 16 : 12) : 5}
                        fill={node.color}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: isCuriosity && isActive ? 1.2 : 1,
                          opacity: isCuriosity && isActive ? 1 : 0.7
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-700"
                      />

                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 35 : 18}
                        stroke={node.color}
                        strokeWidth="0.4"
                        fill="none"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />

                      <motion.text
                        x={node.x}
                        y={node.y + (node.y > 410 ? 50 : -40)}
                        textAnchor="middle"
                        fill={isActive ? node.color : "rgba(255,255,255,0.2)"}
                        fontSize="8"
                        fontWeight="600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body tracking-[0.8em] uppercase pointer-events-none transition-all duration-700"
                      >
                        {node.label}
                      </motion.text>

                      {isCuriosity && isActive && (
                        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-none">
                          <text 
                            x={node.x} 
                            y={node.y + 70} 
                            textAnchor="middle" 
                            fill="white" 
                            className="text-[6px] uppercase tracking-[0.4em] font-medium opacity-30"
                          >
                            Discover the pioneers
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

      {/* Insight Shard - Reduced height for better composition */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-[280px] w-[80%] glass-morphism p-5 rounded-[1.5rem] z-50 text-center border-white/5 shadow-2xl"
          >
            <h3 
              className="text-xl font-bold mb-2 tracking-wider uppercase italic"
              style={{ color: activeNode.color }}
            >
              {activeNode.label}
            </h3>

            <p className="text-[11px] text-white/60 leading-relaxed font-light italic">
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
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 3 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-12">
              <motion.div
                initial={{ letterSpacing: "3em", opacity: 0 }}
                animate={{ letterSpacing: "1.5em", opacity: 1 }}
                transition={{ duration: 4 }}
              >
                <p className="text-[10px] uppercase text-white/10 mb-8 tracking-[2.5em]">Neural Initialization</p>
                <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter italic">
                  GENESIS<br />
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

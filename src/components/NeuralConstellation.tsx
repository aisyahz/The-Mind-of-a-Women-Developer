
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

// Subtle profile silhouette path facing right
const SILHOUETTE_PATH = "M 320,680 C 250,650 200,550 220,400 C 240,250 350,150 480,180 C 580,210 650,300 630,420 C 660,450 640,500 580,550 C 550,650 480,700 380,680";

// Helper to generate organic neural threads that fill the silhouette
const generateNeuralThreads = () => {
  return Array.from({ length: 22 }).map(() => {
    const startX = 420 + (Math.random() - 0.5) * 150;
    const startY = 400 + (Math.random() - 0.5) * 150;
    const endX = 420 + (Math.random() - 0.5) * 400;
    const endY = 400 + (Math.random() - 0.5) * 400;
    
    const cp1x = startX + (Math.random() - 0.5) * 400;
    const cp1y = startY + (Math.random() - 0.5) * 400;
    const cp2x = endX + (Math.random() - 0.5) * 400;
    const cp2y = endY + (Math.random() - 0.5) * 400;
    
    return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  });
};

// Helper for data streams entering from the bottom (neck area)
const generateIncomingStreams = () => {
  return Array.from({ length: 12 }).map((_, i) => ({
    x: 350 + (Math.random() * 100), 
    y: 800,
    targetX: 400 + (Math.random() - 0.5) * 120,
    targetY: 550 + (Math.random() - 0.5) * 100,
    delay: i * 0.4,
    duration: 4 + Math.random() * 3,
  }));
};

// Helper to generate flowing "hair" strands of light
const generateHairStrands = () => {
  return Array.from({ length: 35 }).map((_, i) => {
    // Start along the top and back curve of the head
    const t = Math.random();
    const startX = 220 + t * 200; // Across the top/back
    const startY = 400 - (1 - Math.pow(t - 0.5, 2) * 4) * 150; // Curved top
    
    const endX = startX - 50 + (Math.random() * 100);
    const endY = 900 + (Math.random() * 200);
    
    const cp1x = startX - 20 - (Math.random() * 100);
    const cp1y = startY + 200 + (Math.random() * 100);
    const cp2x = endX + (Math.random() * 50);
    const cp2y = endY - 300;
    
    return {
      path: `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`,
      delay: Math.random() * 10,
      opacity: 0.05 + Math.random() * 0.1,
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

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 1000"
        className="relative z-10 w-full max-w-6xl h-auto overflow-visible select-none"
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="hair-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <filter id="master-bloom">
            <feGaussianBlur stdDeviation="2" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.015, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Orbital Intelligent Rings */}
          <g className="opacity-10">
            {[300, 380, 460].map((radius, i) => (
              <motion.circle
                key={`orbit-ring-${i}`}
                cx="420"
                cy="400"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 24"
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </g>

          {/* Flowing Neural Hair Strands (Downwards) */}
          <g filter="url(#master-bloom)">
            {hairStrands.map((strand, i) => (
              <g key={`hair-${i}`}>
                <motion.path
                  d={strand.path}
                  fill="none"
                  stroke="url(#hair-grad)"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: strand.opacity }}
                  transition={{ duration: 8, delay: strand.delay, ease: "easeInOut" }}
                />
                {/* Traveling Data Sparkles in Hair */}
                <motion.circle
                  r="1.2"
                  fill="white"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 6 + Math.random() * 8,
                    repeat: Infinity,
                    delay: strand.delay + Math.random() * 5,
                    ease: "linear"
                  }}
                  style={{ offsetPath: `path("${strand.path}")` }}
                />
              </g>
            ))}
          </g>

          {/* Incoming Neural Streams from Below (Neck) */}
          <g>
            {incomingStreams.map((stream, i) => (
              <motion.path
                key={`stream-${i}`}
                d={`M ${stream.x},${stream.y} Q ${stream.x},${(stream.y + stream.targetY) / 1.6} ${stream.targetX},${stream.targetY}`}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
                transition={{
                  duration: stream.duration,
                  delay: stream.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>

          {/* Subtle Silhouette Background */}
          <motion.path
            d={SILHOUETTE_PATH}
            fill="none"
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity="0.08"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4 }}
          />

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3 }}
              >
                <circle cx="420" cy="400" r="120" fill="url(#core-grad)" />
                <motion.circle
                  cx="420"
                  cy="400"
                  r="10"
                  fill="white"
                  animate={{
                    scale: [1, 2.2, 1],
                    opacity: [0.4, 1, 0.4],
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
                {/* Organic Neural Threads */}
                {neuralThreads.map((path, i) => (
                  <g key={`thread-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#thread-grad)"
                      strokeWidth="0.8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.35 }}
                      transition={{ duration: 7, delay: i * 0.08, ease: "easeInOut" }}
                    />
                    <motion.circle
                      r="1.8"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 15,
                        ease: "easeInOut"
                      }}
                      style={{ offsetPath: `path("${path}")` }}
                    />
                  </g>
                ))}

                {/* Cognitive Network Connections */}
                {NODES.map((node, i) =>
                  NODES.slice(i + 1).map((target) => (
                    <motion.line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.03)"}
                      strokeWidth={activeNode?.id === node.id || activeNode?.id === target.id ? "1.5" : "0.5"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 6, delay: 2.5 }}
                    />
                  ))
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Strategic Cognitive Nodes */}
          {NODES.map((node) => {
            const isVisible = visibleNodes.includes(node.id);
            const isActive = activeNode?.id === node.id;

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <AnimatePresence>
                  {isVisible && (
                    <>
                      {isActive && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {[0, 120, 240].map((angle, idx) => (
                            <motion.circle
                              key={`orbit-${idx}`}
                              r="2.5"
                              fill={node.color}
                              animate={{
                                cx: [
                                  node.x + Math.cos((angle * Math.PI) / 180) * 45,
                                  node.x + Math.cos(((angle + 360) * Math.PI) / 180) * 45,
                                ],
                                cy: [
                                  node.y + Math.sin((angle * Math.PI) / 180) * 45,
                                  node.y + Math.sin(((angle + 360) * Math.PI) / 180) * 45,
                                ],
                              }}
                              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                            />
                          ))}
                        </motion.g>
                      )}

                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 20 : 7}
                        fill={node.color}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-1000"
                      />

                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 55 : 30}
                        stroke={node.color}
                        strokeWidth="0.6"
                        fill="none"
                        animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.18, 0.04] }}
                        transition={{ duration: 7, repeat: Infinity }}
                      />

                      <motion.text
                        x={node.x}
                        y={node.y + (node.y > 400 ? 70 : -60)}
                        textAnchor="middle"
                        fill={isActive ? node.color : "rgba(255,255,255,0.3)"}
                        fontSize="9"
                        fontWeight="500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body tracking-[0.7em] uppercase pointer-events-none transition-all duration-700"
                      >
                        {node.label}
                      </motion.text>
                    </>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </motion.g>
      </svg>

      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(20px)' }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-lg w-[90%] glass-morphism p-12 rounded-[3.5rem] z-50 text-center border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-10"
            />
            
            <div className="mb-8 inline-block px-7 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-[0.6em] text-white/60 font-medium">Cognitive Facet Resolved</span>
            </div>

            <h3 
              className="text-5xl font-bold mb-8 tracking-tighter uppercase italic leading-none"
              style={{ color: activeNode.color, textShadow: `0 0 50px ${activeNode.color}66` }}
            >
              {activeNode.label}
            </h3>

            <p className="text-xl text-white/80 leading-relaxed font-light tracking-wide max-w-md mx-auto italic">
              "{activeNode.insight}"
            </p>

            <div className="mt-12 flex justify-center items-center gap-8 opacity-40">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <div className="w-2 h-2 rounded-full border border-white rotate-45" />
              <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(40px)' }}
            transition={{ duration: 3.5 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-16">
              <motion.div
                initial={{ letterSpacing: "2.5em", opacity: 0, y: 40 }}
                animate={{ letterSpacing: "0.8em", opacity: 1, y: 0 }}
                transition={{ duration: 3.5, ease: "easeOut" }}
              >
                <p className="text-sm uppercase text-white/30 mb-8 tracking-[1.5em]">Syncing Neural Construct...</p>
                <h1 className="text-7xl md:text-9xl font-headline font-bold text-white tracking-tighter leading-tight italic">
                  PORTRAIT<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-violet-400 to-pink-500">
                    DIGITAL
                  </span>
                </h1>
              </motion.div>
              <motion.div 
                animate={{ width: ["0%", "140%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-40 h-[1px] bg-white/30 mx-auto" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

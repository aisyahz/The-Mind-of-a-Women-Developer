"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

// Helper to generate complex brain-like neural paths
const generateNeuralThreads = () => {
  return Array.from({ length: 18 }).map(() => {
    const startX = 400 + (Math.random() - 0.5) * 120;
    const startY = 350 + (Math.random() - 0.5) * 120;
    const endX = 400 + (Math.random() - 0.5) * 450;
    const endY = 350 + (Math.random() - 0.5) * 450;
    const cp1x = startX + (Math.random() - 0.5) * 500;
    const cp1y = startY + (Math.random() - 0.5) * 500;
    const cp2x = endX + (Math.random() - 0.5) * 500;
    const cp2y = endY + (Math.random() - 0.5) * 500;
    return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  });
};

// Helper for data streams entering from below
const generateIncomingStreams = () => {
  return Array.from({ length: 8 }).map((_, i) => ({
    x: 400 + (Math.random() - 0.5) * 300,
    y: 800,
    targetX: 400 + (Math.random() - 0.5) * 80,
    targetY: 450 + (Math.random() - 0.5) * 50,
    delay: i * 0.5,
  }));
};

export const NeuralConstellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [neuralThreads, setNeuralThreads] = useState<string[]>([]);
  const [incomingStreams, setIncomingStreams] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setNeuralThreads(generateNeuralThreads());
    setIncomingStreams(generateIncomingStreams());

    const brainTimer = setTimeout(() => setShowBrain(true), 1200);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 3000 + index * 500);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent" />
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 800"
        className="relative z-10 w-full max-w-6xl h-auto overflow-visible select-none"
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
          </linearGradient>

          <radialGradient id="core-grad">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <filter id="master-bloom">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Global Breathing Motion */}
        <motion.g
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Orbital Rings */}
          <g className="opacity-20">
            {[260, 320, 380].map((radius, i) => (
              <motion.circle
                key={`orbit-ring-${i}`}
                cx="400"
                cy="350"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 12"
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </g>

          {/* Incoming Data Streams */}
          <g>
            {incomingStreams.map((stream, i) => (
              <motion.path
                key={`stream-${i}`}
                d={`M ${stream.x},${stream.y} Q ${stream.x},${(stream.y + stream.targetY) / 2} ${stream.targetX},${stream.targetY}`}
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
                transition={{
                  duration: 4,
                  delay: stream.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <circle cx="400" cy="350" r="80" fill="url(#core-grad)" />
                <motion.circle
                  cx="400"
                  cy="350"
                  r="15"
                  fill="white"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                    filter: ['blur(4px)', 'blur(12px)', 'blur(4px)']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBrain && (
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 3 }}
                filter="url(#master-bloom)"
              >
                {/* Neural Threads with Shimmer Passes */}
                {neuralThreads.map((path, i) => (
                  <g key={`thread-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#thread-grad)"
                      strokeWidth="0.8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 5, delay: i * 0.1, ease: "easeInOut" }}
                    />
                    <motion.circle
                      r="1.2"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 4,
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
                      stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.03)"}
                      strokeWidth={activeNode?.id === node.id || activeNode?.id === target.id ? "1.5" : "0.5"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 4, delay: 2.5 }}
                    />
                  ))
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Nodes and Labels */}
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
                      {/* Orbiting Particles */}
                      {isActive && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {[0, 120, 240].map((angle, idx) => (
                            <motion.circle
                              key={`orbit-${idx}`}
                              r="1.5"
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
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                          ))}
                        </motion.g>
                      )}

                      {/* Luminous Core */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 16 : 7}
                        fill={node.color}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-700"
                      />

                      {/* Halo */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 45 : 20}
                        stroke={node.color}
                        strokeWidth="0.5"
                        fill="none"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.2, 0.05] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />

                      {/* Label */}
                      <motion.text
                        x={node.x}
                        y={node.y + (node.y > 350 ? 55 : -45)}
                        textAnchor="middle"
                        fill={isActive ? node.color : "rgba(255,255,255,0.4)"}
                        fontSize="9"
                        fontWeight="700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body tracking-[0.5em] uppercase pointer-events-none transition-all duration-500"
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

      {/* Enhanced Premium Insight Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-xl w-[92%] glass-morphism p-10 rounded-[2.5rem] z-50 text-center border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
            />
            
            <div className="mb-6 inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-medium">Cognitive Faculty Detected</span>
            </div>

            <h3 
              className="text-4xl font-bold mb-6 tracking-tight uppercase italic leading-none"
              style={{ color: activeNode.color, textShadow: `0 0 30px ${activeNode.color}66` }}
            >
              {activeNode.label}
            </h3>

            <p className="text-lg text-white/80 leading-relaxed font-light tracking-wide max-w-md mx-auto">
              {activeNode.insight}
            </p>

            <div className="mt-10 flex justify-center items-center gap-4 opacity-20">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <div className="w-2 h-2 rounded-full border border-white" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Experience */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ letterSpacing: "1.5em", opacity: 0, y: 20 }}
                animate={{ letterSpacing: "0.5em", opacity: 1, y: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                <p className="text-xs uppercase text-white/30 mb-4 tracking-[1em]">Neural Synchronizing...</p>
                <h1 className="text-6xl md:text-9xl font-headline font-bold text-white tracking-tighter leading-tight">
                  COGNITIVE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500">
                    FRONTIER
                  </span>
                </h1>
              </motion.div>
              <motion.div 
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-[1px] bg-white/30 mx-auto" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
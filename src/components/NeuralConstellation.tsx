
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

// Subtle profile silhouette path facing right
const SILHOUETTE_PATH = "M 320,680 C 250,650 200,550 220,400 C 240,250 350,150 480,180 C 580,210 650,300 630,420 C 660,450 640,500 580,550 C 550,650 480,700 380,680";

// Helper to generate organic neural threads that fill the silhouette
const generateNeuralThreads = () => {
  return Array.from({ length: 22 }).map(() => {
    // Generate random points roughly within the head area
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
  return Array.from({ length: 8 }).map((_, i) => ({
    x: 350 + (Math.random() * 100), // Coming up into the neck area
    y: 800,
    targetX: 420 + (Math.random() - 0.5) * 100,
    targetY: 550 + (Math.random() - 0.5) * 50,
    delay: i * 0.6,
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
      }, 2500 + index * 400);
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
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
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

        {/* Global Breathing & Parallax Motion */}
        <motion.g
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Orbital Intelligent Rings */}
          <g className="opacity-10">
            {[280, 360, 440].map((radius, i) => (
              <motion.circle
                key={`orbit-ring-${i}`}
                cx="420"
                cy="400"
                r={radius}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 20"
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </g>

          {/* Incoming Neural Streams from Below */}
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
                  duration: 5,
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
            strokeWidth="0.5"
            strokeOpacity="0.05"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3 }}
          />

          {/* Central Energy Core */}
          <AnimatePresence>
            {showBrain && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5 }}
              >
                <circle cx="420" cy="400" r="100" fill="url(#core-grad)" />
                <motion.circle
                  cx="420"
                  cy="400"
                  r="8"
                  fill="white"
                  animate={{
                    scale: [1, 1.8, 1],
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
                {/* Organic Neural Threads */}
                {neuralThreads.map((path, i) => (
                  <g key={`thread-group-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#thread-grad)"
                      strokeWidth="0.6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 6, delay: i * 0.05, ease: "easeInOut" }}
                    />
                    {/* Travelling Sparkles */}
                    <motion.circle
                      r="1.5"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 12,
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
                      stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.02)"}
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
                      {/* Orbiting Faculty Particles */}
                      {isActive && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {[0, 120, 240].map((angle, idx) => (
                            <motion.circle
                              key={`orbit-${idx}`}
                              r="2"
                              fill={node.color}
                              animate={{
                                cx: [
                                  node.x + Math.cos((angle * Math.PI) / 180) * 40,
                                  node.x + Math.cos(((angle + 360) * Math.PI) / 180) * 40,
                                ],
                                cy: [
                                  node.y + Math.sin((angle * Math.PI) / 180) * 40,
                                  node.y + Math.sin(((angle + 360) * Math.PI) / 180) * 40,
                                ],
                              }}
                              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                          ))}
                        </motion.g>
                      )}

                      {/* Luminous Cognitive Anchor */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 18 : 6}
                        fill={node.color}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        filter={`url(#glow-${node.id})`}
                        className="transition-all duration-1000"
                      />

                      {/* Expansion Halo */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 50 : 25}
                        stroke={node.color}
                        strokeWidth="0.5"
                        fill="none"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.15, 0.03] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      />

                      {/* Elegant Art Label */}
                      <motion.text
                        x={node.x}
                        y={node.y + (node.y > 400 ? 65 : -55)}
                        textAnchor="middle"
                        fill={isActive ? node.color : "rgba(255,255,255,0.3)"}
                        fontSize="8"
                        fontWeight="500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body tracking-[0.6em] uppercase pointer-events-none transition-all duration-700"
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

      {/* Premium Glassmorphism Insight Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(20px)' }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-lg w-[90%] glass-morphism p-12 rounded-[3rem] z-50 text-center border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mb-10"
            />
            
            <div className="mb-8 inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-medium">Identity Facet Decoded</span>
            </div>

            <h3 
              className="text-5xl font-bold mb-8 tracking-tight uppercase italic leading-none"
              style={{ color: activeNode.color, textShadow: `0 0 40px ${activeNode.color}55` }}
            >
              {activeNode.label}
            </h3>

            <p className="text-xl text-white/70 leading-relaxed font-light tracking-wide max-w-sm mx-auto italic">
              "{activeNode.insight}"
            </p>

            <div className="mt-12 flex justify-center items-center gap-6 opacity-30">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <div className="w-1.5 h-1.5 rounded-full border border-white" />
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Intro Sequence */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 3 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50 bg-[#050508]"
          >
            <div className="space-y-12">
              <motion.div
                initial={{ letterSpacing: "2em", opacity: 0, y: 30 }}
                animate={{ letterSpacing: "0.6em", opacity: 1, y: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                <p className="text-xs uppercase text-white/20 mb-6 tracking-[1.2em]">Initializing Portrait Core...</p>
                <h1 className="text-6xl md:text-9xl font-headline font-bold text-white tracking-tighter leading-tight italic">
                  COGNITIVE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-violet-400 to-pink-500">
                    IDENTITY
                  </span>
                </h1>
              </motion.div>
              <motion.div 
                animate={{ width: ["0%", "120%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-32 h-[1px] bg-white/20 mx-auto" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

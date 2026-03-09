"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';

// Helper to generate complex brain-like neural paths
const generateNeuralThreads = () => {
  return Array.from({ length: 12 }).map((_, i) => {
    const startX = 400 + (Math.random() - 0.5) * 100;
    const startY = 350 + (Math.random() - 0.5) * 100;
    const endX = 400 + (Math.random() - 0.5) * 350;
    const endY = 350 + (Math.random() - 0.5) * 350;
    const cp1x = startX + (Math.random() - 0.5) * 400;
    const cp1y = startY + (Math.random() - 0.5) * 400;
    const cp2x = endX + (Math.random() - 0.5) * 400;
    const cp2y = endY + (Math.random() - 0.5) * 400;
    return `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  });
};

export const NeuralConstellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const neuralThreads = useMemo(() => generateNeuralThreads(), []);

  useEffect(() => {
    const brainTimer = setTimeout(() => setShowBrain(true), 1000);
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 2500 + index * 600);
    });
    return () => clearTimeout(brainTimer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 700"
        className="relative z-10 w-full max-w-5xl h-auto overflow-visible select-none"
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          
          <linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
          </linearGradient>

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

        {/* Central Neural Structure (The "Alive" Brain) */}
        <AnimatePresence>
          {showBrain && (
            <motion.g 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 3, ease: "easeOut" }}
              filter="url(#master-bloom)"
            >
              {/* Organic Neural Threads */}
              {neuralThreads.map((path, i) => (
                <motion.path
                  key={`thread-${i}`}
                  d={path}
                  fill="none"
                  stroke="url(#thread-grad)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 4, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}

              {/* Core Circuitry Lines */}
              <motion.path
                d="M400,150 Q300,150 250,300 Q250,450 400,550 Q550,450 550,300 Q500,150 400,150 M400,200 L400,500 M300,350 L500,350"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5 }}
              />

              {/* Network Connections between nodes */}
              {NODES.map((node, i) =>
                NODES.slice(i + 1).map((target) => (
                  <motion.line
                    key={`${node.id}-${target.id}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={activeNode?.id === node.id || activeNode?.id === target.id ? target.color : "rgba(255,255,255,0.05)"}
                    strokeWidth={activeNode?.id === node.id || activeNode?.id === target.id ? "1.5" : "0.5"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2 }}
                  />
                ))
              )}

              {/* Dynamic Pulses */}
              {NODES.map((node, i) => {
                const target = NODES[(i + 1) % NODES.length];
                const isActive = activeNode?.id === node.id;
                return (
                  <motion.circle
                    key={`pulse-${node.id}`}
                    r={isActive ? 3 : 1.5}
                    fill={node.color}
                    initial={{ opacity: 0 }}
                    animate={{
                      cx: [node.x, target.x],
                      cy: [node.y, target.y],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: isActive ? 1.5 : 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.8,
                    }}
                  />
                );
              })}
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
              className="cursor-pointer group"
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <AnimatePresence>
                {isVisible && (
                  <>
                    {/* Node Orbiting Particles */}
                    {isActive && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[0, 120, 240].map((angle, idx) => (
                          <motion.circle
                            key={`orbit-${idx}`}
                            r="1.5"
                            fill={node.color}
                            animate={{
                              cx: [
                                node.x + Math.cos((angle * Math.PI) / 180) * 25,
                                node.x + Math.cos(((angle + 360) * Math.PI) / 180) * 25,
                              ],
                              cy: [
                                node.y + Math.sin((angle * Math.PI) / 180) * 25,
                                node.y + Math.sin(((angle + 360) * Math.PI) / 180) * 25,
                              ],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        ))}
                      </motion.g>
                    )}

                    {/* Node Luminous Core */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 14 : 6}
                      fill={node.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      filter={`url(#glow-${node.id})`}
                      className="transition-all duration-500"
                    />

                    {/* Pulsing Halos */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 35 : 15}
                      stroke={node.color}
                      strokeWidth="0.5"
                      fill="none"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Refined Label */}
                    <motion.text
                      x={node.x}
                      y={node.y + (node.y > 350 ? 45 : -35)}
                      textAnchor="middle"
                      fill={isActive ? node.color : "rgba(255,255,255,0.6)"}
                      fontSize="10"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-body tracking-[0.4em] uppercase pointer-events-none transition-colors duration-300"
                    >
                      {node.label}
                    </motion.text>
                  </>
                )}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>

      {/* Premium Insight Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-lg w-[90%] glass-morphism p-8 rounded-3xl z-50 text-center"
          >
            <div className="mb-4 inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Core Faculty</span>
            </div>
            <h3 
              className="text-3xl font-bold mb-4 tracking-tighter uppercase italic"
              style={{ color: activeNode.color, textShadow: `0 0 20px ${activeNode.color}44` }}
            >
              {activeNode.label}
            </h3>
            <p className="text-base text-white/70 leading-relaxed font-light tracking-wide">
              {activeNode.insight}
            </p>
            <div className="mt-6 flex justify-center gap-1 opacity-30">
              {[1, 2, 3].map(i => <div key={i} className="w-8 h-[1px] bg-white" />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Typographic Experience */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex items-center justify-center text-center z-50"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ letterSpacing: "1em", opacity: 0 }}
                animate={{ letterSpacing: "0.4em", opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <p className="text-xs uppercase text-white/40 mb-2">Immersive Visualization</p>
                <h1 className="text-5xl md:text-8xl font-headline font-bold text-white/95 tracking-tighter">
                  THE MIND OF A<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">
                    DEVELOPER
                  </span>
                </h1>
              </motion.div>
              <div className="w-12 h-[1px] bg-white/20 mx-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

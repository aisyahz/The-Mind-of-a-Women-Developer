
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, NodeData } from '@/lib/constants';
import { Brain } from 'lucide-react';

export const NeuralConstellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [showBrain, setShowBrain] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);

  useEffect(() => {
    // Initial delay for brain formation
    const brainTimer = setTimeout(() => setShowBrain(true), 1500);

    // Sequential node illumination
    NODES.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 3000 + index * 800);
    });

    return () => {
      clearTimeout(brainTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Brain Icon for subtle depth */}
      <AnimatePresence>
        {showBrain && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            className="absolute z-0 pointer-events-none"
          >
            <Brain size={600} strokeWidth={0.5} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        viewBox="0 0 800 700"
        className="relative z-10 w-full max-w-4xl h-auto overflow-visible select-none"
      >
        <defs>
          {NODES.map((node) => (
            <filter id={`glow-${node.id}`} key={node.id}>
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Neural Network Connections */}
        <AnimatePresence>
          {showBrain && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              {/* Connecting Lines */}
              {NODES.map((node, i) =>
                NODES.slice(i + 1).map((target) => (
                  <motion.line
                    key={`${node.id}-${target.id}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="url(#line-gradient)"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
                  />
                ))
              )}

              {/* Pulse Pulses between nodes */}
              {NODES.map((node, i) => {
                const target = NODES[(i + 1) % NODES.length];
                return (
                  <motion.circle
                    key={`pulse-${node.id}`}
                    r="2"
                    fill="#fff"
                    initial={{ opacity: 0 }}
                    animate={{
                      cx: [node.x, target.x],
                      cy: [node.y, target.y],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 1.5,
                    }}
                  />
                );
              })}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Artistic Brain Pathways */}
        <AnimatePresence>
          {showBrain && (
            <motion.path
              d="M400,100 C300,100 250,200 250,300 C250,450 350,550 400,550 C450,550 550,450 550,300 C550,200 500,100 400,100 Z"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="brain-line"
            />
          )}
        </AnimatePresence>

        {/* Nodes */}
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
                    {/* Node Core */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 12 : 8}
                      fill={node.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      filter={`url(#glow-${node.id})`}
                      className="animate-pulse-glow"
                    />

                    {/* Node Hover Aura */}
                    {isActive && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={24}
                        stroke={node.color}
                        strokeWidth="1"
                        fill="none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                      />
                    )}

                    {/* Node Label */}
                    <motion.text
                      x={node.x}
                      y={node.y - 25}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="14"
                      fontWeight="500"
                      initial={{ opacity: 0, y: node.y - 15 }}
                      animate={{ opacity: 1, y: node.y - 25 }}
                      className="font-body tracking-wider uppercase opacity-80"
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

      {/* Insight Overlay */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-md w-[90%] bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-50 text-center"
          >
            <h3 
              className="text-xl font-bold mb-2 tracking-tight uppercase"
              style={{ color: activeNode.color }}
            >
              {activeNode.label}
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed font-light">
              {activeNode.insight}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Text */}
      <AnimatePresence>
        {!showBrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-white/90">
                THE MIND OF A<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">
                  WOMAN DEVELOPER
                </span>
              </h1>
              <p className="text-white/40 font-body text-sm md:text-base tracking-widest uppercase">
                A conceptual visualization of diverse thinking
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

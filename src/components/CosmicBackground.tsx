"use client";

import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let nebulas: Nebula[] = [];
    
    const layerConfigs = [
      { count: 150, size: 0.8, speed: 0.05, opacity: 0.2 }, // Distance
      { count: 80, size: 1.2, speed: 0.1, opacity: 0.4 },  // Mid
      { count: 30, size: 2.5, speed: 0.2, opacity: 0.1 },  // Near (Bokeh)
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(size: number, speed: number, baseOpacity: number) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * size + 0.1;
        this.speedX = (Math.random() * 2 - 1) * speed;
        this.speedY = (Math.random() * 2 - 1) * speed;
        this.opacity = Math.random() * baseOpacity + (baseOpacity / 2);
        
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = this.opacity;
        ctx!.fill();
      }
    }

    class Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 400 + 200;
        this.speedX = (Math.random() * 0.1 - 0.05);
        this.speedY = (Math.random() * 0.1 - 0.05);
        
        const nebulaColors = [
          'rgba(59, 130, 246, 0.03)', // Blue
          'rgba(139, 92, 246, 0.04)', // Violet
          'rgba(236, 72, 153, 0.03)', // Pink
        ];
        this.color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx!.fillStyle = gradient;
        ctx!.globalAlpha = 1;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }
    }

    const init = () => {
      particles = [];
      nebulas = [];
      layerConfigs.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
          particles.push(new Particle(layer.size, layer.speed, layer.opacity));
        }
      });
      for (let i = 0; i < 4; i++) {
        nebulas.push(new Nebula());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const animate = () => {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      nebulas.forEach(n => {
        n.update();
        n.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none" />;
};

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
    let shootingStars: ShootingStar[] = [];
    let scrollY = 0;
    
    const layerConfigs = [
      { count: 180, size: 0.7, speed: 0.03, opacity: 0.15, parallax: 0.02 }, // Distance
      { count: 100, size: 1.1, speed: 0.07, opacity: 0.35, parallax: 0.05 },  // Mid
      { count: 40, size: 2.2, speed: 0.15, opacity: 0.08, parallax: 0.12 },  // Near (Bokeh)
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      parallaxFactor: number;

      constructor(size: number, speed: number, baseOpacity: number, parallax: number) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * size + 0.1;
        this.speedX = (Math.random() * 2 - 1) * speed;
        this.speedY = (Math.random() * 2 - 1) * speed;
        this.opacity = Math.random() * baseOpacity + (baseOpacity / 2);
        this.parallaxFactor = parallax;
        
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#ffffff', '#60a5fa', '#f472b6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary wrapping
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        // Apply parallax offset based on scroll
        const drawY = this.y - (scrollY * this.parallaxFactor);
        const wrappedY = ((drawY % canvas!.height) + canvas!.height) % canvas!.height;

        ctx!.beginPath();
        ctx!.arc(this.x, wrappedY, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = this.opacity;
        ctx!.fill();
      }
    }

    class ShootingStar {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      opacity: number = 0;
      active: boolean = false;

      constructor() {
        this.reset();
      }

      reset() {
        this.active = false;
        // Randomly trigger shooting stars
        if (Math.random() > 0.997) {
          this.active = true;
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * (canvas!.height * 0.5);
          this.length = Math.random() * 150 + 50;
          this.speed = Math.random() * 15 + 10;
          this.opacity = Math.random() * 0.5 + 0.2;
        }
      }

      update() {
        if (!this.active) {
          this.reset();
          return;
        }

        this.x += this.speed;
        this.y += this.speed * 0.5;
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x > canvas!.width || this.y > canvas!.height) {
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;
        
        ctx!.beginPath();
        const gradient = ctx!.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length * 0.5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.5;
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(this.x - this.length, this.y - this.length * 0.5);
        ctx!.stroke();
      }
    }

    class Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      parallaxFactor: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 500 + 300;
        this.speedX = (Math.random() * 0.05 - 0.025);
        this.speedY = (Math.random() * 0.05 - 0.025);
        this.parallaxFactor = 0.03;
        
        const nebulaColors = [
          'rgba(59, 130, 246, 0.04)', // Blue
          'rgba(139, 92, 246, 0.05)', // Violet
          'rgba(236, 72, 153, 0.04)', // Pink
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
        const drawY = this.y - (scrollY * this.parallaxFactor);
        const wrappedY = ((drawY % canvas!.height) + canvas!.height) % canvas!.height;

        const gradient = ctx!.createRadialGradient(this.x, wrappedY, 0, this.x, wrappedY, this.radius);
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
      shootingStars = [new ShootingStar(), new ShootingStar()];
      
      layerConfigs.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
          particles.push(new Particle(layer.size, layer.speed, layer.opacity, layer.parallax));
        }
      });
      for (let i = 0; i < 5; i++) {
        nebulas.push(new Nebula());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
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

      shootingStars.forEach(s => {
        s.update();
        s.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

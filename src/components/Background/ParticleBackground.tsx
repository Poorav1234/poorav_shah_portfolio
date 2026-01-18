'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalSize: number;
  maxSize: number;
  oscillationSpeed: number;
  oscillationOffset: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    // Adjust particle count based on device
    const particleCount = isMobile ? 40 : 80; // Fewer particles on mobile for better performance

    // Particle colors (purple/pink theme to match your portfolio)
    const colors = [
      'rgba(149, 76, 233, 0.8)', // Purple
      'rgba(214, 62, 165, 0.8)', // Pink
      'rgba(124, 58, 237, 0.8)', // Indigo
      'rgba(192, 132, 252, 0.8)', // Violet
      'rgba(99, 102, 241, 0.8)', // Indigo blue
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      // Adjust size based on device
      const baseSize = isMobile ? 1.5 : 2;
      const size = Math.random() * (baseSize * 2) + baseSize; // Smaller particles on mobile
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        originalSize: size,
        maxSize: size * (isMobile ? 1.3 : 1.5), // Less size variation on mobile
        speedX: isMobile ? 
          (Math.random() - 0.5) * 0.4 : // Slower movement on mobile
          (Math.random() - 0.5) * 0.8, // Faster movement on desktop
        speedY: isMobile ? 
          (Math.random() - 0.5) * 0.4 : // Slower movement on mobile
          (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        oscillationSpeed: isMobile ? 
          Math.random() * 0.01 + 0.005 : // Slower oscillation on mobile
          Math.random() * 0.02 + 0.01, // Normal oscillation on desktop
        oscillationOffset: Math.random() * Math.PI * 2, // Random offset for oscillation
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with semi-transparent background to create trail effect
      // Adjust transparency based on device for performance
      const trailOpacity = isMobile ? 0.02 : 0.05;
      ctx.fillStyle = `rgba(15, 15, 35, ${trailOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add oscillation effect to size
        const oscillation = Math.sin(Date.now() * particle.oscillationSpeed + particle.oscillationOffset) * 0.5 + 0.5;
        particle.size = particle.originalSize + (particle.maxSize - particle.originalSize) * oscillation;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.speedY *= -1;
        }

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections between nearby particles with pulsing effect
        // Adjust connection distance based on device
        const connectionDistance = isMobile ? 80 : 120;
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Pulsing opacity based on time
            const pulse = Math.sin(Date.now() * (isMobile ? 0.001 : 0.002)) * 0.1 + 0.1;
            const opacity = pulse * (1 - distance / connectionDistance);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(149, 76, 233, ${opacity})`;
            // Thinner lines on mobile
            ctx.lineWidth = isMobile ? 0.5 : 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;
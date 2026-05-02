import React, { useEffect, useRef } from 'react';

const ParticleSystem = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = [];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;

      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.animationDelay = `${delay}s`;

      containerRef.current.appendChild(particle);
      particles.push({
        element: particle,
        duration,
        delay,
      });
    }

    particlesRef.current = particles;

    return () => {
      particles.forEach((p) => {
        p.element.remove();
      });
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};

export default ParticleSystem;
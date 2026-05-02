import React, { useEffect, useRef } from 'react';

const HUDRing = () => {
  const ringRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ringRef.current) return;

      const rect = ringRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * 0.05;
      const y = (e.clientY - centerY) * 0.05;

      requestAnimationFrame(() => {
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dotPositions = [
    { top: true, right: false, bottom: false, left: false },
    { top: false, right: true, bottom: false, left: false },
    { top: false, right: false, bottom: true, left: false },
    { top: false, right: false, bottom: false, left: true },
  ];

  return (
    <div
      ref={ringRef}
      className="hud-ring relative flex items-center justify-center pointer-events-none"
    >
      <div
        className="absolute inset-5 rounded-full border border-cyan-300/50"
        style={{ animation: 'rotate 25s linear infinite reverse' }}
      />

      <div
        className="absolute inset-10 rounded-full border-2 border-dashed border-red-400/30"
        style={{ animation: 'rotate 30s linear infinite' }}
      />

      {dotPositions.map((pos, idx) => (
        <div
          key={idx}
          className={`absolute w-2 h-2 bg-cyan-300 rounded-full ${
            pos.top ? 'top-2' : pos.bottom ? 'bottom-2' : 'top-1/2'
          } ${pos.left ? 'left-2' : pos.right ? 'right-2' : 'left-1/2'} ${
            pos.top || pos.bottom ? '-translate-x-1/2' : '-translate-y-1/2'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default HUDRing;
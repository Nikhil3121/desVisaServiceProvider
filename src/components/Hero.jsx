import React, { useEffect, useState } from "react";
import HUDRing from "./HUDRing";
import ParticleSystem from "./ParticleSystem";
import CursorLight from "./CourseLight";
import useMousePosition from "../hooks/useMousePosition";

const Hero = () => {
  const mouse = useMousePosition();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() * 0.001);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const floatX = Math.sin(time) * 8;
  const floatY = Math.cos(time) * 8;

  const depthMid = 6;
  const depthForeground = 10;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <CursorLight />
      <ParticleSystem />
      <div className="grid-bg" />

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate3d(${mouse.x * -depthMid + floatX}px, ${mouse.y * -depthMid + floatY}px, 0)`,
        }}
      >
        <HUDRing />
      </div>

      <div
        className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10"
        style={{
          transform: `translate3d(${mouse.x * depthForeground}px, ${mouse.y * depthForeground}px, 0)`,
        }}
      >
        <div className="text-left">
          <p className="text-cyan-300 text-sm mb-4 uppercase tracking-widest">
            Welcome to the future
          </p>
          <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-6">
            AI-Powered <br />
            <span className="neon-text font-bold">Visa Intelligence</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Experience the next generation of immigration technology. Real-time
            processing, predictive analytics, and human-centered design.
          </p>
        </div>

        <div className="text-right hidden lg:block">
          <div className="glass-panel mb-6 inline-block">
            <div className="text-cyan-300 text-xs mb-2 uppercase">
              System Status
            </div>
            <div className="text-2xl font-bold">Active</div>
            <div className="text-xs text-gray-400 mt-2">
              All systems operational
            </div>
          </div>
          <button
            aria-label="Initiate Access"
            className="px-8 py-3 bg-gradient-to-r from-cyan-300 to-red-400 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-300/50 transition transform hover:-translate-y-1"
          >
            Initiate Access
          </button>
        </div>

        <div className="text-center lg:hidden">
          <div className="glass-panel mb-6 inline-block">
            <div className="text-cyan-300 text-xs mb-2 uppercase">
              System Status
            </div>
            <div className="text-2xl font-bold">Active</div>
            <div className="text-xs text-gray-400 mt-2">
              All systems operational
            </div>
          </div>
          <button
            aria-label="Initiate Access"
            className="w-full px-8 py-3 bg-gradient-to-r from-cyan-300 to-red-400 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-300/50 transition transform hover:-translate-y-1"
          >
            Initiate Access
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
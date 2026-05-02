import React, { useState } from 'react';

const Vision = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { number: 'Fast', label: 'Execution & Delivery' },
    { number: 'Smart', label: 'AI-Driven Solutions' },
    { number: 'Secure', label: 'Enterprise-Grade' },
  ];

  return (
    <article className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes vision-ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-core {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.4); }
          50% { box-shadow: 0 0 40px rgba(0, 229, 255, 0.8); }
        }

        @keyframes scanning-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        .vision-ring {
          animation: vision-ring-rotate 40s linear infinite;
        }

        .pulse-core {
          animation: pulse-core 4s ease-in-out infinite;
        }

        .scanning-line {
          animation: scanning-line 6s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0">
        {/* Vision Ring */}
        <div className="vision-ring absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-cyan-500 rounded-full opacity-20"></div>

        {/* Pulse Core */}
        <div className="pulse-core absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>

        {/* Scanning Line */}
        <div className="scanning-line absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30"></div>

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite`,
              opacity: 0.6 - i * 0.05,
            }}
            aria-hidden="true"
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-6">Our Vision</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          We're building the future of AI-powered digital transformation.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 border border-cyan-500 rounded-lg bg-black bg-opacity-50 hover:bg-opacity-75 transition cursor-pointer"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
              <div className={`text-gray-300 transition ${hoveredStat === index ? 'text-white' : ''}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Vision;
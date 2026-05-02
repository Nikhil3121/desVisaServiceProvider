import React from 'react';

const HumanSection = () => {
  const features = [
    {
      title: 'Real Collaboration',
      description: 'You work directly with builders, not layers of communication.',
      color: 'cyan',
      icon: '↔️'
    },
    {
      title: 'Transparent Process',
      description: 'Every step is clear, trackable, and aligned with your goals.',
      color: 'red',
      icon: '◇'
    },
    {
      title: 'Practical Thinking',
      description: 'We focus on what works — not just what looks impressive.',
      color: 'cyan',
      icon: '⚙'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <style>{`
        @keyframes subtle-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 229, 255, 0.4);
          }
        }

        .hs-icon-pulse {
          animation: subtle-pulse 3s ease-in-out infinite;
        }

        .hs-feature-block {
          transition: all 0.3s ease;
        }

        .hs-feature-block:hover {
          transform: translateY(-4px);
        }

        .hs-feature-block:hover .hs-feature-glow {
          opacity: 1;
        }

        .hs-feature-glow {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hologram">
            <div className="glow-text text-center relative z-10">
              <div className="text-6xl font-light mb-4 hs-icon-pulse inline-block rounded-xl p-4 border border-cyan-300/30 bg-cyan-300/10" aria-hidden="true">
                ⚙️
              </div>
              <h2 className="text-2xl font-semibold mb-4 mt-6">Built by Humans. Powered by Systems.</h2>
              <p className="text-sm text-gray-300">We combine structured engineering with real-world understanding.</p>
            </div>
          </div>

          <div>
            <p className="text-cyan-300 text-xs mb-4 uppercase tracking-widest">
              Human + System Approach
            </p>
            <h1 className="text-4xl font-light mb-6 leading-tight">
              <span className="text-white">We Don't Just Build</span>
              <br />
              <span className="neon-text font-bold">We Understand First</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Every project starts with understanding your idea, your goals, and your constraints. We combine human thinking with structured systems to build products that actually work in the real world.
            </p>

            <div className="space-y-4">
              {features.map((feature, idx) => {
                const borderColor = feature.color === 'cyan' ? 'border-cyan-300/50' : 'border-red-400/50';
                const bgColor = feature.color === 'cyan' ? 'bg-cyan-300/20' : 'bg-red-400/20';
                const textColor = feature.color === 'cyan' ? 'text-cyan-300' : 'text-red-400';

                return (
                  <div
                    key={idx}
                    className={`hs-feature-block flex gap-4 p-4 rounded-lg border ${borderColor} bg-white/5 backdrop-blur-sm hover:bg-white/10`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${bgColor} border ${borderColor} flex items-center justify-center ${textColor} flex-shrink-0 text-lg hs-feature-glow`}
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanSection;
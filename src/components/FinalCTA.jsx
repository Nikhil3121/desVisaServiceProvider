import React, { useState } from 'react';

const FinalCTA = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleStartProject = () => {
    window.location.hash = 'contact';
  };

  const handleTalkToUs = () => {
    window.location.hash = 'contact';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 bg-black overflow-hidden" id="startservices">
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .cta-glow-core {
          animation: glow-pulse 6s ease-in-out infinite;
        }

        @keyframes float-light {
          0%, 100% {
            transform: translateY(0px) translateX(-50%);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(-50%);
            opacity: 0.5;
          }
        }

        .float-light {
          animation: float-light 8s ease-in-out infinite;
        }

        @keyframes button-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.3), inset 0 0 20px rgba(0, 229, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 229, 255, 0.5), inset 0 0 20px rgba(0, 229, 255, 0.2);
          }
        }

        .cta-button-glow {
          animation: button-glow 3s ease-in-out infinite;
        }

        @keyframes content-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-content {
          animation: content-fade-in 0.8s ease-out 0.2s both;
        }

        .cta-primary-btn {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%);
          border: 2px solid rgba(0, 229, 255, 0.5);
          transition: all 0.3s ease;
        }

        .cta-primary-btn:hover {
          transform: scale(1.05);
          border-color: rgba(0, 229, 255, 0.8);
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%);
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 229, 255, 0.1);
        }

        .cta-secondary-btn {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .cta-secondary-btn:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        @keyframes trust-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .cta-trust-line {
          animation: trust-fade-in 0.8s ease-out 0.6s both;
        }

        .cta-urgency {
          animation: trust-fade-in 0.8s ease-out 0.8s both;
        }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="cta-glow-core absolute w-96 h-96 bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="float-light absolute top-1/4 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="cta-content">
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            Let's Build <br />
            <span className="neon-text font-bold">Something Real</span>
          </h1>

          <p className="text-xl text-cyan-200/80 mb-4 font-light">
            You already have the idea. We have the system to build it.
          </p>

          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            From concept to production — fast, scalable, and built for real use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleStartProject}
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Start Your Project"
              className={`cta-primary-btn px-8 py-4 rounded-lg font-semibold text-lg text-cyan-300 uppercase tracking-wider backdrop-blur-md ${
                hoveredButton === 'primary' ? 'cta-button-glow' : ''
              }`}
            >
              🚀 Start Your Project
            </button>

            <button
              onClick={handleTalkToUs}
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Talk to Us"
              className="cta-secondary-btn px-8 py-4 rounded-lg font-semibold text-lg text-white uppercase tracking-wider backdrop-blur-md transition-all duration-300"
            >
              💬 Talk to Us
            </button>
          </div>

          <div className="cta-trust-line flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-400 font-mono uppercase tracking-widest pb-8 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="text-cyan-300">✔</span> No commitment
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <span className="text-cyan-300">✔</span> Clear process
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600" />
            <div className="flex items-center gap-2">
              <span className="text-cyan-300">✔</span> Fast response
            </div>
          </div>

          <div className="cta-urgency mt-8">
            <p className="text-sm text-gray-500 font-light">
              We take limited projects each month to ensure quality
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
};

export default FinalCTA;
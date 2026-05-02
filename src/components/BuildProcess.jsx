import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BuildProcess() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Idea Analysis',
      description: 'AI + human validation of requirements, market research, and feasibility assessment',
      icon: '🔍'
    },
    {
      id: 2,
      title: 'Architecture Planning',
      description: 'Design system structure, tech stack selection, and scalability roadmap',
      icon: '🏗️'
    },
    {
      id: 3,
      title: 'Development Sprint',
      description: 'Agile-based coding, real-time collaboration, and iterative development',
      icon: '⚙️'
    },
    {
      id: 4,
      title: 'Testing & Optimization',
      description: 'QA automation, performance tuning, security audits, and refinement',
      icon: '✔️'
    },
    {
      id: 5,
      title: 'Launch & Support',
      description: 'Deployment automation, monitoring, scaling, and ongoing support',
      icon: '🚀'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const dotVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: '100%',
      opacity: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
        delay: 0.8
      }
    }
  };

  const getCardClasses = (step) => {
    const baseClasses = 'relative p-6 rounded-xl backdrop-blur-xl border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';
    
    if (hoveredStep === step.id) {
      return `${baseClasses} bg-black/60 border-cyan-400/70 shadow-[0_0_30px_rgba(34,211,238,0.4)]`;
    }
    if (hoveredStep !== null) {
      return `${baseClasses} bg-black/40 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] opacity-50`;
    }
    return `${baseClasses} bg-black/40 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]`;
  };

  const handleStepKeyDown = (step, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setHoveredStep(step.id);
    }
  };

  return (
    <div className="relative w-full bg-black overflow-hidden py-24" id="process">
      <style>{`
        @keyframes bp-float-icon {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .bp-float-icon {
          animation: bp-float-icon 3s ease-in-out infinite;
        }

        @keyframes bp-scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .bp-scan-line {
          animation: bp-scan-line 8s linear infinite;
        }

        .bp-grid-bg {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      <div className="absolute inset-0 bp-grid-bg pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none bp-scan-line opacity-10 border-b border-cyan-500/20" style={{ height: '2px' }} />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-mono text-green-400 tracking-widest uppercase">
              [PRODUCTION PIPELINE]
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              System Build Process
            </span>
          </h1>

          <p className="text-cyan-300/70 text-sm md:text-base font-mono max-w-2xl mx-auto drop-shadow-[0_0_4px_rgba(0,255,255,0.2)]">
            From idea to deployment — structured, scalable, and transparent
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="absolute top-1/3 left-0 right-0 h-1 -translate-y-1/2 z-0">
              <motion.div
                variants={lineVariants}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-full"
              />

              <motion.div
                variants={dotVariants}
                className="absolute top-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-y-1/2"
                aria-hidden="true"
              />
            </div>

            <div className="grid grid-cols-5 gap-6 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleStepKeyDown(step, e)}
                  onBlur={() => setHoveredStep(null)}
                  aria-label={`Step ${step.id}: ${step.title}`}
                  className="group cursor-pointer focus-visible:outline-none"
                >
                  <motion.div
                    animate={{
                      y: hoveredStep === step.id ? -8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={getCardClasses(step)}
                  >
                    <div className="mb-4">
                      <span
                        className="text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        aria-hidden="true"
                      >
                        {String(step.id).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="text-4xl mb-4 bp-float-icon" aria-hidden="true">
                      {step.icon}
                    </div>

                    <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                      {step.title}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-cyan-400/70 font-mono">
                      <div className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${hoveredStep === step.id ? 'bg-cyan-400' : 'bg-cyan-500/50'}`} />
                      {hoveredStep === step.id ? 'Active' : 'Ready'}
                    </div>

                    {hoveredStep === step.id && (
                      <motion.div
                        layoutId={`hover-glow-${step.id}`}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <motion.div
                      className="absolute -right-3 top-1/3 text-2xl z-20 -translate-y-1/2 transition-all duration-300"
                      animate={{
                        x: hoveredStep === step.id ? 4 : 0,
                        color: hoveredStep === step.id ? 'rgba(34, 211, 238, 1)' : 'rgba(34, 211, 238, 0.3)'
                      }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    >
                      →
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16 pt-8 border-t border-cyan-500/20"
          >
            <p className="text-xs font-mono text-cyan-400/60">
              <span className="text-green-400">●</span> Average delivery: 4-12 weeks depending on complexity
            </p>
          </motion.div>
        </div>

        <div className="lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 relative"
          >
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent rounded-full z-0">
              <motion.div
                animate={{ y: '0%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-6 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleStepKeyDown(step, e)}
                  onBlur={() => setHoveredStep(null)}
                  aria-label={`Step ${step.id}: ${step.title}`}
                  className="ml-20 group focus-visible:outline-none"
                >
                  <motion.div
                    animate={{
                      x: hoveredStep === step.id ? 8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={getCardClasses(step)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        aria-hidden="true"
                      >
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <div className="text-2xl bp-float-icon flex-shrink-0" aria-hidden="true">
                        {step.icon}
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
                      {step.title}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-cyan-400/70 font-mono">
                      <div className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${hoveredStep === step.id ? 'bg-cyan-400' : 'bg-cyan-500/50'}`} />
                      {hoveredStep === step.id ? 'Active' : 'Ready'}
                    </div>

                    {hoveredStep === step.id && (
                      <motion.div
                        layoutId={`hover-glow-mobile-${step.id}`}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <motion.div
                      className="ml-10 text-2xl my-2 transition-all duration-300"
                      animate={{
                        y: hoveredStep === step.id ? 4 : 0,
                        color: hoveredStep === step.id ? 'rgba(34, 211, 238, 1)' : 'rgba(34, 211, 238, 0.3)'
                      }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    >
                      ↓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12 pt-8 border-t border-cyan-500/20"
          >
            <p className="text-xs font-mono text-cyan-400/60">
              <span className="text-green-400">●</span> Average delivery: 4-12 weeks
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}